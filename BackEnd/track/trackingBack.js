const User = require('../DataBase/mongoDB');

const tracking = async(req, res) => {
    const affiliateID = req.query.affiliateID;

    if (affiliateID) {
        try {
            // Find the user and the specific link that matches the affiliateID
            const user = await User.findOne({
                'links.affiliateUsers': {
                    $elemMatch: {
                        genKey: affiliateID
                    }
                }
            });
    
            if (user) {
                // Find the specific affiliateUser with the matching genKey
                for (let link of user.links) {
                    for (let affiliateUser of link.affiliateUsers) {
                        if (affiliateUser.genKey === affiliateID) {
                            console.log(affiliateUser.userEmail);
                            break;
                        }
                    }
                }
            } else {
                // No user found, handle accordingly
                console.log('No user found with the provided affiliateID');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            res.status(500).send('An error occurred while tracking the affiliate ID');
        }
    }
};

module.exports = tracking;