const envelopes = [
    { 
        id: 1,
        title: 'Rent',
        budget: 1500
    },
    {
        id: 2,
        title: 'Utilities',
        budget: 300
    }
];

let nextId = 3;

let monthlyBudgetTotal;

module.exports = { envelopes, nextId, monthlyBudgetTotal };