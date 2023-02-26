const Users = require("../models/users");
const bcrypt = require('bcryptjs');


const userList = async (req, res) => {

    let data = await Users.find();
    res.json(data);
    console.log(data);

}

const userAdd = async (req, res) => {
    console.log(req.body);
    let {name,email,phone,password} = req.body;
    let data = await Users({name,email,phone,password});
    let response = await data.save();
    response.mytoken = await data.getAuthToken();
    console.log(data.getAuthToken)
    res.status(200).json({'message':'ok','response':response});
}

const userLogin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(301).json({ message: 'Error! please enter email and password' });
    }
    let user = await Users.findOne({ email: req.body.email });

    var responseType = {
        message: 'ok'
    }
    if (user) {
        // var match = await bcrypt.compare(req.body.password, user.password);
        var match = await bcrypt.compare(req.body.password, user.password);
        let myToken = await user.getAuthToken();
        // console.log(match);

        if (match) {
            responseType.message = 'Login Successfully';
            responseType.token = myToken;
            responseType.status = 200;
        } else {
            responseType.message = 'Wrong Password';
            responseType.status = 401;
        }
    } 
    else {
        responseType.message = 'Invalid Email id';
        responseType.status = 404;
    }
    res.status(responseType.status).json({ message: 'ok', data: responseType });


}

module.exports = {
    userList, userAdd, userLogin
}