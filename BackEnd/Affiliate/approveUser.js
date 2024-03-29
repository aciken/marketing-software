const User = require('../DataBase/mongoDB');

const approveUser = async (req, res) => {
    const { id, index, userEmail } = req.body;
    try {
        const user = await User.findOne({ email: id });
        if(user){
            const link = user.links[index];
            if(link){
                const affiliateUser = link.affiliateUsers.find(user => user.userEmail === userEmail);
                if(affiliateUser){
                    affiliateUser.approved = true;
                    user.markModified('links');
                    try {
                        await user.save();
                    }
                    catch (error) {
                        console.error(error);
                        res.status(500).send('Server error');
                    }

                    res.status(200).send('User approved');
                } else {
                    res.status(400).send('Affiliate user not found');
                }
            } else {
                res.status(400).send('Link not found');
            }
        } else {
            res.status(400).send('User not found')
        }      
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = approveUser;