function generateOTP(length: number) {
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        result += randomDigit.toString();
    }

    return result;
}

export default generateOTP;