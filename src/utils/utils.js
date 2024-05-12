function debounce(func, delay = 500) {
    let timer;
    return function (func, delay) {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    }
}

const convertDaysToMilliseconds = (days) => {
    return days * 24 * 60 * 60 * 1000;
}

const getRandomDate = () => {
    return new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 365));
}

export { debounce, convertDaysToMilliseconds, getRandomDate };