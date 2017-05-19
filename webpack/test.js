let fs = require("fs");
let i = 0;
fs.watch("./autoBuild.json", {
  encoding: 'utf-8'
}, (eventType, filename) => {
  fs.readFile("./autoBuild.json", "utf-8", (err, data) => {
    if (err) return;
    try {
      console.log(++i, JSON.parse(data));
    } catch (error) {
      console.log(i)
    }
  })
})