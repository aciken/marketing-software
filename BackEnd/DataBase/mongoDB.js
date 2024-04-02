const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/marketing-software')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err));


const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    verify:{
        type: Number,
        default: 0
    },
    links: {
        type: Array,
        default: []
    },
    affiliatePeople:{
        type: Array,
        default: []
    },
    userAffiliateID:{
      type: String,
      default: ''
    },
    });



    const User = mongoose.model('User', UserSchema);

    module.exports = User;
