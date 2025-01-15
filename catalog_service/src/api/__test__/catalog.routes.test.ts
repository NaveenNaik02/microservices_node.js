import express from "express";
import request from "supertest";
import { faker } from "@faker-js/faker";
import catalogRoutes from "../catalog.routes";
import { ProductFactory } from "../../utils/fixtures";
import { catalogService } from "../../requestHandler";

const app = express();
app.use(express.json());
app.use(catalogRoutes);

const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 10, max: 100 }),
    price: +faker.commerce.price(),
  };
};

describe("Catalog Routes", () => {
  describe("POST /products", () => {
    it("should create product successfully", async () => {
      const requestBody = mockRequest();
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementation(() => Promise.resolve(product));
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });

    it("should response with validation error 400", async () => {
      const requestBody = mockRequest();
      const response = await request(app)
        .post("/products")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    it("should response with an internal error code 500", async () => {
      const requestBody = mockRequest();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementation(() =>
          Promise.reject(new Error("unable to create product"))
        );
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  });

  describe("PATCH /products/:id", () => {
    it("should update product successfully", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        price: product.price,
        stock: product.stock,
      };

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementation(() => Promise.resolve(product));
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });

    it("should response with validation error 400", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        price: -1,
        stock: product.stock,
      };

      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send({ ...requestBody })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("price must not be less than 1");
    });

    it("should response with an internal error code 500", async () => {
      const product = ProductFactory.build();
      const requestBody = mockRequest();

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementation(() =>
          Promise.reject(new Error("unable to update product"))
        );
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to update product");
    });
  });

  describe("GET /products/:id", () => {
    it("should return a product by id", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementation(() => Promise.resolve(product));
      const response = await request(app)
        .get(`/products/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });
  });

  describe("GET /products?limit=0&offset=0", () => {
    it("should return a range of products based on limit and offset", async () => {
      const randomLimit = faker.number.int({ min: 10, max: 50 });
      const products = ProductFactory.buildList(randomLimit);
      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementation(() => Promise.resolve(products));
      const response = await request(app)
        .get(`/products?limit=${randomLimit}&offset=0`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(products);
    });
  });

  describe("DELETE /products/:id", () => {
    it("should delete a product by id", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .delete(`/products/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });
  });
});
