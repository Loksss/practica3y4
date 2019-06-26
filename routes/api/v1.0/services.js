var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
//var _ = require("underscore");
var User = require("../../../database/collections/user");

var jwt = require("jsonwebtoken");

//en este metodo es que nos generara el token, enviando el name y password
//en el metodo post
/*http://localhost:8000/api/v1.0/login*/

router.post("/login", (req, res,) => {
  var name = req.body.name;
  var password = req.body.password;
  var result = User.findOne({name: name,password: password}).exec((err, doc) => {
    if (err) {
      res.status(200).json({
        msn : "No se puede concretar con la peticion "
      });
      return;
    }
    if (doc) {
      //res.status(200).json(doc);
      jwt.sign({name: doc.name, password: doc.password}, "secretkey123", (err, token) => {
          console.log(err);
          res.status(200).json({
            token : token
          });
      })
    } else {
      res.status(200).json({
        msn : "El usuario no existe ne la base de datos"
      });
    }
  });
});

//envio de usuario
router.post('/user', (req, res) => {
  //Ejemplo de validacion
  if (req.body.name == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var user = {
    name : req.body.name,
    password : req.body.password,
    email : req.body.email,
    fechaRegistro : req.body.fechaRegistro
  };
  var userData = new User(user);

  userData.save().then( (rr) => {
    //content-type
    res.status(200).json({
      "id" : rr._id,
      "msn" : "usuario registrado"
    });
  });
});

//obtener usuario
router.get('/user', /*verifytoken,*/ (req, res, next)=> {
      User.find({}).exec((error, docs) => {
        res.status(200).json(docs);
  })
  
});

router.delete(/user\/[a-z0-9]{1,}$/, /*verifytoken,*/ (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

module.exports = router;