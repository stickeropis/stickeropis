const { Router } = require('express');
const bodyParser = require('body-parser');

const { ping } = require('server/controllers/ping');
const { getJiraTasks } = require('server/controllers/jira');

const jsonParser = bodyParser.json();

function setupApiRouter(app, server) {
    const apiRouter = Router();

    apiRouter
        .route('/ping')
        .get(ping);

    apiRouter
        .route('/jira')
        .post(jsonParser, getJiraTasks);

    server.use('/api', apiRouter);
}

module.exports = {
    setupApiRouter
};
