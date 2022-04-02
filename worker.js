function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

this.addEventListener("message", (msg) => {
  console.log("Get value from main thread", msg);
  const { data } = msg;

  this.postMessage(fibonacci(data));
});
