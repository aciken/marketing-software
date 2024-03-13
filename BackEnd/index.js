const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const User = require('./DataBase/mongoDB');
const {signup} = require('./Access/access');
const {login} = require('./Access/access');


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.post('/signup', signup)

app.post('/login', login);




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});