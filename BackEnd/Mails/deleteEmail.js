const User = require('../DataBase/mongoDB');
const client = require('@sendgrid/client');
client.setApiKey(process.env.SEND_GRID_API_KEY);

const deleteEmail = async (req, res) => {
    const {mailID, mail, index, id} = req.body;

    console.log(mailID);

    try{



const request = {
  url: `/v3/verified_senders/${mailID}`,
  method: 'DELETE',
}

client.request(request)
  .then(([response, body]) => {
    const user = User.findOne({ email: id });
    if (user) {
        const index = user.sendEmail.indexOf(mailID);
        if (index > -1) {
            user.sendMails.splice(index, 1);
            user.save();
        }
    }
    console.log(response.statusCode);
    console.log(response.body);
    res.json(response.body);
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