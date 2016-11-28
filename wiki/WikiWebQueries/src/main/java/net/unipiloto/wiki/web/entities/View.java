package net.unipiloto.wiki.web.entities;

import java.util.List;

public class View {
    
    private String id;
    private String name;
    private String type;
    private String content;
    private String reference = "/Views/";
    private List<Decision> relatedDecisions;

    public View(String id, String name, String information, String type) {
        this.id = id;
        this.name = name;
        this.content = information;
        this.type = type;
    }    
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Decision> getRelatedDecisions() {
        return relatedDecisions;
    }

    public void setRelatedDecisions(List<Decision> relatedDecisions) {
        this.relatedDecisions = relatedDecisions;
    }
    
    
}
