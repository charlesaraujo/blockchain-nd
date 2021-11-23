import { Wallet } from "./src/Wallet";
import { Chain } from "./src/Chain";
const charles = new Wallet();
const chato = new Wallet();
const willian = new Wallet();

charles.send(20, chato.publicKey);
chato.send(10, willian.publicKey);
willian.send(30, charles.publicKey);

console.log(Chain.instance);
