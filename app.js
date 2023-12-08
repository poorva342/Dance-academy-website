const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser= require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
}
const port = 80;
const cSchema = new mongoose.Schema({
});
const kittySchema = new mongoose.Schema({
    name: String,
    contact: String,
    address: String,
    dance_style : String,
 
  });

  

  const Contact1 = mongoose.model('Contact1', kittySchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{

    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{

    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact' ,(req,res)=>{
    var myData= new Contact1(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
   
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
