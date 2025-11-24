package br.com.soap;

import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class FileInfo {
    private String id;
    private String filename;
    private int size;
    private long uploadedAt;
    private boolean exists;

    public FileInfo() {}

    public FileInfo(String id, String filename, int size, long uploadedAt, boolean exists) {
        this.id = id;
        this.filename = filename;
        this.size = size;
        this.uploadedAt = uploadedAt;
        this.exists = exists;
    }

    // Getters e Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(long uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public boolean isExists() {
        return exists;
    }

    public void setExists(boolean exists) {
        this.exists = exists;
    }

    @Override
    public String toString() {
        return "FileInfo{" +
                "id='" + id + '\'' +
                ", filename='" + filename + '\'' +
                ", size=" + size +
                ", uploadedAt=" + uploadedAt +
                ", exists=" + exists +
                '}';
    }
}