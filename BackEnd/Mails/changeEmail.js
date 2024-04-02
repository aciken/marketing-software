const User = require('../DataBase/mongoDB');

const changeEmail = async (req, res) => {
    const {eIndex,index, id } = req.body;

    try {
        const user = await User.findOne({email: id });

        if(user){
            user.markModified('links');
            user.links[index].emailIndex = eIndex;
            await user.save();
            res.json({ emailIndex: user.links[index].emailIndex });
        }
        
    } catch (error) {
        console.log(error)  
    }

}

module.exports = changeEmail;