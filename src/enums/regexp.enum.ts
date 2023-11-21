const regexPatterns = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
};

export = regexPatterns;