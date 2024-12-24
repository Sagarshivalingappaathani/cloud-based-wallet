import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/cloud-walleet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    publicKey: String,
    privateKey: String
})

const User = mongoose.model('User', userSchema);

export default User;