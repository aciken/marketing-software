const User = require('../DataBase/mongoDB');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const affiliateLinkMail = async (req, res) => {


  const { userEmail, name, id, index} = req.body;

    const user = await User.findOne({email: id});
    console.log(id)
    console.log(user)
    if(user){

        const link = user.links[index];
        if(link){
            const affiliateUser = link.affiliateUsers.find(user => user.userEmail === userEmail);
            if(affiliateUser){
               if(affiliateUser.approved === true){
                const msg = {
                    to: userEmail,
                    from: 'adrianmarton2006@gmail.com',
                    subject: 'Affiliate link created',
                    text: `Your affiliate link for ${name} is ${affiliateUser.link}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; backgroud-color: white">
                            <h2 style="color: #3b82f6;">Affiliate Link Created</h2>
                            <p>Hello,</p>
                            <p>Your affiliate link for <strong>${name}</strong> has been created. Here is your link:</p>
                            <p><a href="${affiliateUser.link}" style="color: #3b82f6;">${affiliateUser.link}</a></p>
                            <p>Thank you for using our service!</p>
                            <p>Best,</p>
                            <p>Adrian</p>
                        </div>
                    `,
                };

                await sgMail.send(msg);
               } else {
                const msg = {
                    to: userEmail,
                    from: 'adrianmarton2006@gmail.com',
                    subject: 'Waiting for approval',
                    text: `Your registration for affiliate link for ${name} is pending approval. You will be notified when it is approved.`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; backgroud-color: white;">
                            <h2 style="color: #3b82f6;">Waiting for Approval</h2>
                            <p>Hello,</p>
                            <p>Your registration for affiliate link for <strong>${name}</strong> is pending approval. You will be notified when it is approved.</p>
                            <p>Thank you for your patience!</p>
                            <p>Best,</p>
                            <p>Adrian</p>
                        </div>
                    `,
                };
                await sgMail.send(msg);
               }
            }
        }
    }
  try {
  } catch (e) {
    console.error(e);
  }


}



module.exports = affiliateLinkMail;