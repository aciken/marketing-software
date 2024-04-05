const User = require('../DataBase/mongoDB');
const client = require('@sendgrid/client');
client.setApiKey(process.env.SEND_GRID_API_KEY);
require('dotenv').config();

const VerificationEmail = async (req, res) => {



    const {id,index,nickname,fromEmail,fromName,replyTo,replyToName,address,address2,country,city,zip,email} = req.body;

    const data = {
        "nickname": nickname,
        "from": {
          "email": fromEmail,
          "name": fromName
        },
        "reply_to": {
          "email": replyTo,
          "name": replyToName
        },
        "address": address,
        "address_2": address2,
        "city": city,
        "zip": zip,
        "country": country,
      };

    // const data = {
    //     "nickname": nickname,
    //     "from_email": fromEmail,
    //     "from_name": fromName,
    //     "reply_to": replyTo,
    //     "reply_to_name": replyToName,
    //     "address": address,
    //     "address2": address2,
    //     "city": city,
    //     "country": country,
    //     "zip": zip,
    //   };
      
      const request = {
        url: `/v3/senders`,
        method: 'POST',
        body: data
      }
      
      try{
        client.request(request)
        .then(([response, body]) => {
            res.json(response.body);
          console.log(response.statusCode);
          console.log(response.body);
        })
          .catch(error => {
            res.json(error.response.body.errors[0].message);
              console.error(error.response.body.errors);
          });
      }
        catch(error){
            console.error(error);
      }
    }

module.exports = VerificationEmail;



