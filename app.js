var express = require('express');
var multer = require('multer');

var cors = require('cors');

var app = express();
app.use(cors());
app.set('view engine', 'ejs');

let fileName = null;
const path = 'public/';

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path)
  },
  filename: function (req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}.pdf`;
    cb(null, fileName);
  }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('pdf'), function(req, res) {
  fileName = req.file.filename;
  res.end();
});

app.get('/pdf', function (req, res, next) {
  if (fileName) {
    res.download(path + fileName);
  }
});

module.exports = app;
