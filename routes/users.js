
var express = require('express');
var router = express.Router();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;//数据库向服务器发起的连接操作
var DB_CONN_STR = 'mongodb://localhost:27017/test';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resjjjjexpressource');//send相当于nodejs中的write/end功能 像浏览器输出数据
});

router.get('/login', function(req, res) {
    console.log(req.query.username,req.query.password,req.param('username'));
    res.send('get login success');
});


router.post('/login', function(req, res) {
    console.log(req.body.username,req.body.password);
    // res.send('post login success');
    var username = req.body.username;
    var password = req.body.password;

    var findData = function(db,callback){
        //连接表
        var conn = db.collection('test');
        //获取提交数据
        var data = {username:username,password:password};
        //插入数据操作
        conn.find(data).toArray(function(err,results){//toArray花接收数据很多个
            // results.render('list',{list:results})//获取数据渲染到list页面
              if(err){
                console.log(err);
                return;
            }
            callback(results);
        });
    }

    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            console.log(err);
        }else{
            console.log('connect success');
            findData(db,function(results){
                if(results.length>0){
                    console.log(results)
                     // 将用户名存储到session中，可以思考如果是对象如何保存session
                     req.session.username = results[0].username;
                    //  // 路由跳转，这里是node服务器端，所以没有window.location操作
                     // res.send('登录成功!');
                    // res.send('登录成功!');
                    // req.session.username
                    res.redirect('/');//重定向y
                }else{
                    res.send('登录失败!')
                }
                db.close();
            });
        }
    });

});


router.post('/register', function(req, res) {
    // console.log(req.body.username,req.body.password,req.param('username'));
    var username = req.body.username;
    var password = req.body.password;
    var nickname = req.body.nickname;

    var insertData = function(db,callback){
        //连接表
        var conn = db.collection('test');
        //获取提交数据
        var data = [{username:username,password:password,nickname:nickname}];
        //插入数据操作
        conn.insert(data,function(err,results){
            if(err){
                console.log(err);
                return;
            }
            //以回调方式将结果返回，在主调程序代码中可以进行回调方法的操作
            callback(results);
        });
    }

    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            console.log(err);
        }else{
            console.log('connect success');
            insertData(db,function(results){
                // console.log(results);
                res.send('注册成功')
                db.close();
            });
        }
    });
});


// router.all('/login', function(req, res) {
//   res.send('accept get or post login request');
// });


module.exports = router;
