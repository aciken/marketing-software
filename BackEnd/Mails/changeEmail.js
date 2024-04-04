const User = require('../DataBase/mongoDB');

const changeEmail = async (req, res) => {
    const {id, index, funcEmail} = req.body;

    try {
        const user = await User.findOne({email: id });

        if(user){
            user.markModified('links');
            user.links[index].sendEmail = funcEmail;
            await user.save();
            res.json(user.links[index].sendEmail);
        }
        
    } catch (error) {
        console.log(error)  
    }

}

module.exports = changeEmail;