import { CronJob } from "cron";
import { config } from "../config";
import http from "node:http";
import https from "node:https";

// Every 14 minutes send a GET requeset to the health endpoint
export const keepAliveCronJob = new CronJob("*/14 * * * *", function () {
  const baseUrl = config.BACKEND_URL;
  if (!baseUrl) return;
  const url = new URL("health", baseUrl).href;

  const client = url.startsWith("https:") ? https : http;
  client
    .get(url, (res) => {
      if (res.statusCode === 200)
        console.log("'/health' request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (err) => {
      console.error("Error sending GET request to '/health':", err);
    });
});
