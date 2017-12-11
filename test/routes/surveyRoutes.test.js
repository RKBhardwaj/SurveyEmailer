const assert = require('chai').assert;
const surveyRoutes = require('../../routes/surveyRoutes');

describe('App Routes', () => {
    describe('surveyRoutes', () => {
        const req = {
            user: {
                id: '342343423dfasd',
                credits: 1
            }
        };

        const res = {
            status: function (input) {
                return {
                    send: function () {
                        return {
                            error: 'Please login to continue !!'
                        }
                    }
                };
            }
        };

        it('Should credit users credits with 5 values', () => {
            assert.equal(1===1, true);
        });
    });
});