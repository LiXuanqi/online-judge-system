let express = require("express");
let app = express();
let restRouter = require("./routes/rest");
let indexRouter = require("./routes/index");
let mongoose = require("mongoose");
let path = require("path");
let http = require("http");

let socketIo = require('socket.io');
let io = socketIo();
let socketService = require('./services/socketService')(io);

mongoose.connect("mongodb://root:root7777777@ds113826.mlab.com:13826/online-judge");

app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.use("/api/v1", restRouter);

// handle refresh.
app.use((req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, '../public/') });
});


let server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  throw error;
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr == 'string'
    ? 'pipe' + addr
    : 'port' + addr.port;
  console.log('Listiening on ' + bind);
}