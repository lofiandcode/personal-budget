const envelopes = [
    {
        id: 1,
        title: 'Budget Total',
        budget: 1800
    },
    { 
        id: 2,
        title: 'Rent',
        budget: 1500
    },
    {
        id: 3,
        title: 'Utilities',
        budget: 300
    }
];

let nextId = 4;

module.exports = { envelopes, nextId };