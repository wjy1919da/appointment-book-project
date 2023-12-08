export function isValidEmail(input) {
    // 简单的正则表达式，用于验证电子邮件
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(input);
};

export function isValidDate(input) {
    // your desired pattern
    const pattern = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)(\d{2})/;
    const match = input.match(pattern);
    if (!match) return false;
    const date = new Date(input);
    // Now let's ensure that the date is not out of index

    if (date.getMonth()+1 === parseInt(match[1], 10) && date.getDate() === parseInt(match[2], 10)) {
        return true;
    }
    return false;
}

export function isValidPassword(input) {
    const pattern = /^(?=.*\d)(?=.*[A-Za-z]|[!@#¥%^&*()_+=-~`])[A-Za-z\d!@#¥%^&*()_+=-~`]{6,18}$/;
    return input.match(pattern);
}

export function isValidPhoneNumber(input) {
    const pattern = /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-?[0-9]{4}$/;
    return input.match(pattern);
}
