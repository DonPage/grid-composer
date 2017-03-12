/**
 * Created by Don on 3/12/2017.
 */

class GridComposer {
  constructor(config) {
    this.config = config || {};

    // set defaults.
    this.config.getsPublic = this.config.getsPublic || false;
    this.config.directory = this.config.directory || './';
    this.config.maxNodes = this.config.maxNodes || 20;
  }
}

module.exports = GridComposer;
