const image = new Image();
let tStart = null;
let tEnd = null;
let abortFallback = false;
let counter = 0;
let arrTimes = [];

export default function checkConnectivity({ url = 'https://www.google.com/images/phd/px.gif', timeToCount = 3, threshold = 2000, interval = 10000 } =  {}) {
  if (navigator.onLine) {
    changeConnectivity(true);
  } else {
    timeoutFallback(threshold);
  }

  window.addEventListener('online', () => changeConnectivity(true));
  window.addEventListener('offline', () => timeoutFallback(threshold));

  timeoutFallback(threshold);
  checkLatency(url, timeToCount, avg => handleResult(avg ,threshold));
  setInterval(() => {
    reset();
    timeoutFallback(threshold);
    checkLatency(url, timeToCount, avg => handleResult(avg ,threshold));
  }, interval);
}

function reset() {
  arrTimes = [];
  counter = 0;
  abortFallback = false;
}

function handleResult(avg, threshold) {
  const isConnnectionFast = avg <= threshold;
  changeConnectivity(isConnnectionFast);
}

function checkLatency(url, timeToCount, cb) {
  tStart = Date.now();
  if (counter < timeToCount) {
    image.src = `${url}?t=${tStart}`;
    image.onload = function pingResult() {
      abortFallback = true;
      tEnd = Date.now();
      const time = tEnd - tStart;
      arrTimes.push(time);
      counter++;
      checkLatency(url, timeToCount, cb);
    }
  } else {
    const sum = arrTimes.reduce((a, b) => a + b);
    const avg = sum / arrTimes.length;
    cb(avg);
  }
}

function changeConnectivity(state) {
  const event = new CustomEvent('connection-changed', {
    detail: state
  });
  document.dispatchEvent(event);
}

function timeoutFallback(threshold) {
  setTimeout(() => {
    if (!abortFallback) {
      console.log('Connectivity is too slow, falling back to offline mode :(');
      changeConnectivity(false);
    }
  }, threshold +1);
}
