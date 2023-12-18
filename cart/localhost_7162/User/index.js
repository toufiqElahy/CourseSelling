
const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 3000;  

// If NODE_ENV is not set, 
// then this application will assume it's prod by default.
//app.set('environment', envs('NODE_ENV', 'production'));                 //Save the port number where your server will be listening
app.use(express.static('../../localhost_7162'))
//app.use(express.static('node_modules'))

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('Checkout.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/test', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('testing.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/faucet', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('faucet.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
    //console.log(process.env);
});