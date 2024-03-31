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
        linkNumber,
        userEmail,
        userID
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

    const genKey = generateRandomString();


       let affiliateUserDataFalse = {
        userEmail,
        approved: false,
        commission: commissionRate,
        affPrice: price,
        start: startDate,
        end: endDate,
        id: userID,
        genKey,
        link: `http://localhost:5173/${affiliateName}/${userID}/${linkNumber}/${genKey}`,
        linkRedirect: productLink,
        redirects: 0 
    } 

    let affiliateUserDataTrue = {
        userEmail,
        approved: true,
        commission: commissionRate,
        affPrice: price,
        start: startDate,
        end: endDate,
        id: userID,
        genKey,
        link: `http://localhost:5173/${affiliateName}/${userID}/${linkNumber}/${genKey}`,
        linkRedirect: productLink,
        redirects: 0 
    }
    
    console.log('started')
    
    const user = await User.findOne({ 
        userAffiliateID: userID });
    
        if(user){

            if(user.links[linkNumber].autoApprove == false){
                const { userEmail } = affiliateUserDataFalse;
                const doesUserExist = user.links[linkNumber].affiliateUsers.some(element => element.userEmail === userEmail);
                if(doesUserExist){
                    res.status(200).json('User already exists');
                } else {
                    user.links[linkNumber].affiliateUsers.push(affiliateUserDataFalse);
                    try {
                        user.markModified('links');
                        await user.save();
                        res.status(200).json(user);
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: error.message });
                    }
                }
            } else{
                const { userEmail } = affiliateUserDataTrue;
                const doesUserExist = user.links[linkNumber].affiliateUsers.some(element => element.userEmail === userEmail);
                if(doesUserExist){
                    res.status(200).json('User already exists');
                } else {
                    user.links[linkNumber].affiliateUsers.push(affiliateUserDataTrue);
                    try {
                        user.markModified('links');
                        await user.save();
                        res.status(200).json(user);
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: error.message });
                    }
                }
            }

        }

}

module.exports = createAffiliateLink;