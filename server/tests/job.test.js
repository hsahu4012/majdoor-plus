const request = require('supertest');
const app = require('../index');

// Note: you'd mock or seed a test DB for real tests.

describe('Job Endpoints', () => {
    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/jobs');
        expect(res.statusCode).toEqual(401);
    });
});