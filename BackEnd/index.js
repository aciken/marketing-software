const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const User = require('./DataBase/mongoDB');
const {signup} = require('./Access/access');
const {login} = require('./Access/access');
const verify = require('./Verification/verification');
const createAffiliateLink = require('./Affiliate/createAffiliateLink');
const getLinks = require('./Affiliate/getLinks');
const editAffialiateLink = require('./Affiliate/affiliateEdit');


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.post('/signup', signup)

app.post('/login', login);

app.put('/verify', verify);

app.put('/affiliate', createAffiliateLink);

app.post('/affiliateLinks', getLinks);

app.put('/affiliateEdit', editAffialiateLink);




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});