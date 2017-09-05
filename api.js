const createHash = require('hash-generator');
const crypto = require('crypto');
const storage = require('./dataStore');

const hashLength = 5;

const encrypt = (secret, message) => {
  return crypto.createHmac('sha1', secret)
        .update(JSON.stringify(message))
        .digest('hex')
}
  const store = {};
module.exports = (app, express) => {


  app.get('/api/hash', (req, res) => {
    let hash = createHash(5);
    res.status(200).send(hash);
  });

  app.post('/api/encrypt', (req, res) => {
    let pass = req.body.passphrase;
    let newKey = encrypt(pass, req.body);
    storage.setItemSync(newKey, req.body);
    res.status(201).send(newKey); 

  });

  app.get('/:passphrase', (req, res) => {
    let hash = req.query.passphrase;
    let values = storage.values();
    let userFound = null;

    values.forEach((val) => {
      if (val.passphrase === hash) {
        userFound = true;
      }
    }) 
      if (userFound) {
        res.status(200).send(hash)
      } else {
        res.status(404).send('User does not exist')
      }
  });

  app.get('/api/decrypt', (req, res) => {
    let pass = req.query.pass;
    let key = req.query.key;
    let msg = storage.getItemSync(key)
    let now = new Date();
    let exp = new Date(msg.expiration);

    if (msg.passphrase === pass && now < exp){
        res.status(200).send(msg)
    } else {
      res.status(400).send('Resource Not Found')
    }
  });
}
