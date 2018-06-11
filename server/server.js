let express = require("express");
let app = express();
let restRouter = require("./routes/rest");
let indexRouter = require("./routes/index");
let mongoose = require("mongoose");
let path = require("path");

mongoose.connect("mongodb://root:root7777777@ds113826.mlab.com:13826/online-judge");

app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.use("/api/v1", restRouter);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
