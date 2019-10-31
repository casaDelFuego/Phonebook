export function getFirstNameValidationError(firstName){
    if(!firstName){
        return 'Name cannot be empty';
    } else {
        return '';
    }
}

export function getLastNameValidationError(lastName){
    if(!lastName){
        return 'Last name cannot be empty';
    } else {
        return '';
    }
}

export function getPhoneNumberValidationError(phoneNumber) {
    if(!phoneNumber.match(/^\+?\(?\d{2,4}\)?\-?\d{6,9}$/) || !phoneNumber){
        return 'Please put in a proper phone number, 10 digits';
    } else {
        return '';
    }
}

export function getAddressValidationError(address){
    if(!address){
        return 'Address cannot be empty';
    } else {
        return '';
    }
}

export function getEmailValidationError(email) {
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !email){
        return 'Please put in a proper email';
    } else {
        return '';
    }
}