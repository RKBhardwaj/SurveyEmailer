/**
 * @description surveyRoutes will contains all the routes and its handler
 */

const _ = require('lodash');
const Path = require('path-parser');
const URL = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    /**
     * @description api to get list of all the surveys for the current user
     */
    app.get('/api/surveys', requireLogin, (req, res) => {
        Survey.find({_user: req.user.id})
            .select({recipients: false})
            .then((surveys) => {
                res.send(surveys);
            });
    });

    /**
     * @description api to delete survey
     */
    app.post('/api/deleteSurvey', requireLogin, (req, res) => {
        const surveyId = req.body.surveyId;
        if (surveyId) {
            Survey.deleteOne({_id: surveyId}).then((response) => {
                Survey.find({_user: req.user.id})
                    .select({recipients: false})
                    .then((surveys) => {
                        res.send(surveys);
                    });
            });
        } else {
            Survey.find({_user: req.user.id})
                .select({recipients: false})
                .then((surveys) => {
                    res.send(surveys);
                });
        }
    });

    /**
     * @description api to show the thanks message when user click yes or no in the mail
     */
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting !!!');
    });

    /**
     * @description api to get the data from the webhook (sendgrid) and update the Survey with the response
     */
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        try {
            _.chain(req.body)
                .map(({email, url}) => {
                    const pathName = URL.parse(url).pathname;
                    const match = p.test(pathName);
                    if (match) {
                        return {email, surveyId: match.surveyId, choice: match.choice};
                    }
                })
                .compact() //removing undefined elements from an array
                .uniqBy('email', 'surveyId') //removing the duplicate values from array
                .each(({surveyId, email, choice}) => {
                    Survey.updateOne({
                        _id: surveyId,
                        recipients: {
                            $elemMatch: {
                                email: email,
                                responded: false
                            }
                        }
                    }, {
                        $inc: {[choice]: 1},
                        $set: {'recipients.$.responded': true},
                        lastResponded: new Date()
                    }).exec();
                })
                .value();

            res.send({});
        } catch (err) {
            res.send({});
        }
    });

    /**
     * @description api to save and send the survey to the recipients
     */
    app.post('/api/saveSurvey', requireLogin, (req, res) => {
        const {title, subject, body, recipients} = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map((email) => ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()
        });

        res.send(req.user);
    });

    /**
     * @description api to send the survey
     */
    app.post('/api/sendSurveys', requireLogin, requireCredits, (req, res) => {
        //Great place to send mails
        const survey = {};
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            mailer.send().then(() => {
                survey.save().then(() => {
                    req.user.credits -= 1;
                    req.user.save().then((user) => {
                        res.send(user);
                    });
                });
            });
        } catch (err) {
            res.status(422).send(err);
        }
    });
};