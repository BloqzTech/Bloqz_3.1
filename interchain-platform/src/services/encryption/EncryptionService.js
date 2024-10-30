import { Buffer } from 'buffer';
import { webcrypto } from 'crypto';

class EncryptionService {
    constructor() {
        this.crypto = webcrypto;
        this.algorithm = {
            name: 'AES-GCM',
            length: 256
        };
    }

    async generateKey() {
        return await this.crypto.subtle.generateKey(
            this.algorithm,
            true,
            ['encrypt', 'decrypt']
        );
    }

    async exportKey(key) {
        const exported = await this.crypto.subtle.exportKey('raw', key);
        return Buffer.from(exported).toString('base64');
    }

    async importKey(keyData) {
        const keyBuffer = Buffer.from(keyData, 'base64');
        return await this.crypto.subtle.importKey(
            'raw',
            keyBuffer,
            this.algorithm,
            true,
            ['encrypt', 'decrypt']
        );
    }

    async encryptData(data, key) {
        try {
            const iv = this.crypto.getRandomValues(new Uint8Array(12));
            const encodedData = new TextEncoder().encode(
                typeof data === 'string' ? data : JSON.stringify(data)
            );

            const encryptedData = await this.crypto.subtle.encrypt(
                {
                    name: this.algorithm.name,
                    iv: iv
                },
                key,
                encodedData
            );

            const encryptedArray = new Uint8Array(encryptedData);
            const combined = new Uint8Array(iv.length + encryptedArray.length);
            combined.set(iv);
            combined.set(encryptedArray, iv.length);

            return Buffer.from(combined).toString('base64');
        } catch (error) {
            console.error('Encryption error:', error);
            throw error;
        }
    }

    async decryptData(encryptedData, key) {
        try {
            const combined = Buffer.from(encryptedData, 'base64');
            const iv = combined.slice(0, 12);
            const data = combined.slice(12);

            const decryptedData = await this.crypto.subtle.decrypt(
                {
                    name: this.algorithm.name,
                    iv: iv
                },
                key,
                data
            );

            const decoded = new TextDecoder().decode(decryptedData);
            try {
                return JSON.parse(decoded);
            } catch {
                return decoded;
            }
        } catch (error) {
            console.error('Decryption error:', error);
            throw error;
        }
    }

    // Helper method for quick encryption with auto key generation
    async encrypt(data) {
        const key = await this.generateKey();
        const encrypted = await this.encryptData(data, key);
        const exportedKey = await this.exportKey(key);
        return {
            encrypted,
            key: exportedKey
        };
    }

    // Helper method for quick decryption with provided key
    async decrypt(encryptedData, keyData) {
        const key = await this.importKey(keyData);
        return await this.decryptData(encryptedData, key);
    }
}

export default new EncryptionService();
