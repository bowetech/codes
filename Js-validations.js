function validateUsername(username) {
    if (username.match(/^[A-Za-z0-9 -_'&:.,@+()]{2,50}$/)) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    if (email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)) {
        return true;
    } else {
        return false;
    }
}

function validatePhone(phone) {
    if (phone.match(/^[0-9 -]{7,15}$/g)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password, confirm) {
    if (password.length >= 8 && password == confirm) {
        return true;
    } else {
        return false;
    }
}

function validateEmpty(input, length) {
    if (!input) {
        return false;
    }
    if (length) {
        if (input.length >= length) {
            return true;
        } else {
            return false;
        }
    } else {
        if (input.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}

