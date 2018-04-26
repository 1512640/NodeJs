var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Bé tập tính', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});
/*router.get('/:id1 :id2', function(req, res, next) {
    res.render('/', {s1: req.params.expr,s1: req.params.expr1});
});*/
router.post('/', function(req, res, next) {
  req.check('expr', 'Số thứ nhất -> phải là số').isNumeric();
  req.check('expr1', 'Số thứ hai -> phải là số').isNumeric();
  var errors = req.validationErrors();
  if (errors) {
      req.session.errors = errors;
      req.session.success = false;
  } else {
      req.session.success = true;
  }
  var kq = '';
  var s1 = req.body.expr;
  s1 = parseInt(s1, 10);
  var s2 = req.body.expr1;
  s2 = parseInt(s2, 10);
  var radio;
  var loiPhepTinh = true;
  radio = req.body.phepToan;
  if (radio === undefined) {
    loiPhepTinh=false;
    var thongBao = 'Cần chọn phép tính';
  }
  else {
      //cong
      if (!radio.localeCompare('cong')) {
          kq = s1 + s2;
          kq = parseInt(kq, 10);
      }
      ;
      //tru
      if (!radio.localeCompare('tru')) {
          kq = s1 - s2;
          kq = parseInt(kq, 10);
      }
      ;
      //nhan
      if (!radio.localeCompare('nhan')) {
          kq = s1 * s2;
          kq = parseInt(kq, 10);
      }
      ;
      //chia
      if (!radio.localeCompare('chia')) {
          kq = s1 / s2;
          kq = parseInt(kq, 10);
      }
      ;
  }
  res.render('home',{s1,s2,kq,errors,loiPhepTinh,thongBao});
});

module.exports = router;
