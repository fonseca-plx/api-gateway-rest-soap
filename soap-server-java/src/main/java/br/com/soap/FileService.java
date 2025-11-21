package br.com.soap;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public class FileService {

    @WebMethod
    public String uploadFile(String filename, byte[] content) {
        System.out.println("Arquivo recebido: " + filename);
        System.out.println("Tamanho: " + content.length);
        return "file-" + System.currentTimeMillis();
    }

    @WebMethod
    public FileInfo getFileInfo(String id) {
        return new FileInfo(id, "exemplo.txt", 12345);
    }
}
