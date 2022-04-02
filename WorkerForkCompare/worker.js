import { parentPort, workerData } from "worker_threads";
import { compute } from "./factorial.js";

parentPort.postMessage(compute(workerData));
