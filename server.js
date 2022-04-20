const { response } = require('express');
const express = require('express');
const app = express();
const db = require('./db');
const utils = require('./scripts/utils');

const PORT = process.env.PORT || 3000;

app.param('envelopeId', (req, res, next, id) => {
    const targetId = Number(id);
    const envelopeIndex = db.envelopes.findIndex(envelope => envelope.id === targetId);
    console.log('Index is = ', envelopeIndex);
    if (envelopeIndex !== -1) {
        console.log('in param if')
        req.envelopeIndex = envelopeIndex;
        next();
    } else {
        res.status(404).send('Envelope requested was not found!');
    }
})

app.get('/envelopes', (req, res, next) => {
    res.send(db.envelopes);
})

app.get('/envelopes/:envelopeId', (req, res, next) => {
    console.log("about to respond with found envelope")
    console.log('req.envelopeIndex = ', req.envelopeIndex)
    res.send(db.envelopes[req.envelopeIndex]);
})

app.post('/envelopes', (req, res, next) => {
    const newEnvelope = utils.createEnvelope(req.query);
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
