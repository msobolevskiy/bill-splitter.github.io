// используем express для создание web сервера 
const express = require('express');
const bodyParser = require('body-parser');
// используем для конекшена с базой
const dbServices = require('./logInService.js');
// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, access-control-allow-origin');

    next();
});
// в перспективе будет возвращать всех юзеров из базы
app.get('/api/v1/User', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'Return all users',
    });
});
/**
 * ендпоинт испольуется для получения юзера по имейлу и паролю
 */
app.post('/api/v1/GetUser', async (req, res) => {
    let foundUser;
    if (!req.body.userEmail) {
        return res.status(400).send({
            success: 'false',
            message: 'userEmail is required'
        });
    } else if (!req.body.password) {
        return res.status(400).send({
            success: 'false',
            message: 'password is required'
        });
    }

    try {
        foundUser = await dbServices.getUniqueUser(req.body.userEmail, req.body.password);
    } catch (err) {
        return res.status(400).send({
            success: 'false',
            message: 'User was not found'
        });
    }

    return res.status(200).send({
        success: 'true',
        message: 'User was found',
        foundUser: foundUser
    });
});

/**
 * ендпоинт используется для создания юзера, нужно передать имейл, пароль и юзернейм
 */
app.post('/api/v1/CreateUser', async (req, res) => {
    if (!req.body.userEmail) {
        return res.status(400).send({
            success: 'false',
            message: 'userEmail is required'
        });
    } else if (!req.body.password) {
        return res.status(400).send({
            success: 'false',
            message: 'password is required'
        });
    } else if (!req.body.userName) {
        return res.status(400).send({
            success: 'false',
            message: 'userName is required'
        });
    }
    const User = {
        id: 1,
        userEmail: req.body.userEmail,
        password: req.body.password,
        userName: req.body.userName,
    };
    try {
        await dbServices.setUniqueUser(req.body.userEmail, req.body.password, req.body.userName);
    } catch (err) {
        return res.status(400).send({
            success: 'false',
            message: 'User was not added'
        });
    }
    return res.status(201).send({
        success: 'true',
        message: 'User was added successfully',
        User
    });
});
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});