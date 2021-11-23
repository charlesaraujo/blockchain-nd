import { createHash } from "crypto";
import { Transaction } from "./Transaction";

export class Block {
  public nonce = Math.round(Math.random() * 99984585);
  constructor(
    public previousHash: string,
    public transaction: Transaction,
    public timestamp = Date.now()
  ) {}

  get hash(): string {
    const str = JSON.stringify(this);
    const hash = createHash("SHA256");
    hash.update(str).end();
    return hash.digest("hex");
  }
}
