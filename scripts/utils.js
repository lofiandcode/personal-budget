const db = require('../db');

const createEnvelope = (queryArgs) => {
    if(queryArgs.hasOwnProperty('title') && queryArgs.hasOwnProperty('budget')) {
        const newEnvelope = {
            id: db.nextId,
            title: queryArgs.title,
            budget: Number(queryArgs.budget)
        }
        db.nextId += 1;
        return newEnvelope;
    } else {
        return false;
    }
};

const updateEnvelope = (index, queryArgs) => {
    if(queryArgs.amount) {
        db.envelopes[index].budget -= queryArgs.amount;
    } else {
        Object.assign(db.envelopes[index], queryArgs);
    }
    return db.envelopes[index];
};

const findIndexbyId = (id) => {
    const envelopeIndex = db.envelopes.findIndex(envelope => envelope.id === id);
    if (envelopeIndex !== -1) {
        return envelopeIndex;
    } else {
        return -1;
    }
}

module.exports = { createEnvelope, updateEnvelope, findIndexbyId };