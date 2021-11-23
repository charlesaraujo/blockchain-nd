import { generateKeyPairSync, createSign } from "crypto";
import { Chain } from "./Chain";
import { Transaction } from "./Transaction";

export class Wallet {
  public publicKey: string;
  public privateKey: string;

  constructor() {
    const keypair = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
  }
  send(amount: number, recipientPublicKey: string): void {
    const transaction = new Transaction(
      amount,
      this.publicKey,
      recipientPublicKey
    );
    const sign = createSign("SHA256");
    sign.update(transaction.toString()).end();
    const signature = sign.sign(this.privateKey);

    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}
