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
const createUserLink = require('./Affiliate/createUserLink');
const getAllData = require('./Affiliate/getAllData');
const getDataFromUserID = require('./Affiliate/getDataFromUserID');
const redirectUser = require('./Redirect/redirect');


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

app.put('/affiliateUserLink', createUserLink);

app.post('/allData', getAllData);

app.post('/getDataFromUserID', getDataFromUserID);

app.post('/redirect', redirectUser)




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});