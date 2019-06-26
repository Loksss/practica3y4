const mongoose = require('mongoose');
mongoose.connect("mongodb://172.18.0.2:27017/crud",{ useNewUrlParser: true });
module.exports = mongoose;

//celu ip:192.168.43.220
//mongo ip:172.18.0.2
//ipv:192.168.1.112
//192.168.1.117