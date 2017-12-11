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

    describe('requireCredits', () => {
        const res = {
            status: function (input) {
                return {
                    send: function () {
                        return {
                            error: 'You didn\'t have enough credits to send survey. Add credits to your account to continue!!'
                        }
                    }
                };
            }
        };

        it('User should have enough credits', () => {
            req.user.credits = 0;
            const result = requireCredits(req, res, next);
            assert.equal(result.error, 'You didn\'t have enough credits to send survey. Add credits to your account to continue!!');
        });

        it('result should equal to undefined', () => {
            req.user.credits = 10;
            const result = requireCredits(req, res, next);
            assert.equal(result, undefined);
        });
    });
});
