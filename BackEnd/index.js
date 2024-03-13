const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const User = require('./DataBase/mongoDB');
const {signup} = require('./Access/access');
const {login} = require('./Access/access');
const verify = require('./Verification/verification');


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.post('/signup', signup)

app.post('/login', login);

app.put('/verify', verify);




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});