import { createHash, createVerify } from "crypto";
import { Block } from "./Block";
import { Transaction } from "./Transaction";

export class Chain {
  public static instance = new Chain();

  chain: Block[] = [];
  constructor() {
    this.chain = [new Block("", new Transaction(100, `charles`, `chato`))];
  }

  get lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce: number): number {
    let solution = 1;
    console.log("mining...");

    while (true) {
      const hash = createHash("MD5");
      hash.update((nonce + solution).toString()).end();

      const attempt = hash.digest("hex");

      if (attempt.substr(0, 4) === "0000") {
        console.log(`found a solution! : ${solution}`);
        return solution;
      }
      solution += 1;
    }
  }

  addBlock(
    transaction: Transaction,
    senderPublicKey: string,
    signature: Buffer
  ): void {
    const verifier = createVerify("SHA256");
    verifier.update(transaction.toString());

    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.mine(newBlock.nonce);
      this.chain.push(newBlock);
    }
  }
}
