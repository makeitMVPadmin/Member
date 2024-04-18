export function debounce(func, delay = 500) {
    let timer;
    return function (func, delay) {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    }
}