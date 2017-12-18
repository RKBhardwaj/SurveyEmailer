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
            try {
                Survey.deleteOne({_id: surveyId}).then((response) => {
                    Survey.find({_user: req.user.id})
                        .select({recipients: false})
                        .then((surveys) => {
                            res.send(surveys);
                        });
                });
            } catch (err) {
                res.send([]);
            }
        } else {
            res.send([]);
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
     * @description api to save the survey to the recipients
     */
    app.post('/api/saveSurvey', requireLogin, (req, res) => {
        const {title, subject, body, recipients} = req.body;

        try {
            const survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients.split(',').map((email) => ({email: email.trim()})),
                _user: req.user.id
            });

            survey.save().then((resp) => {
                res.send(req.user);
            });
        } catch (err) {
            res.send(req.user);
        }
    });

    /**
     * @description api to update the survey to the recipients
     */
    app.post('/api/updateSurvey', requireLogin, (req, res) => {
        const {title, subject, body, recipients, surveyId} = req.body;

        try {

            Survey.findOne({_id: surveyId}).then((survey) => {
                survey.title = title;
                survey.subject = subject;
                survey.body = body;
                survey.recipients = recipients.split(',').map((email) => ({email: email.trim()}));

                survey.save().then((resp) => {
                    res.send(req.user);
                });
            });
        } catch (err) {
            res.send(req.user);
        }
    });

    /**
     * @description api to get details fo the survey
     */
    app.post('/api/getSurveyDetails', requireLogin, (req, res) => {
        const surveyId = req.body.surveyId;
        try {
            Survey.findOne({_id: surveyId}).then((survey) => {
                res.send(survey);
            });
        } catch (err) {
            res.send([]);
        }
    });

    /**
     * @description api to send the survey
     */
    app.post('/api/sendSurveys', requireLogin, requireCredits, (req, res) => {
        //Great place to send mails
        const surveyId = req.body.surveyId;
        try {
            Survey.findOne({_id: surveyId}).then((survey) => {
                const mailer = new Mailer(survey, surveyTemplate(survey));
                mailer.send().then(() => {
                    survey.dateSent = Date.now();
                    survey.save().then(() => {
                        req.user.credits -= 1;
                        req.user.save().then((user) => {
                            res.send(user);
                        });
                    });
                });
            });
        } catch (err) {
            res.status(422).send(err);
        }
    });
};