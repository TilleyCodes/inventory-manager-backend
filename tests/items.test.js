// describe("description", () => {
//     it('some description', async () => {
//     stmts...
//      })
//      expect(something).someMatchers(something);
// })

// Importing a testing helper function from supertest
const request = require('supertest');
const mongoose = require('mongoose');
const connectDB = require("../src/utils/database");

// Importing the code that we want to test
const app = require("../src/index");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /health', () => {
    it('should return status OK', async() => {
        const response = await request(app)
        .get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ status: "OK" });
    });
});

describe('POST /items', () => {
    test('should create a new item and return it', async () => {
        const newItem = {
            name: "Test Monitor",
            price: 29.99,
            quantityInStock: 25,
            category: "Accessories"
        };

        const response = await request(app)
        .post('/items')
        .send(newItem)
        .expect(201);

        expect(response.body).toMatchObject({
            name: newItem.name,
            price: newItem.price,
            quantityInStock: newItem.quantityInStock,
            category: newItem.category
        });
    });
});