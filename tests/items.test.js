// describe("description", () => {
//     it('some description', async () => {
//     stmts...
//      })
//      expect(something).someMatchers(something);
// })

// Importing a testing helper function from supertest
const request = require('supertest');

// Importing the code that we want to test
const app = require("../src/index");

describe('GET /health', () => {
    it('should return status OK', async() => {
        const response = await request(app)
        .get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ status: "OK" });
    });
});

