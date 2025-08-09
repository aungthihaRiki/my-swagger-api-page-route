import { OpenAPIV3 } from 'openapi-types';

export const swaggerPaths: OpenAPIV3.PathsObject = {
    "/api/auth/register": {
    post: {
      summary: "Register a new user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RegisterUserInput" },
          },
        },
      },
      responses: {
        201: { description: "User registered successfully" },
        400: { description: "Bad request" },
        409: { description: "User already exists" },
        500: { description: "Server error" },
      },
    },
  },
      "/api/auth/login": {
    post: {
      summary: "Login",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginUserInput" },
          },
        },
      },
      responses: {
        200: { description: "User login successfully" },
        400: { description: "Bad request" },
        401: { description: "Invalid credentials" },
        404: { description: "User not found" },
        500: { description: "Server error" },
      },
    },
  },
  "/api/contact": {
    get: {
      summary: "Get all contacts",
      tags: ["Contact"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of contacts",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Contact" },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
        404: { description: "Contact not found" },
      },
    },
    post: {
      summary: "Create a new contact",
      tags: ["Contact"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ContactInput" },
          },
        },
      },
      responses: {
        201: { description: "Contact created successfully" },
        400: { description: "Bad request" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/contact/{id}": {
    get: {
      summary: "Get contact by ID",
      tags: ["Contact"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Contact found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Contact" },
            },
          },
        },
        404: { description: "Not found" },
      },
    },

    delete: {
      summary: "Delete contact by ID",
      tags: ["Contact"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Contact deleted" },
        404: { description: "Not found" },
      },
    },

    put: {
      summary: "Update contact by ID",
      tags: ["Contact"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ContactInput" },
          },
        },
      },
      responses: {
        200: { description: "Contact updated" },
        404: { description: "Not found" },
      },
    },
  },

};
