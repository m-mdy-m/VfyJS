let appInstance = null;

function setApp(app) {
  appInstance = app;
}

function getApp() {
  return appInstance;
}

module.exports = {
  setApp,
  getApp,
};
