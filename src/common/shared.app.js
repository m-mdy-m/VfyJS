class SharedApp {
  constructor() {
    /** @private */
    this.appInstance = null;
  }
  setApp(app) {
    this.appInstance = app;
  }
  getApp() {
    return this.appInstance;
  }
}
const shared = new SharedApp();
module.exports = {
  setApp: shared.setApp.bind(shared),
  getApp: shared.getApp.bind(shared),
};
