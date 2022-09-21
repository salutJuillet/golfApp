export const validateEmail = email => {
    const regex = /^[0-9a-zA-Z/]([-_\.]?[0-9a-zA-z])*@[0-9a-zA-Z/]([-_\.]?[0-9a-zA-z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}

export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
}