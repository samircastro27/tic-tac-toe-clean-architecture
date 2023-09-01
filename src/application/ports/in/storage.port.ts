export interface StoragePort {
    save(key: string, item: any): void;
    load<T>(key: string): T | null;
    has(key: string): boolean;
}