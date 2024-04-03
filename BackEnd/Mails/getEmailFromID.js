const User = require('../DataBase/mongoDB');
const client = require('@sendgrid/client');
require('dotenv').config();
client.setApiKey(process.env.SEND_GRID_API_KEY);

const getEmailFromID = async (req, res) => {
    const { id } = req.body;

    const allData = [];

    try {
        const user = await User.findOne({ email: id });

        if (user) {
            const emailIDs = user.sendMails;
            for (let i = 0; i < emailIDs.length; i++) {
               const sender_id = emailIDs[i];
                const request = {
                     url: `/v3/senders/${sender_id}`,
                     method: 'GET'
                }
                client.request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
    allData.push(response.body);
    if(allData.length === emailIDs.length){
        res.json(allData);
    }
  })
  .catch(error => {
    console.error(error);
  });
        }
}
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = getEmailFromID;