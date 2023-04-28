var express = require('express');
var router = express.Router();
const postsController = require("../controllers/test");

/* GET home page. */

router.get("/", postsController.getTopTwenty);
// router.get('/', async function(req, res, next) { 
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
