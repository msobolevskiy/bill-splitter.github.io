const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';


/**
 * аснхронная функция возвращающая промисы / создаёт 
 * отправляет введённые при регистрации данные в коллекцию
 */
const setUniqueUser = async (userEmail, password, userName) => {
    let insertUserResponse;
    // устанавливает соединение с базой
    const {
        collection,
        client
    } = await _bdConnectionWorker(url, "Users", "credentials");

    // добавляет в коллекцию новый объект в коллекцию
    try {
        insertUserResponse = await collection.insertOne({
            email: userEmail,
            password: password,
            name: userName
        });
    } catch (err) {
        return _errorWorker(client, `Error while creating new User with the following creds: \nuserEmail=${userEmail}\npassword=${password}\nuserName=${userName}`);
    }

    if (!insertUserResponse.insertedId) {
        return _errorWorker(client, `User is not no created in 'credentials' collection with the following email: userEmail=${userEmail}`);
    }

    console.log(`User was storaged with the following creds: \nuserEmail=${userEmail}\npassword=${password}\nuserName=${userName}`);
    // закрывает конекшн с базой 
    await client.close();
};
/**
 * как правильно называются эти функции ? (высшего порядка) 
 * вытягивает из коллекци email и password
 */

const getUniqueUser = async (userEmail, password) => {
    const {
        collection,
        client
    } = await _bdConnectionWorker(url, "Users", "credentials");
    //  find - метож для поиска объекта в базе.
    const foundUser = await collection.find({
        email: userEmail,
        password: password
    }).toArray();

    if (foundUser.length === 0) {
        return _errorWorker(client, `User was not found with the following creds: \nuserEmail=${userEmail}\npassword${password}.`);
    }
    console.log(`User was found!`);

    await client.close();
    return foundUser[0];
};


// функция для создания конекшена с базой 
const _bdConnectionWorker = async (url, bdName, collectionName) => {
    let client;
    let db;
    let collection;


    try {
        client = await mongo.connect(url);
    } catch (err) {
        return _errorWorker(client, 'Error with mongoDB connection.');
    }

    try {
        db = await client.db(bdName);
    } catch (err) {
        return _errorWorker(client, `Error with connection to ${bdName} db.`);
    }

    try {
        collection = await db.collection(collectionName);
    } catch (err) {
        return _errorWorker(client, `Error with connection to ${collectionName} collection.`);
    }

    const dbObj = {
        client: client,
        collection: collection
    };
    return dbObj;
};



const _errorWorker = async (client, errorMessage) => {
    await client.close();
    throw new Error(errorMessage);
};

module.exports = {
    getUniqueUser,
    setUniqueUser
};

// setUniqueUser("newOneTest@TTTT.sss", "password", "Kirill");