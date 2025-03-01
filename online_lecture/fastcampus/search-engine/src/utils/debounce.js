let debounceTimer;

const debounce = (callback, time, e) => {
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
    setTimeout(() => {
        callback(e);
    }, time);
};

export default debounce;
