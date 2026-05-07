module {
  public type ClassificationResult = {
    classification : Text;
    confidence : Nat;
    isSpam : Bool;
  };

  public type Stats = {
    totalAnalyzed : Nat;
    totalSpam : Nat;
    totalHam : Nat;
  };
};
