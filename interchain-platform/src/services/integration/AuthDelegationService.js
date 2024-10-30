import jwt from 'jsonwebtoken';
import { encryptData, decryptData } from '../encryption/EncryptionService';

class AuthDelegationService {
    constructor() {
        this.providers = new Map();
        this.sessions = new Map();
        this.delegationRules = new Map();
    }

    async registerProvider(providerId, config) {
        this.providers.set(providerId, {
            ...config,
            validateToken: async (token) => {
                try {
                    const decoded = jwt.verify(token, config.publicKey);
                    return decoded;
                } catch (error) {
                    console.error('Token validation error:', error);
                    return null;
                }
            }
        });
    }

    async setDelegationRules(providerId, rules) {
        this.delegationRules.set(providerId, rules);
    }

    async delegateAuth(providerId, credentials) {
        try {
            const provider = this.providers.get(providerId);
            if (!provider) {
                throw new Error('Provider not registered');
            }

            const rules = this.delegationRules.get(providerId);
            if (!rules) {
                throw new Error('Delegation rules not set');
            }

            // Encrypt credentials before sending
            const encryptedCredentials = await encryptData(credentials);

            // Perform authentication with provider
            const response = await fetch(provider.authEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Delegation-Rules': JSON.stringify(rules)
                },
                body: JSON.stringify({ credentials: encryptedCredentials })
            });

            if (!response.ok) {
                throw new Error('Authentication delegation failed');
            }

            const { token, sessionId } = await response.json();

            // Validate received token
            const validated = await provider.validateToken(token);
            if (!validated) {
                throw new Error('Invalid token received from provider');
            }

            // Store session
            this.sessions.set(sessionId, {
                providerId,
                token,
                timestamp: Date.now(),
                rules
            });

            return {
                sessionId,
                token,
                expiresAt: validated.exp
            };
        } catch (error) {
            console.error('Auth delegation error:', error);
            throw error;
        }
    }

    async validateDelegatedSession(sessionId) {
        try {
            const session = this.sessions.get(sessionId);
            if (!session) {
                return false;
            }

            const provider = this.providers.get(session.providerId);
            if (!provider) {
                return false;
            }

            const validated = await provider.validateToken(session.token);
            return !!validated;
        } catch (error) {
            console.error('Session validation error:', error);
            return false;
        }
    }

    async revokeDelegation(sessionId) {
        try {
            const session = this.sessions.get(sessionId);
            if (!session) {
                throw new Error('Session not found');
            }

            const provider = this.providers.get(session.providerId);
            if (!provider) {
                throw new Error('Provider not found');
            }

            // Notify provider of revocation
            await fetch(provider.revokeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: JSON.stringify({ sessionId })
            });

            // Remove session
            this.sessions.delete(sessionId);

            return true;
        } catch (error) {
            console.error('Delegation revocation error:', error);
            throw error;
        }
    }

    async refreshDelegatedToken(sessionId) {
        try {
            const session = this.sessions.get(sessionId);
            if (!session) {
                throw new Error('Session not found');
            }

            const provider = this.providers.get(session.providerId);
            if (!provider) {
                throw new Error('Provider not found');
            }

            // Request new token
            const response = await fetch(provider.refreshEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.token}`
                },
                body: JSON.stringify({ sessionId })
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const { token } = await response.json();

            // Validate new token
            const validated = await provider.validateToken(token);
            if (!validated) {
                throw new Error('Invalid refresh token received');
            }

            // Update session
            this.sessions.set(sessionId, {
                ...session,
                token,
                timestamp: Date.now()
            });

            return {
                sessionId,
                token,
                expiresAt: validated.exp
            };
        } catch (error) {
            console.error('Token refresh error:', error);
            throw error;
        }
    }
}

export default new AuthDelegationService();
