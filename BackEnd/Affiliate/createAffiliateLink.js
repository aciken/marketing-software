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
        sendEmail: 'adrianmarton2006@gmail.com',
        SendEmailText1:'Your affiliate link for ' + affiliateName + ' has been created. Here is your link: ' + productLink + ' Thank you for using our service! Best, Adrian',
        SendEmailText2: 'Your registration for affiliate link for ' + affiliateName + ' is pending approval. You will be notified when it is approved. Thank you for your patience! Best, Adrian',
        SendEmailText3: 'Your registration for affiliate link for ' + affiliateName + 'has been approved and your affiliate link is: ' + productLink + ' Thank you for using our service! Best, Adrian',
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