const express = require("express");
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

// Init middle-ware
app.use(express.json({ extended:false }));

// define routes
app.use('/api/users', require('./routes/api/users') );
app.use('/api/auth', require('./routes/api/auth') );
app.use('/api/profile', require('./routes/api/profile') );
app.use('/api/posts', require('./routes/api/posts') );


// serve static assets in production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static(path.join(__dirname, './client/build')))

    app.get('*', function(_, res) {
      res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
        if (err) {
          res.status(500).send(err)
        }
      })
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server Running on port: ${PORT}.`);
});