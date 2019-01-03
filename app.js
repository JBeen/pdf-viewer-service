var express = require('express');
var multer = require('multer');

var cors = require('cors');

var app = express();
app.use(cors());
app.set('view engine', 'ejs');

let fileName = "pdf-1544359129947.pdf";
const path = 'public/uploads/';

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.pdf`);
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('pdf'), function(req, res) {
  fileName = req.file.filename;
  res.end();
});

app.get('/pdf', function (req, res, next) {
  res.download(path + fileName);
});

module.exports = app;
