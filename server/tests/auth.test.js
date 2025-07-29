const request = require('supertest');
const app = require('../index'); // ensure index exports app

describe('Auth Endpoints', () => {
    it('should signup a new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({ mobile: '9999999999', password: 'pass1234', role: 'worker', securityQuestions: [{ questionId: 1, answer: 'a' }, { questionId: 2, answer: 'b' }] });
        expect([200, 201]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('message');
    });
});