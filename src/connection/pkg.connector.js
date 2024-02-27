const { getApp, setApp } = require("../common/shared.app");
class Connector {
  constructor(app) {
    /** @private */
    this.app = app;
    setApp(this.app);
  }
}
module.exports = Connector;
