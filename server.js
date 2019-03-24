let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let http = require('http').Server(app);

let io = require('socket.io')(http);
//let io = require('socket.io').listen(server);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let messages = [
    //{name: 'Sam', message: 'Hello Everyone'};
    //{name: 'Rama', message: 'Hey Guys'};
    //{name: 'Ravi', message: 'Hello Freinds'};
    //{name: 'Venky', message: 'Hello Guys'};
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    console.log(req.body);
    io.emit('message', req.body);
    messages.push(req.body);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log("A User connected");
});

let server = http.listen(5500, () => {
    console.log(`Server is running on port ${server.address().port}`);
    //console.log(__dirname);
});
