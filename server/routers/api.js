const { Router } = require('express');
const bodyParser = require('body-parser');

const { ping } = require('server/controllers/ping');
const jira = require('server/controllers/jira');

const jsonParser = bodyParser.json();

function setupApiRouter(app, server) {
    const apiRouter = Router();

    apiRouter
        .route('/ping')
        .get(ping);

    apiRouter
        .route('/jira/tasks')
        .post(jsonParser, jira.getTasks);

    apiRouter
        .route('/jira/auth')
        .post(jsonParser, jira.auth);

    server.use('/api', apiRouter);
}

module.exports = {
    setupApiRouter
};
