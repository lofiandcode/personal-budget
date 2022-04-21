const db = require('../db');

/* 
    Creates a new envelope and returns it if the query arguments are valid.
    If the query arguments are not valid, false is returned.
    Parameters
        queryArgs: Object 
*/
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

/* 
    Updates the envelope whose index was passed in.
    Either the a specific amount of money is removed from the envelope, or the 'title' and/or 'budget' is updated.
    Parameters
        index: Number
        queryArgs: Object 
*/
const updateEnvelope = (index, queryArgs) => {
    if(queryArgs.amount) {
        db.envelopes[index].budget -= queryArgs.amount;
    } else {
        Object.assign(db.envelopes[index], queryArgs);
    }
    return db.envelopes[index];
};

/*
    Returns the envelope with the given id.
    Or returns -1 if the envelope is not found.
    Parameters
        id: Number 
*/
const findIndexbyId = (id) => {
    const envelopeIndex = db.envelopes.findIndex(envelope => envelope.id === id);
    if (envelopeIndex !== -1) {
        return envelopeIndex;
    } else {
        return -1;
    }
}

module.exports = { createEnvelope, updateEnvelope, findIndexbyId };