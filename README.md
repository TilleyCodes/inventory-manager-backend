# inventory-manager-backend
Creating a simple Inventory Manager API, primarily focusing on testing

Endpoints:

GET /items
POST /items - Create a new stock, requires name, price
PATH /items/:id - Update stock
DELETE /items/:id 

GET /health

## DRY Test Design: Generalised vs Hardcoded

expect(response.body.username).toBe("Adam");

expect(response.body.username).toBe(newUser.username);
