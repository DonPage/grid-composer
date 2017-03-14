const express = require('express');
const bodyParser = require('body-parser');
const process = require('child_process');
const exec = process.exec;
const spawn = process.spawn;


class GridComposer {
  private router;
  constructor(config) {
    this.config = config || {};

    // set defaults.
    this.config.getsPublic = this.config.getsPublic || false;
    this.config.directory = this.config.directory || './';
    this.config.maxNodes = this.config.maxNodes || 20;
  }

  private initExpressRouter() {
    const e = express();
    e.use(bodyParser.urlencoded({extended: true}));
    e.use(bodyParser.json());
    this.router = express.Router();

    this.router.get('/', (req, res) => {

    })
  }
}

module.exports = GridComposer;
