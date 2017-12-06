const SendGrid = require('sendgrid');
const helper = SendGrid.mail;
const Keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({subject, recipients}, content) {
        super();

        this.sgApi = SendGrid(Keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@email.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({email}) => {
           return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
        return new Promise((resolve) => {
           resolve(
               this.sgApi.API(request).then((response) => {
                   return response;
               })
           )
        });
    }
}

module.exports = Mailer;