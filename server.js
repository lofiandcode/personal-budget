const express = require('express');
const app = express();
const db = require('./db');
const utils = require('./scripts/utils');

const PORT = process.env.PORT || 3000;

app.param('envelopeId', (req, res, next, id) => {
    const envelopeIndex = utils.findIndexbyId(Number(id));
    if (envelopeIndex >= 0) {
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
    res.send(db.envelopes[req.envelopeIndex]);
})

app.post('/envelopes', (req, res, next) => {
    const newEnvelope = utils.createEnvelope(req.query);
    if (newEnvelope) {
        db.envelopes.push(newEnvelope);
        db.monthlyBudgetTotal += newEnvelope.budget;
        res.status(201).send(newEnvelope);
    } else {
        res.status(400).send("Request did not include a 'title' and 'budget' for the new Envelope.");
    };
})

app.post('/envelopes/transfer/:from/:to', (req, res, next) => {
    const fromIndex = utils.findIndexbyId(Number(req.params.from));
    const toIndex = utils.findIndexbyId(Number(req.params.to));
    const transferAmount = Number(req.query.transfer);

    if (fromIndex >= 0 && toIndex >= 0 && transferAmount) {
        db.envelopes[fromIndex].budget -= transferAmount;
        db.envelopes[toIndex].budget += transferAmount;
        res.send({ from: db.envelopes[fromIndex], to: db.envelopes[toIndex] });
    } else {
        res.status(404).send('One of the envelopes requested was not found or transfer amount absent!');
    }
})

app.put('/envelopes/:envelopeId', (req, res, next) => {
    const title = req.query.title;
    const budget = req.query.budget;
    const amount = req.query.amount;

    if(title || budget || amount) {
        res.send(utils.updateEnvelope(req.envelopeIndex, req.query));
    } else {
        res.status(400).send('Update requests must contain a valid title, budget, or amount')
    };
})

app.delete('/envelopes/:envelopeId', (req, res, next) => {
    db.envelopes.splice(req.envelopeIndex, 1);
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
