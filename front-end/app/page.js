'use client';
import {Connection, PublicKey, SystemProgram, Transaction} from '@solana/web3.js';
import axios from 'axios';


export default function Home() {
  const sendSol =  async () => {
    const connection = new Connection('https://api.devnet.solana.com');
    const publicKey = new PublicKey('AeEgt6u3fgXyE6arb5Kq9mZWnr3bTbhfKWrWULW9dq5m');
    const toPublicKey = new PublicKey('sREtZDzfJBvnerJ64UFLESHroXWxnT362jm9ao5GyX1');
    const lamports = 1000000000;
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toPublicKey,
        lamports,
      })
    );

    const { blockhash } = await connection.getLatestBlockhash();
    console.log(blockhash);
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;
    const serializedTransaction = transaction.serialize({
      requireAllSignatures : false,
      verifySignatures : false
    });

    await axios.post('http://localhost:8080/api/v1/txn/sign', {
      serializedTransaction
    })

  };

  return (
    <div className="mx-auto px-20 grid grid-cols-3 gap-4 mt-10">
      <input type="text" placeholder="address" />
      <input type="text" placeholder="amount" />
      <button onClick={sendSol}>Send</button>
    </div>
  );
}
