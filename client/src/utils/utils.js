import _ from 'lodash';

let Utilities = {};

Utilities.getEmailsString = (emailsArray) => {
    let str = '';
    _.forEach(emailsArray, (emailObject) => {
        str += str !== '' ? ', ' + emailObject.email : emailObject.email
    });
    return str;
};

Utilities.formatFormValues = (formValue) => {
    if (formValue) {
        return typeof formValue === 'object' ? Utilities.getEmailsString(formValue) : formValue;
    } else {
        return '';
    }
};

export default Utilities;