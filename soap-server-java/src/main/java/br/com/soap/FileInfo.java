package br.com.soap;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class FileInfo {

    private String id;
    private String name;
    private long size;

    public FileInfo() {}

    public FileInfo(String id, String name, long size) {
        this.id = id;
        this.name = name;
        this.size = size;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public long getSize() { return size; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setSize(long size) { this.size = size; }
}