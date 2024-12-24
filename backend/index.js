import express from 'express';
import bodyParser from 'body-parser';
import User from './model.js';
import { Keypair, Transaction ,PublicKey} from '@solana/web3.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bs58 from 'bs58';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const JWT_SCRET = 'a_secret_key';

app.post('/api/v1/signup',async (req,res)=>{

    const key = new Keypair();
    const user = new User({
        username :req.body.username,
        password :  req.body.password,
        publicKey : key.publicKey.toString(),
        privateKey : key.secretKey.toString()
    })
    await user.save()
    console.log(user)
    res.send(user)
})

app.post('/api/v1/signin',async (req,res)=>{
    const {username,password} = req.body;
    await User.findOne({username,password})
    .then(user=>{
        const token = jwt.sign({user},JWT_SCRET);
        res.send(token)
        console.log(token)
    })
    .catch((err)=>{
        console.log(err)
        res.send('invalid user')
    })
})

app.post('/api/v1/txn/sign',async(req,res)=>{
    const {serializedTransaction} = req.body;
    const transaction = Transaction.from(Buffer.from(serializedTransaction));
    await User.findOne({username:'sagar'})
    .then(user=>{
        console.log(bs58)
        const keyPair = Keypair.fromSecretKey(bs58.decode(user.privateKey));
    //    const publicKey = new PublicKey(user.publicKey);
    //    const privateKey = Uint8Array.from(user.privateKey);
    //    const keypair = Keypair.fromSecretKey(privateKey);
    //    console.log(keypair)
    })
    .catch((err)=>{
        console.log(err)
        res.send('invalid user')
    })

    res.send('sign')
})

app.get('/api/v1/txn', (req, res) => {
    const { id } = req.query; // Access query parameter 'id'
    res.send(`transaction ID: ${id}`);
});



app.listen(8080,()=>{
    console.log('server started at port 8080');
})