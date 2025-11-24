package br.com.soap;

import java.util.HashMap;
import java.util.Map;

public class FileRepository {
    private static final Map<String, StoredFile> files = new HashMap<>();

    public static String store(String filename, byte[] content) {
        String id = "file-" + System.currentTimeMillis();
        StoredFile file = new StoredFile(id, filename, content);
        files.put(id, file);
        return id;
    }

    public static StoredFile get(String id) {
        return files.get(id);
    }

    public static boolean exists(String id) {
        return files.containsKey(id);
    }

    public static class StoredFile {
        private final String id;
        private final String filename;
        private final byte[] content;
        private final long uploadedAt;

        public StoredFile(String id, String filename, byte[] content) {
            this.id = id;
            this.filename = filename;
            this.content = content;
            this.uploadedAt = System.currentTimeMillis();
        }

        public String getId() {
            return id;
        }

        public String getFilename() {
            return filename;
        }

        public byte[] getContent() {
            return content;
        }

        public int getSize() {
            return content.length;
        }

        public long getUploadedAt() {
            return uploadedAt;
        }
    }
}