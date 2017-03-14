const express = require('express');
const bodyParser = require('body-parser');
const process = require('child_process');

const exec = process.exec;
const spawn = process.spawn;


class GridComposer {
  constructor(config) {
    this.config = config || {};

    // set defaults.
    this.config.getsPublic = this.config.getsPublic || false;
    this.config.directory = this.config.directory || './';
    this.config.maxNodes = this.config.maxNodes || 20;

    // command shortcuts.
    this.compose = 'docker-compose';

    // router init.
    this.router = undefined;
    this.initExpressRouter();
  }

  initExpressRouter() {
    const e = express();
    e.use(bodyParser.urlencoded({ extended: true }));
    e.use(bodyParser.json());
    this.router = express.Router();

    this.router.post('/start', (req, res) => {
      exec(`cd ${this.config.directory}`);
      const command = exec(`${this.compose} up -d`);
      command.stdout.on('data', (data) => {
        console.log('data:');
        console.log(data);
        res.json({ data });
      });
    });

    e.listen(8080);
  }
}

module.exports = GridComposer;
