const express = require('express');
const bodyParser = require('body-parser');
const userConfig = require('./config.json') || {};


class GridComposer {
  constructor(config) {
    const process = require('child_process');
    this.exec = process.exec;
    this.config = config || {};

    // set defaults.
    this.config.maxNodes = this.config.maxNodes || 20;
    this.config.port = this.config.port || 8080;
    this.config.token = this.config.token || false;

    // command shortcuts.
    this.baseCmd = 'docker-compose';

    // router init.
    this.router = undefined;
    this.initExpressRouter();
  }

  initExpressRouter() {
    const e = express();
    e.use(bodyParser.urlencoded({ extended: true }));
    e.use(bodyParser.json());
    this.router = express.Router();

    this.router.get('/status', (req, res) => {
      const command = this.exec(`${this.baseCmd} ps`);
      command.stdout.on('data', (data) => {
        res.end(data);
      });
    });

    e.use('/grid', this.router);

    if (process.env.NODE_ENV === 'dev') {
      return undefined;
    }

    return e.listen(this.config.port);
  }
}

module.exports = GridComposer;

if (process.env.NODE_ENV !== 'dev') {
  const init = () => new GridComposer(userConfig);
  init();
}
