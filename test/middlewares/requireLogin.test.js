const assert = require('chai').assert;
const requireLogin = require('../../middlewares/requireLogin');
const requireCredits = require('../../middlewares/requireCredits');

describe('middlewares', () => {
    const next = function () {
        return 5;
    };

    const req = {
        user: {
            id: '342343423dfasd',
            credits: 1
        }
    };

    describe('requireLogin', () => {
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

        it('User should be to logged in', () => {
            const result = requireLogin(req, res, next);
            assert.equal(result, undefined);
        });

        it('User should not be logged in', () => {
            const result = requireLogin({}, res, next);
            assert.equal(result.error, 'Please login to continue !!');
        });
    });
});
