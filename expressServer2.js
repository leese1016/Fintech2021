const express = require('express');
const path = require('path');
const request = require('request');
var jwt = require('jsonwebtoken')
var auth = require('./lib/auth.js')
const app = express();

app.use(express.json());
//json 타입에 데이터 전송을 허용한다.
app.use(express.urlencoded({ extended: false }));
//form 타입에 데이터 전송을 허용한다.
app.use(express.static(path.join(__dirname, 'public')));//to use static asset, 'public' 폴더는 외부로 공개해도 돠는 것들

app.set('views', __dirname + '/views');
//뷰 파일이 있는 디렉토리를 설정함

app.set('view engine', 'ejs');
//뷰엔진으로 ejs를 사용한다. 이 세팅이 없으면 ejs 사용 불가




var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'timtam1016',
  database : 'fintech'
});
 
connection.connect();
 

//connection.end();

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.get('/user', function (req, res) {
    connection.query('SELECT * FROM user;', function (error, results, fields) {
        console.log(results);
        res.send(results[0]);
      });
})

app.get('/ejs', function (req, res) {
    res.render('ejsTest');
  })

app.post('/userData', function(req, res){
  console.log('사용자의 요청이 발생하였습니다.')
  console.log(req.body);
  res.send(true);
})

app.get('/designTest', function(req,res){
  res.render("designSample");
})

app.get('/signup', function(req, res){
  res.render('signup');
})

app.get('/authResult', function(req, res){
  var authCode = req.query.code;
  var option = {
      method : "POST",
      url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
      header : {
          'Content-Type' : 'application/x-www-form-urlencoded'
      },
      form : {
          code : authCode,
          client_id : "b4b76158-e78b-4fb8-95f3-5ed606c10575",
          client_secret : "9d073128-35db-4801-858f-23d57eea05a2",
          redirect_uri : "http://localhost:3000/authResult",
          grant_type : "authorization_code"
      }
  }
  request(option, function(err, response, body){
      if(err){
          console.error(err);
          throw err;
      }
      else {
          var accessRequestResult = JSON.parse(body);
          console.log(accessRequestResult);
          res.render('resultChild', {data : accessRequestResult});
      }
  })
})

app.post('/signup', function(req, res) {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  var userAccessToken = req.body.userAccessToken;
  var userRefreshToken = req.body.userRefreshToken;
  var userSeqNo = req.body.userSeqNo;

  console.log(userName, userEmail, userPassword, userAccessToken);
  var sql = "INSERT INTO user (name, email, password, accesstoken, refreshtoken, userseqno) VALUES (?,?,?,?,?,?)";
  connection.query(sql,[userName, userEmail, userPassword, userAccessToken, userRefreshToken, userSeqNo], function (err, result) {
      if(err){
          console.error(err);
          throw err;
      }
      else {
          res.json(1);
      }
  });
  
})

app.get('/login', function(req, res){
  res.render('login');
})

app.post('/login', function(req, res){
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  console.log(userEmail, userPassword)
  var sql = "SELECT * FROM user WHERE email = ?";
  connection.query(sql, [userEmail], function(err, result){
      if(err){
          console.error(err);
          res.json(0);
          throw err;
      }
      else {
          
          if(result.length == 0){
              res.json(3)
          }
          else {
              var dbPassword = result[0].password;
              if(dbPassword == userPassword){
                  var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%"
                  jwt.sign(
                    {
                        userId : result[0].id,
                        userEmail : result[0].email
                    },
                    tokenKey,
                    {
                        expiresIn : '10d',
                        issuer : 'fintech.admin',
                        subject : 'user.login.info'
                    },
                    function(err, token){
                        console.log('로그인 성공', token)
                        res.json(token)
                    }
                  )            
              }
              else {
                  res.json(2);
              }
          }
      }
  })
})

app.get('/authTest', auth, function(req,res){
  res.send("정상적으로 로그인하셨다면 해당 화면이 보입니다.")
})

app.get('/main', function(req, res){
  res.render('main');
})

app.post('list', auth, function(req,res){
  
 
  var option = {
      method : "GET",
      url : "https://testapi.openbanking.or.kr/v2.0/user/me",
      headers : {
          Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzcwMTgzIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MjE5OTI5ODIsImp0aSI6ImE4MTA0ODllLWFmN2YtNDUzOC04YWQ2LWRiZWMxOGUzOTIzMSJ9._axF1-isR0RLNQDfjzV2QI4grGgiSBd5TWGqntKuZQg' 
      },
      
      qs : {
          user_seq_no : "1100770183"
      }
}
request(option, function(err, response, body){
    if(err){
        console.error(err);
        throw err;
    }
    else {
        var accessRequestResult = JSON.parse(body);
        console.log(accessRequestResult);
        res.json(LIstRequestResult);
    }
})
})

app.listen(3000)