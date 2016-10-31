package net.unipiloto.wiki.web.others;

import java.util.List;

public class ImageRegister {
    
    private String type;
    private String content;
    private String name;
    private List<String> references;

    public ImageRegister(String type, String content, String name, List<String> references) {
        this.type = type;
        this.content = content;
        this.name = name;
        this.references = references;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public List<String> getReferences() {
        return references;
    }

    public void setReferences(List<String> references) {
        this.references = references;
    }    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }    
    
}
