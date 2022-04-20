const express = require('express');
const app = express();
const db = require('./db');
const utils = require('./scripts/utils');

const PORT = process.env.PORT || 3000;

app.get('/envelopes', (req, res, next) => {
    res.send(db.envelopes);
})

app.post('/envelopes', (req, res, next) => {
    const newEnvelope = utils.creatEnvelope(req.query);
    if (newEnvelope) {
        db.envelopes.push(newEnvelope);
        res.status(201).send(newEnvelope);
    } else {
        res.status(400).send("Request did not include a 'title' and 'budget' for the new Envelope.");
    };
})



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
