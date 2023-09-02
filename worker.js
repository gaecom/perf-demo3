self.onmessage = function(e) {
    const result = e.data[0] + e.data[1];
    self.postMessage(result);
};