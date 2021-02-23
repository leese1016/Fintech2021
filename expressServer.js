const express = require('express')
const app = express()


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

app.listen(3000)