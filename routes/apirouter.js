var express = require('express');
var router = express.Router();
//practica2 crud persona
var USERs = require("../database/Persona");
//practica2 crud mascota
var USER = require("../database/Mascota");

router.get('/persona', (req, res) => {
    var params = req.query;
    console.log(params);var limit = 100;
    if (params.limit != null) {
        limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
        if (params.order == "desc") {
             order = -1;
        } else if (params.order == "asc") {
            order = 1;
            }
        }
    var skip = 0;
    if (params.skip != null) {
        skip = parseInt(params.skip);
    }
    USERs.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
        res.status(200).json(docs);
    });
});

router.post('/persona',async(req, res) => {
    var params = req.body;
    params["fechaRegistro"] = new Date();
    var Persona = new USERs(params);
    var result = await Persona.save();
    res.status(200).json(result);
});

router.patch('/persona', (req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
            msn: "Error no existe id"
        });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    USERs.findOneAndUpdate({_id: id}, params, (err, docs) => {
        res.status(200).json(docs);
    });
});

router.delete('/persona', async(req, res) => {
    if (req.query.id == null) {
       res.status(300).json({
       msn: "Error no existe id"
    });return;
   }
   var r = await USERs.remove({_id: req.query.id});
    res.status(300).json(r);
});

//practica 2 mascota
router.get('/mascota', (req, res) => {
    var params = req.query;
    console.log(params);var limit = 100;
    if (params.limit != null) {
        limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
        if (params.order == "desc") {
            order = -1;
    } else if (params.order == "asc") {
            order = 1;
        }
    }
    var skip = 0;
    if (params.skip != null) {
        skip = parseInt(params.skip);
    }
    USER.find({}).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => {
        res.status(200).json(docs);
    });
});

router.post('/mascota',async(req, res) => {
    var params = req.body;
    var users = new USER(params);
    var result = await users.save();
        res.status(200).json(result);
});

router.patch('/mascota', (req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
            msn: "Error no existe id"
        });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    USER.findOneAndUpdate({_id: id}, params, (err, docs) => {
        res.status(200).json(docs);
    });
});

router.delete('/mascota', async(req, res) => {
    if (req.query.id == null) {
        res.status(300).json({
        msn: "Error no existe id"
    });return;
    }
    var r = await USER.remove({_id: req.query.id});
       res.status(300).json(r);
});

module.exports = router;