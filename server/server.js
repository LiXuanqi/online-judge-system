let express = require("express");
let app = express();
let restRouter = require("./routes/rest");
let mongoose = require("mongoose");

mongoose.connect("mongodb://root:root7777777@ds113826.mlab.com:13826/online-judge");

app.use("/api/v1", restRouter);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
