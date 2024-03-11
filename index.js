import express from "express"


//Create express App
const app = express();

//define routes
app.get('/', (req, res) => {
    // console.log(req.query, req.headers);
    res.send('requests noted');
});
 
app.get('/ping', (req, res) => {
    // console.log(req.query, req.headers);
    res.send('ping pong');
});

app.get('/file', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
});

//Listen for incoming requests
app.listen(4000, () => {
    console.log ("Express App is running!")
});