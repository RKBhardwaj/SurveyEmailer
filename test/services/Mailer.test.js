const assert = require('chai').assert;
const surveyTemplate = require('../../services/emailTemplates/surveyTemplate');
const Mailer = require('../../services/Mailer');

describe('Mailer', () => {
    let mailer, recipients, survey;
    let req = {
        user: {
            id: '342343423dfasd',
            credits: 1
        }
    };
    beforeEach(() => {
        recipients = 'abc@test.com';
        survey = {
            title: 'Test Title',
            subject: 'Test Subject',
            body: 'Test Body',
            recipients: recipients.split(',').map((email) => ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()
        };
    });

    it('Should create an mailer object', () => {
        mailer = new Mailer(survey, surveyTemplate(survey));
        assert.isObject(mailer);
    });

    it('Mailer body type should be equal to text/html', () => {
        assert.equal(mailer.body.type, 'text/html');
    });

    it('Mailer from email address should equal to no-reply@emaily.com', () => {
        const result = mailer.from_email;
        assert.equal(result.email, 'no-reply@emaily.com');
    });

    it('Mailer recipients type should be array', () => {
        assert.isArray(mailer.recipients);
    });

    it('Mailer recipients array length should not be equal to zero', () => {
        assert.notEqual(mailer.recipients.length, 0);
    });

    it('Mailer subject title should be same', () => {
        assert.equal(mailer.subject, survey.subject);
    });
});