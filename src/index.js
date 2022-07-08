const express = require("express");
const app = express();
const ics = require("ics");
const fs = require("fs");
const dayjs = require("dayjs");

app.route("/").get(async (req, res) => {
  const date = new dayjs();
  const startDate = date.unix() * 1000;
  const endDate = date.add(7, "d").unix() * 1000;
  const processDate = (d) => {
    const res = dayjs(d)
      .format("YYYY-M-D-H-m")
      .split("-")
      .map((i) => parseInt(i));
    console.log(res);
    return res;
  };

  const location = "somewhere";
  const start = processDate(startDate);
  const end = processDate(endDate);

  ics.createEvent(
    {
      title: "Dinner",
      description: "Nightly thing I do",
      location,
      start,
      end,
    },
    (err, event) => {
      if (err) {
        console.log(err);
      } else {
        fs.writeFileSync(`${__dirname}/event.ics`, event);
        res.download(`${__dirname}/event.ics`);
        setTimeout(() => {
          fs.unlinkSync(`${__dirname}/event.ics`);
        }, 5000);
      }
    }
  );
});

app.listen(4040);
