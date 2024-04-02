const User = require('../DataBase/mongoDB');

const deleteEmail = async (req, res) => {
    const {eIndex, index, id} = req.body;

    try {
        const user = await User.findOne({ email: id });

        if (user) {
            user.markModified('links');
            user.links[index].sendEmails.splice(eIndex, 1);
            await user.save();
            res.json(user.links[index].sendEmails);
        }
}
    catch (error) {
        console.log(error)
    }

}

module.exports = deleteEmail;