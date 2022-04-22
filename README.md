# Personal Budget
### JavaScript Portfolio Project for Codecademy

Full CRUD back-end for a envelope style personal budget.

## Table of Contents
- [General Info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Status](#status)

## Genaral Info
This project is a portfolio project that I built for the Codecademy Back-End Engineer Career Path. 

The server I build for this project provides that following endpoints:
- GET '/envelopes' 
    - The response contains all envelopes in the database.
- GET '/envelopes/:envelopeId'
    - The response contains the envelope with the given id if it exists.
    - A status 404 response is sent if an envelope with the given envelopeId cannot be found in the database.
- POST '/envelopes'
    - Creates a new envelope as long as the request query includes a 'title' and 'budget'.
    - The response contains the newly create envelope after it is added to the database.
    - A status 400 response is sent if the POST request does not contain valid key-value pairs for 'title' and 'budget' in the query.
- POST '/envelopes/transfer/:from/:to'
    - Transfers money from one envelope into another
    - The response contains an object with the updated 'from' and 'to' envelopes.
    - A status 404 response is sent if the POST request does not contain valid key-value pairs for ':from', ':to', and 'transfer'. ('transfer' is the query key for the amount of money to be transfered).
    - ':from' -> the id of the envelope from which money will be transfered.
    - ':to' -> the id of the envelope to which money will be transfered.
- PUT '/envelopes/:envelopeId'
    - Updates the envelope with the given id in one of two ways, but not both:
        1. Update the 'title' and/or the 'budget' of the envelope.
        2. Update the 'budget' remaining by subtracting the amount that given in the query.
    - The response contains the updated envelope.
    - A status 404 response is sent if an envelope with the given envelopeId cannot be found in the database.
    - A status 400 response is sent there is not at least one valid 'title', 'budget' or 'amount key-value pair in the query.
- DELETE '/envelopes/:envelopeId'
    - Removes the envelope with the given envelopeId from the database.
    - A status 404 response is sent if an envelope with the given envelopeId cannot be found in the database.

Eventually I plan to add a simple front-end to this project to make it easier to test the functionality, but I will leave that for another day.

## Technologies
Project is created with:
- JavaScript: ECMAScript 2020
- Express.js: v14.17.3
- Node.js: v14.17.3

## Set Up
First, install Node.js if you don't already have it installed on your machine

To run this project, follow these steps:
- In the terminal, navigate into the directory in which you would like to clone the project
- Clone my repository into that directory by typing:
```
git clone https://github.com/lofiandcode/personal-budget.git
```
- Change into the personal-budget directory
- Finally, while in the personal-budget directory, type in the terminal
```
node server.js
``` 
- Now hit enter.
At this point you should you should see 'Server is listening on port 3000' printed out on the console. 

You can then use the Postman software to send HTTP requests to the server.

## Status
Project Status: Complete
