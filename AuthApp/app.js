const express= require('express');
const path= require('path');
const bodyParser= require('body-parser');
const cors= require('cors');
const passport= require('passport');
const mongoose= require('mongoose');
const config = require('./config/database')

mongoose.connect(config.database);

mongoose.connection.on('connected', () =>{
  console.log('Connected to db: '+config.database);
});

mongoose.connection.on('erro', (err) =>{
  console.log('db error: '+ err);
});

const app = express();
const port = 3500;
const users = require('./routes/users')

app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//Index Route
app.get('/', (req,res) => {
    res.send('Invalid Endpoint!')
});

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(port, () =>{
  console.log("Server started on port: "+ port);
});
