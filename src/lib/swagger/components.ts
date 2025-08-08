import { OpenAPIV3 } from 'openapi-types';

export const swaggerComponents: OpenAPIV3.ComponentsObject = {
  schemas: {
    Contact: {
      type: "object",
      properties: {
        id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
      },
      required: ["id", "firstName", "lastName", "phone", "email"],
    },
    ContactInput: {
      type: "object",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
      },
      required: ["firstName", "lastName", "phone", "email"],
    },
  },
};
