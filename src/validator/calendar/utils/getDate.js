function getDateNowGregorian() {
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const nowDay = nowDate.getDate();
  return {
    nowYear,
    nowMonth,
    nowDay,
  };
}
module.exports = getDateNowGregorian;
