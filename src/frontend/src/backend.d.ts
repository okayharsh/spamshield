import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Stats {
    totalAnalyzed: bigint;
    totalSpam: bigint;
    totalHam: bigint;
}
export interface ClassificationResult {
    isSpam: boolean;
    confidence: bigint;
    classification: string;
}
export interface backendInterface {
    classifyMessage(text: string): Promise<ClassificationResult>;
    getStats(): Promise<Stats>;
}
