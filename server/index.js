require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

massive(process.env.CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance);
        console.log('Connected to the DB')
    })
    .catch((err) => {
        console.log(err)
    })

const pc = require(__dirname + '/products_controller');

const port = process.env.PORT;

const app = express();

app.use((req, res, next) => {
    next();
})

app.use(bodyParser.json());

app.get('/api/products', pc.getAll)
app.get('/api/products/:id', pc.getOne)
app.put('/api/products/:id', pc.update)
app.post('/api/products', pc.create)
app.delete('/api/products/:id', pc.delete)

app.listen(port, () => {
    console.log(`Ship docked at port ${port}`);
});