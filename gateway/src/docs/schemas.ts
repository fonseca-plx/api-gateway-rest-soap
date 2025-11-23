export const schemas = {
  Account: {
    type: "object",
    properties: {
      id: { type: "string", example: "123456" },
      nome: { type: "string", example: "Pedro da Silva" },
      cpf: { type: "string", example: "12345678900" },
      saldo: { type: "number", example: 0 }
    }
  },

  CreateAccountRequest: {
    type: "object",
    required: ["nome", "cpf"],
    properties: {
      nome: { type: "string", example: "João" },
      cpf: { type: "string", example: "98765432100" }
    }
  },

  DepositRequest: {
    type: "object",
    required: ["amount"],
    properties: {
      amount: { type: "number", example: 150 }
    }
  },

  UploadFileRequest: {
    type: "object",
    required: ["filename", "contentBase64"],
    properties: {
      filename: { type: "string", example: "foto.png" },
      contentBase64: { type: "string", example: "SGVsbG8gV29ybGQh" }
    }
  },

  FileInfo: {
    type: "object",
    properties: {
      id: { type: "string", example: "file-1234" },
      name: { type: "string", example: "foto.png" },
      size: { type: "number", example: 2048 }
    }
  }
};
