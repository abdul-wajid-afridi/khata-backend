const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");

const port = process.env.PORT || 7000;

// all Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    data: "my data",
    message: "testting my api",
  });
});

app.post("/get", (req, res) => {
  res.json({
    data: "my data",
    datas: req.body,
  });
});

// Routes
app.use(express.static("upload"));
app.use("/shop", require("./routes/AdminRoutes"));
app.use("/shop", require("./routes/customerKhataRoutes"));
app.use("/shop", require("./routes/purchaseRoutes"));
app.use("/shop", require("./routes/PaymentsRoutes"));
console.log("testing");

db.sequelize.sync().then(() => {
  app.listen(port, console.log(`app runs on ${port}`));
});

// // const { SerialPort } = require("serialport")
// const serialPort = require("serialport");

// const SerialPort = new serialPort.SerialPort();
// const portName = process.argv[2];

// const myPort = SerialPort(portName, {
//   baudRate: 9600,
//   parser: serialPort.parsers.readLine({
//     delimiter: "\r\n",
//   }),
// });

// const onOpen = () => {
//   console.log("port open");
// };
// const onData = (data) => {
//   console.log("data is :");
// };
// myPort.on("open", onOpen);
// myPort.on("data", onData);
