const User = require('../DataBase/mongoDB');

const addMail = async (req, res) => {
    const { email, id, index } = req.body;

    const emailArray = [email, false]

    try {
        const user = await User.findOne({ email:id });
        if(user){
            console.log(user.links[index].sendEmails, email)
            if (!user.links[index].sendEmails.some(([emailInArray]) => emailInArray === email)) {
                user.markModified('links');
                user.links[index].sendEmails.push(emailArray);
                await user.save();
                res.json({message: 'Email added'});
            } else {
                res.json({message: 'Email already exists'});
            }
        } else {
            res.json({message: 'User not found'});
        }
    } catch (error) {
        res.json({message: 'Error'});
    }
}

module.exports = addMail;