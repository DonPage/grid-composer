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

    this.router.get('/status', async (req, res) => {
      const token = await this.getTokenFromReq(req);
      const confirmed = await this.confirmToken(token);
      if (!confirmed) return this.handleRejectedToken(res);
      const command = this.exec(`${this.baseCmd} ps`);
      try {
        return command.stdout.on('data', (data) => {
          res.end(data);
        });
      } catch (err) {
        return res.status(500).end(err);
      }
    });

    this.router.post('/start', async (req, res) => {
      const token = await this.getTokenFromReq(req);
      const confirmed = await this.confirmToken(token);
      if (!confirmed) return this.handleRejectedToken(res);
      const command = this.exec(`${this.baseCmd} start -d`);
      return command.stdout.on('data', (data) => {
        res.end(data);
      });
    });

    this.router.post('/stop', async (req, res) => {
      const token = await this.getTokenFromReq(req);
      const confirmed = await this.confirmToken(token);
      if (!confirmed) return this.handleRejectedToken(res);
      const command = this.exec(`${this.baseCmd} down`);
      return command.stdout.on('data', (data) => {
        res.end(data);
      });
    });

    e.use('/grid', this.router);

    if (process.env.NODE_ENV === 'dev') {
      return undefined;
    }

    return e.listen(this.config.port);
  }

  handleRejectedToken(res) {
    return res.status(401).send('Token rejected');
  }

  async getTokenFromReq(req) {
    try {
      return req.query.token;
    } catch (err) {
      return false;
    }
  }

  async confirmToken(reqToken) {
    // make sure user has set token in config. If not, accept all reqTokens and return true.
    if (this.config.token === false) return true;
    // check it against user config token. If they match, return true.
    else if (this.config.token === reqToken) return true;
    return false;
  }
}

module.exports = GridComposer;

if (process.env.NODE_ENV !== 'dev') {
  const init = () => new GridComposer(userConfig);
  init();
}
