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

describe('POST /items - validation', () => {
    it('should return 400 if "name" is missing', async () => {
      const badItem = {
        price: 10,
        quantityInStock: 5,
        category: 'Tech'
      };
  
      const res = await request(app)
        .post('/items')
        .send(badItem)
        .expect(400);
  
      expect(res.body).toHaveProperty('error');
      expect(typeof res.body.error).toBe('string');
    });
  });

describe('GET /items', () => {
    it('should return an array of items', async () => {
      // Arrange: Add a test item first
      const testItem = {
        name: 'Test Keyboard',
        price: 59.99,
        quantityInStock: 10,
        category: 'Accessories'
      };
  
      await request(app).post('/items').send(testItem).expect(201);
  
      // Act: Make GET request
      const res = await request(app).get('/items').expect(200);
  
      // Assert
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('price');
    });
});