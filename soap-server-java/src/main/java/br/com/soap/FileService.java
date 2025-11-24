package br.com.soap;

import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

@WebService
public class FileService {

    @WebMethod
    public String uploadFile(String filename, byte[] content) {
        try {
            if (filename == null || filename.trim().isEmpty()) {
                throw new IllegalArgumentException("Nome do arquivo não pode ser vazio");
            }
            
            if (content == null || content.length == 0) {
                throw new IllegalArgumentException("Conteúdo do arquivo não pode ser vazio");
            }

            String fileId = FileRepository.store(filename, content);
            
            System.out.println("✅ Arquivo recebido: " + filename);
            System.out.println("   ID: " + fileId);
            System.out.println("   Tamanho: " + content.length + " bytes");
            
            return fileId;
        } catch (Exception e) {
            System.err.println("❌ Erro ao fazer upload: " + e.getMessage());
            throw new RuntimeException("Erro ao fazer upload do arquivo: " + e.getMessage());
        }
    }

    @WebMethod
    public FileInfo getFileInfo(String id) {
        try {
            if (id == null || id.trim().isEmpty()) {
                throw new IllegalArgumentException("ID do arquivo não pode ser vazio");
            }

            FileRepository.StoredFile file = FileRepository.get(id);
            
            if (file == null) {
                System.out.println("⚠️  Arquivo não encontrado: " + id);
                return new FileInfo(id, null, 0, 0, false);
            }

            System.out.println("✅ Informações do arquivo recuperadas: " + id);
            
            return new FileInfo(
                file.getId(),
                file.getFilename(),
                file.getSize(),
                file.getUploadedAt(),
                true
            );
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar arquivo: " + e.getMessage());
            throw new RuntimeException("Erro ao buscar informações do arquivo: " + e.getMessage());
        }
    }
}