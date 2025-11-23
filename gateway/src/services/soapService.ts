import * as soap from "soap";
import { promisify } from "util";

const WSDL_URL = process.env.SOAP_WSDL || "http://localhost:8081/FileService?wsdl";

/**
 * Cria cliente SOAP (cache simples)
 */
let cachedClient: any = null;
async function getClient() {
  if (cachedClient) return cachedClient;
  
  const createClientAsync = promisify(soap.createClient);
  cachedClient = await createClientAsync(WSDL_URL);
  
  console.log("SOAP Client conectado com sucesso");
  
  return cachedClient;
}

export default {
  /**
   * Faz upload de arquivo via SOAP
   * @param filename Nome do arquivo
   * @param contentBase64 Conteúdo em base64
   * @returns ID do arquivo criado
   */
  async uploadFile(filename: string, contentBase64: string) {
    const client = await getClient();
    
    try {
      const uploadFileAsync = promisify(client.uploadFile);
      
      const params = {
        arg0: filename,
        arg1: contentBase64
      };
      
      const result = await uploadFileAsync(params);
      
      console.log("Upload SOAP bem-sucedido. FileID:", result?.return);
      
      return result?.return ?? result;
    } catch (err: any) {
      console.error("Erro no uploadFile SOAP:", err.message);
      throw new Error(`Falha no upload SOAP: ${err.message}`);
    }
  },

  /**
   * Busca informações de um arquivo via SOAP
   * @param id ID do arquivo
   * @returns Informações do arquivo
   */
  async getFileInfo(id: string) {
    const client = await getClient();
    
    try {
      const getFileInfoAsync = promisify(client.getFileInfo);
      
      const result = await getFileInfoAsync({ arg0: id });
      
      console.log("GetFileInfo SOAP bem-sucedido para ID:", id);
      
      return result?.return ?? result;
    } catch (err: any) {
      console.error("Erro no getFileInfo SOAP:", err.message);
      throw new Error(`Falha ao buscar arquivo SOAP: ${err.message}`);
    }
  }
};
