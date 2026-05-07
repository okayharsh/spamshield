import SpamLib "../lib/spam-detection";
import Types "../types/spam-detection";

mixin () {
  var totalAnalyzed : Nat = 0;
  var totalSpam : Nat = 0;

  /// Classify an SMS message and update global stats.
  public func classifyMessage(text : Text) : async Types.ClassificationResult {
    let result = SpamLib.classify(text);
    totalAnalyzed += 1;
    if (result.isSpam) { totalSpam += 1 };
    result;
  };

  /// Return aggregate statistics for all analyzed messages.
  public query func getStats() : async Types.Stats {
    {
      totalAnalyzed = totalAnalyzed;
      totalSpam = totalSpam;
      totalHam = totalAnalyzed - totalSpam;
    };
  };
};
