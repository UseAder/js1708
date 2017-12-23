var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/test';

router.post('/submit',function(req,res){
	var username = req.session.username || '';
	if(username){
		var title = req.body.title;//post提交得到数据
	    var content = req.body.content;

	    var insertData = function(db,callback){
	        //连接表
	        var conn = db.collection('comment');
	        //获取提交数据
	        var data = [{title:title,content:content,username:username}];
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
	                res.send('提交评论成功')
	                res.redirect('/');
	                db.close();
	            });
	        }
	    });
	}else{
		res.send('<script>alert("session过期，重新登录");location.href="/login";</script>')
	}

});

module.exports = router;
