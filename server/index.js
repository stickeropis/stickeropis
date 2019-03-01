const express = require('express');

const { setupApiRouter } = require('server/routers/api');
const { setupAppRouter } = require('server/routers/app');

function setupApp(nextApp) {
    const server = express();
    const port = Number(process.env.PORT) || 3000;

    setupApiRouter(nextApp, server);
    setupAppRouter(nextApp, server);

    server.listen(port, error => {
        if (error) {
            throw error;
        }

        console.log(`> Ready on http://localhost:${port}`);
    });
}

module.exports = setupApp;
