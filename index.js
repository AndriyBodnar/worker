document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const resultElem = e.target.elements[1];
  const number = +e.target.elements[0].value;
  console.log(resultElem, number);
  if (window.Worker) {
    const worker = new Worker("./worker.js");
    worker.postMessage(number);
    worker.onmessage = (msg) => {
      console.log("Get value from worker", msg);
      resultElem.value = msg.data;
    };
  }
});
