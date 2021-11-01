const cron = require("node-cron");
const { remove10PlusEven } = require("./remove10PlusEven");

cron.schedule("*/10 * * * * *", () => {
  const time = new Date().toLocaleString();

  remove10PlusEven()
    .then(() => {
      console.log("executed remove10PlusEven successfully at", time);
    })
    .catch(() => {
      console.log("remove10PlusEven failed to execute at", time);
    });
});
