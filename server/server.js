const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const model = require("./model");
const Chat = model.getModel("chat");

const userRouter = require("./user");

// io.on("connection", function(socket) {
//   socket.on("sendMsg", function(data) {
//     console.log(`on send Msg`);

//     const { from, to, text } = data;
//     const chatId = [from, to].sort().join("_");

//     Chat.create({ from, to, text, chatId }, function(err, doc) {
//       if (!err && doc) {
//         console.log(doc);

//         io.emit("readMsg", doc._doc);
//       }
//     });
//   });
// });

// Chat.remove({}, function(req, res) {
//   console.log(`remove successfully`);
// });

io.on("connection", function(socket) {
  socket.on("sendMsg", function(data) {
    const { from, to, text } = data;

    // console.log(text);
    const chatId = [from, to].sort().join("_");
    Chat.create({ chatId, from, to, text }, function(err, doc) {
      if (!err && doc) {
        // console.log(doc);
        io.emit("readMsg", doc);
      }
    });
  });
});
// Chat.remove({}, function(req, res) {
//   console.log(`remove successfully`);
// });

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user", userRouter);
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.get("/", function(req, res) {
  return res.send(
    `<h1>welcome to react chat app</h1>
    <p>you can use http://localhost:9093/user/info to see the information of current user</p>
    <p>you can ues http://localhost:9093/user/list?kind=boss to see the list of boss users</p>
    <p>you can ues http://localhost:9093/user/list?kind=genius to see the list of genius users</p>
    `
  );
});

server.listen(9093, function() {
  console.log(`node app starts at port 9093`);
});
