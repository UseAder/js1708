var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expgggggggggggggggggress',name:'<b>vane</b>',username:req.session.username });//send相当于nodejs中的write/end功能 像浏览器输出数据
});
router.get('/login', function(req, res) {
  res.render('login', {name:'<b>vane</b>'});
  // req.session.destory(function(err){
    // res.redirect('/')
  // })
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.get('/comment', function(req, res) {
  res.render('comment', {});
});

router.get('/ab*cd', function(req, res) {
    res.send('路由正则匹配');
});

router.get('/html', function(req, res) {
  // res.sendFile('/Users/vane/Documents/tutorial/NodeJs/08.course-basicNodeJs-express/package.json');
  // console.log(__dirname);
  res.sendFile(path.join(__dirname,'../public','json/package.json'));
  // res.sendFile(path.join(__dirname,'../public','images/face.jpg'));
});

module.exports = router;
