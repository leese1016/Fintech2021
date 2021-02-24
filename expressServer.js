const express = require('express');
const path = require('path');
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

app.listen(3000)