// import express from "express";
// import request from "supertest";
// import { faker } from "@faker-js/faker";
// import catalogRoutes from "../catalog.routes";
// import { ProductFactory } from "../../utils/fixtures";

// const app = express();
// app.use(express.json());
// app.use(catalogRoutes);

// const mockRequest = () => {
//   return {
//     name: faker.commerce.productName(),
//     description: faker.commerce.productDescription(),
//     stock: faker.number.int({ min: 10, max: 100 }),
//     price: +faker.commerce.price(),
//   };
// };

// describe("Catalog Routes", () => {
//   describe("POST /products", () => {
//     it("should create product successfully", async () => {
//       const requestBody = mockRequest();
//       const product = ProductFactory.build();
//     });
//   });
// });
