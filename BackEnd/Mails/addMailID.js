const User = require('../DataBase/mongoDB');

const addMailID = async (req, res) => {

    const { id, index, emailID } = req.body;



    try {
        const user = await User.findOne({email:id });

        if(user){
            if(!user.sendMails.includes(emailID)){
                user.markModified('links');
                user.sendMails.push(emailID);
                await user.save();
                res.json({message: 'Email added'});
            }
            else{
                res.json({message: 'Email already exists'});
            }
        }

}
    catch (error) {
        console.log(error)
    }
}

 module.exports = addMailID;


