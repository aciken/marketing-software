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
        BackgroundColor,
        TextColor,
        ButtonColor,
        ButtonTextColor,
        HeadlineText,
        EmailSentText,
        autoApprove,
    } = req.body;

    const affiliateLink = {
        affiliateName,
        productLink,
        affiliateDescription,
        price,
        commissionRate,
        startDate,
        endDate,
        linkNumber,
        BackgroundColor,
        TextColor,
        ButtonColor,
        ButtonTextColor,
        HeadlineText,
        EmailSentText,
        affiliateUsers: [],
        autoApprove,
        emailIndex: 0,
        sendEmails: ['adrianmarton2006@gmail.com']
    };

    const user = await User.findOne({ email: id });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    user.links.push(affiliateLink);
    
    try {
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
}
}

module.exports = createAffiliateLink;