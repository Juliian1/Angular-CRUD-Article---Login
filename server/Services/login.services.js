const User = require('../DAO/loginDAO');
const jwt = require('jsonwebtoken'); //con esto se encripta mi password
const bcrypt = require('bcryptjs');
const SECRET_KEY = '';

exports.loginUser = (req, res, next) => {
    const userData ={
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({username: userData.username}, (err, user) => {//findOne es mongose || y buscara el parametro userData y dentro esta el email
        if (err) return res.status(500).send('Server error!');
        if (!user) {
            // username does not exist
            res.status(409).send({message: 'Something is wrong'});
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password) //El userData es la contraseña del usuario que recibo desde el frontend y la user.password es lo que se ha recuperado de la DB
            if(resultPassword) {
                const expiresIn = 24*60*60;
                const accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});
                
                const dataUser = {
                    username: user.username, // Este es el que me devuelve cuando lo guarda en la DB
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({ dataUser }); // Esta es la respuesta que me llegara al Front
            } else {
                // passqord wrong
                res.status(409).send({message: 'Something is wrong'});
            }
        }
    }) 
}