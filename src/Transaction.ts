export class Transaction {
  constructor(
    public amount: number,
    public sender: string, //public key
    public recipient: string //public key
  ) {}

  toString(): string {
    return JSON.stringify(this);
  }
}
