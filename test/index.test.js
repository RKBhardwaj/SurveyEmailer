/**
 * @description Main file testing which requires all the test files
 */

require('./services/Mailer.test');
require('./middlewares/requireCredits.test');
require('./middlewares/requireLogin.test');
require('./routes/billingRoutes.test');
require('./routes/surveyRoutes.test');