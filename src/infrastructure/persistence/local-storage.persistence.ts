import { injectable } from "inversify";
import { StoragePort } from "../../application/ports/in/storage.port";

@injectable()
export class LocalStoragePersistence implements StoragePort {
    public load<T>(key: string): T | null {
        const item = localStorage.getItem(key);
        if(!item) return null;
        return JSON.parse(item) as T;
    }

    public save(key: string, value: unknown) {
        const item = JSON.stringify(value);
        localStorage.setItem(key, item);
    }

    public has(key: string) {
        return localStorage.getItem(key) != null;
    }
}