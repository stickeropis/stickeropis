const router = require('express').Router();

const indexRedirect = (req, res) => res.redirect('/');

module.exports = (app, server) => {
    const handle = app.getRequestHandler();

    router
        .route('/tasks')
        .get(indexRedirect);

    router
        .route('/print')
        .get(indexRedirect);

    router
        .route('*')
        .get((req, res) => {
            return handle(req, res);
        });

    server.use('/', router);
};
