const User = require('../DataBase/mongoDB');
const client = require('@sendgrid/client');
client.setApiKey(process.env.SEND_GRID_API_KEY);

const deleteEmail = async (req, res) => {
    const {mailID, mail, index, id} = req.body;

    console.log(mailID);

    try{

      const user = await User.findOne({ email: id });
      console.log(`First User: ${user}`)
      console.log('USERRR: ', user.sendMails)
      if (user && Array.isArray(user.sendMails)) {
        const index = user.sendMails.indexOf(mailID);
        console.log(`INDEX: ${index}`)
        if (index > -1) {
            user.sendMails.splice(index, 1);
            user.markModified('sendMails');
            console.log(`USER: ${user.sendMails}`);
            res.json(user.sendMails)
            user.save();
        }
    }

const request = {
  url: `/v3/verified_senders/${mailID}`,
  method: 'DELETE',
}

client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);

  })
  .catch(error => {
    console.error(error);
    res.json(error);
  });
    }
    catch(error){
        res.json(error);
    }


}

module.exports = deleteEmail;