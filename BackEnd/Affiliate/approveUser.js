const User = require('../DataBase/mongoDB');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

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
                        const msg = {
                            to: userEmail,
                            from: 'adrianmarton2006@gmail.com',
                            subject: 'Affiliate link created',
                            text: `Your affiliate link for ${user.links[index].affiliateName} is ${affiliateUser.link}`,
                            html: `
                                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; backgroud-color: white">
                                    <h2 style="color: #3b82f6;">Affiliate Link Has Been Approved</h2>
                                    <p>Hello,</p>
                                    <p>Your affiliate link for <strong>${user.links[index].affiliateName}</strong> has been created. Here is your link:</p>
                                    <p><a href="${affiliateUser.link}" style="color: #3b82f6;">${affiliateUser.link}</a></p>
                                    <p>Thank you for using our service!</p>
                                    <p>Best,</p>
                                    <p>Adrian</p>
                                </div>
                            `,
                        };
        
                        await sgMail.send(msg);
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