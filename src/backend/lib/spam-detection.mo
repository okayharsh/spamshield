import Types "../types/spam-detection";
import Text "mo:core/Text";

module {
  /// Classify a message as spam or ham using keyword heuristics.
  /// Returns a ClassificationResult with confidence 0-100.
  public func classify(text : Text) : Types.ClassificationResult {
    let lower = text.toLower();

    let spamKeywords = [
      "free", "winner", "won", "prize", "claim", "urgent", "cash", "offer",
      "congratulations", "selected", "click here", "limited time", "act now",
      "guaranteed", "discount", "buy now", "earn money", "make money",
      "risk free", "apply now", "pre-approved", "credit", "loan"
    ];

    var hits : Nat = 0;
    for (kw in spamKeywords.values()) {
      if (lower.contains(#text kw)) { hits += 1 };
    };

    let total = spamKeywords.size();
    let confidence : Nat = (hits * 100) / total;
    let isSpam = hits >= 2;

    {
      classification = if (isSpam) "spam" else "ham";
      confidence = if (isSpam) confidence else 100 - confidence;
      isSpam = isSpam;
    };
  };
};
