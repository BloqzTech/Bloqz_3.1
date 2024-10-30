import { encryptData, decryptData } from '../encryption/EncryptionService';

class FileSystemService {
    constructor() {
        this.fs = null;
        this.initialized = false;
    }

    async initialize() {
        if ('showOpenFilePicker' in window) {
            this.initialized = true;
        } else {
            throw new Error('File System Access API not supported');
        }
    }

    async requestPermission(directory = false) {
        try {
            if (directory) {
                const handle = await window.showDirectoryPicker();
                return handle;
            } else {
                const handle = await window.showOpenFilePicker();
                return handle[0];
            }
        } catch (error) {
            console.error('Permission request error:', error);
            throw error;
        }
    }

    async readFile(fileHandle) {
        try {
            const file = await fileHandle.getFile();
            const content = await file.text();
            return content;
        } catch (error) {
            console.error('File read error:', error);
            throw error;
        }
    }

    async writeFile(fileHandle, content) {
        try {
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
        } catch (error) {
            console.error('File write error:', error);
            throw error;
        }
    }

    async readEncryptedFile(fileHandle, key) {
        try {
            const encryptedContent = await this.readFile(fileHandle);
            return await decryptData(encryptedContent, key);
        } catch (error) {
            console.error('Encrypted file read error:', error);
            throw error;
        }
    }

    async writeEncryptedFile(fileHandle, content, key) {
        try {
            const encryptedContent = await encryptData(content, key);
            await this.writeFile(fileHandle, encryptedContent);
        } catch (error) {
            console.error('Encrypted file write error:', error);
            throw error;
        }
    }

    async listDirectory(directoryHandle) {
        try {
            const entries = [];
            for await (const entry of directoryHandle.values()) {
                entries.push({
                    name: entry.name,
                    type: entry.kind,
                    handle: entry
                });
            }
            return entries;
        } catch (error) {
            console.error('Directory listing error:', error);
            throw error;
        }
    }

    async createDirectory(parentHandle, name) {
        try {
            return await parentHandle.getDirectoryHandle(name, { create: true });
        } catch (error) {
            console.error('Directory creation error:', error);
            throw error;
        }
    }

    async moveFile(sourceHandle, targetHandle) {
        try {
            const content = await this.readFile(sourceHandle);
            await this.writeFile(targetHandle, content);
            // Note: actual deletion of source might require additional permissions
        } catch (error) {
            console.error('File move error:', error);
            throw error;
        }
    }

    async copyFile(sourceHandle, targetHandle) {
        try {
            const content = await this.readFile(sourceHandle);
            await this.writeFile(targetHandle, content);
        } catch (error) {
            console.error('File copy error:', error);
            throw error;
        }
    }
}

export default new FileSystemService();
