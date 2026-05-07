export interface ClassificationResult {
  classification: string;
  confidence: bigint;
  isSpam: boolean;
}

export interface Stats {
  totalAnalyzed: bigint;
  totalSpam: bigint;
  totalHam: bigint;
}
