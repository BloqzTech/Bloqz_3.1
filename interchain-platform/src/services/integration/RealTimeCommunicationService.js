import io from 'socket.io-client';
import { encryptData, decryptData } from '../encryption/EncryptionService';

class RealTimeCommunicationService {
    constructor() {
        this.socket = null;
        this.peerConnections = new Map();
        this.messageHandlers = new Map();
        this.config = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        };
    }

    async initialize(serverUrl) {
        this.socket = io(serverUrl, {
            transports: ['websocket'],
            secure: true
        });

        this.setupSocketListeners();
    }

    setupSocketListeners() {
        this.socket.on('connect', () => {
            console.log('Connected to real-time server');
        });

        this.socket.on('message', async (encryptedData) => {
            const data = await decryptData(encryptedData);
            const handler = this.messageHandlers.get(data.type);
            if (handler) {
                handler(data.payload);
            }
        });

        this.socket.on('offer', async (data) => {
            await this.handleOffer(data);
        });

        this.socket.on('answer', async (data) => {
            await this.handleAnswer(data);
        });

        this.socket.on('ice-candidate', async (data) => {
            await this.handleIceCandidate(data);
        });
    }

    // WebRTC Methods
    async createPeerConnection(remoteUserId) {
        const peerConnection = new RTCPeerConnection(this.config);
        
        peerConnection.onicecandidate = async (event) => {
            if (event.candidate) {
                const encryptedCandidate = await encryptData(event.candidate);
                this.socket.emit('ice-candidate', {
                    candidate: encryptedCandidate,
                    to: remoteUserId
                });
            }
        };

        peerConnection.ontrack = (event) => {
            // Handle incoming media tracks
            const handler = this.messageHandlers.get('track');
            if (handler) {
                handler(event);
            }
        };

        this.peerConnections.set(remoteUserId, peerConnection);
        return peerConnection;
    }

    async handleOffer(data) {
        const { from, offer } = data;
        const decryptedOffer = await decryptData(offer);
        
        const peerConnection = await this.createPeerConnection(from);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(decryptedOffer));
        
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        
        const encryptedAnswer = await encryptData(answer);
        this.socket.emit('answer', {
            answer: encryptedAnswer,
            to: from
        });
    }

    async handleAnswer(data) {
        const { from, answer } = data;
        const decryptedAnswer = await decryptData(answer);
        const peerConnection = this.peerConnections.get(from);
        
        if (peerConnection) {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(decryptedAnswer));
        }
    }

    async handleIceCandidate(data) {
        const { from, candidate } = data;
        const decryptedCandidate = await decryptData(candidate);
        const peerConnection = this.peerConnections.get(from);
        
        if (peerConnection) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(decryptedCandidate));
        }
    }

    // Message Handling
    registerMessageHandler(type, handler) {
        this.messageHandlers.set(type, handler);
    }

    async sendMessage(type, payload, to = null) {
        const encryptedPayload = await encryptData({ type, payload });
        if (to) {
            this.socket.emit('private-message', { data: encryptedPayload, to });
        } else {
            this.socket.emit('broadcast', encryptedPayload);
        }
    }

    // Media Streaming
    async startMediaStream(constraints = { video: true, audio: true }) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            return stream;
        } catch (error) {
            console.error('Media stream error:', error);
            throw error;
        }
    }

    async addMediaTrack(stream, remoteUserId) {
        const peerConnection = this.peerConnections.get(remoteUserId);
        if (peerConnection) {
            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream);
            });
        }
    }
}

export default new RealTimeCommunicationService();
