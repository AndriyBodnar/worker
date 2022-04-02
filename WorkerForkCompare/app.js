import { Worker } from "worker_threads";
import { fork } from "child_process";
import { performance, PerformanceObserver } from "perf_hooks";
import { readFileSync } from "fs";

const file = readFileSync("./cmd.jpg");

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});
performanceObserver.observe({ entryTypes: ["measure"] });

const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    try {
      performance.mark("worker start");
      const worker = new Worker("./worker.js", {
        workerData: {
          array,
          file,
        },
      });
      worker.on("message", (msg) => {
        performance.mark("worker end");
        performance.measure("worker", "worker start", "worker end");

        resolve(msg);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const forkFunction = (array) => {
  return new Promise((resolve, reject) => {
    try {
      performance.mark("fork start");
      const forkProcess = fork("./fork.js");
      forkProcess.send({ array, file });
      forkProcess.on("message", (msg) => {
        performance.mark("fork end");
        performance.measure("fork", "fork start", "fork end");
        resolve(msg);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const main = async () => {
  try {
    await workerFunction([25, 20, 19, 48, 30, 50]);
    await forkFunction([25, 20, 19, 48, 30, 50]);
  } catch (e) {
    console.error(e.message);
  }
};

main();
