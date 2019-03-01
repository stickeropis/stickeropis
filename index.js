const next = require('next');

const { setupServer } = require('./server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app
    .prepare()
    .then(() => setupServer(app));
