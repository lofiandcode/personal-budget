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

module.exports = { createEnvelope };