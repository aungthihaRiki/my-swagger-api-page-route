import { OpenAPIV3 } from 'openapi-types';

export const swaggerPaths: OpenAPIV3.PathsObject = {
  "/api/contact": {
    get: {
      summary: "Get all contacts",
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
        404: { description: "Contact not found" },
      },
    },
    post: {
      summary: "Create a new contact",
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
