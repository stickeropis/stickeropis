const { Router } = require('express');

function indexRedirect(req, res) {
    res.redirect('/');
}

function setupAppRouter(app, server) {
    const appRouter = Router();
    const requestHandler = app.getRequestHandler();

    appRouter
        .route('/tasks')
        .get(indexRedirect);

    appRouter
        .route('/print')
        .get(indexRedirect);

    appRouter
        .route('*')
        .get(requestHandler);

    server.use('/', appRouter);
}

module.exports = {
    setupAppRouter
};
