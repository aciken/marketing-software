const User = require('../DataBase/mongoDB');

const createAffiliateLink = async (req, res) => {
    const { 
        affiliateName, 
        productLink, 
        affiliateDescription, 
        price, 
        commissionRate, 
        startDate, 
        endDate, 
        id,
        linkNumber,
        userEmail
    } = req.body;

    function generateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    let affiliateUserData = {
        userEmail,
        commission: commissionRate,
        affPrice: price,
        start: startDate,
        end: endDate,
        link: `${productLink}/${generateRandomString()} `    
    }
    
    console.log('started')
    
    const user = await User.findOne({ email: id });
    
    if(user){
        console.log(user.links[linkNumber]);
        user.links[linkNumber].affiliateUsers.push(affiliateUserData);
        try {
            const updatedUser = await user.markModified('links');
            await user.save();
            res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = createAffiliateLink;