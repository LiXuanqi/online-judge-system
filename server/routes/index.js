let express = require("express");
let router = express.Router();
let path = require("path");

router.get('/', (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, '../../public')});
})

module.exports = router;