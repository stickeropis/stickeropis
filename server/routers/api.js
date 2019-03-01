const { Router } = require('express');

const { ping } = require('server/controllers/ping');

function setupApiRouter(app, server) {
    const apiRouter = Router();

    apiRouter
        .route('/ping')
        .get(ping);

    server.use('/api', apiRouter);
}

module.exports = {
    setupApiRouter
};
