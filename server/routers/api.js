const { Router } = require('express');

const { pingController } = require('server/controllers/ping');

function setupApiRouter(app, server) {
    const apiRouter = Router();

    apiRouter
        .route('/ping')
        .get(pingController);

    server.use('/api', apiRouter);
}

module.exports = {
    setupApiRouter
};
