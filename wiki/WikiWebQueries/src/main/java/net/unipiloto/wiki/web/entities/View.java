package net.unipiloto.wiki.web.entities;

import java.util.List;

public class View {
    
    private String id;
    private String name;
    private String information;
    private List<Decision> relatedDecisions;

    public View(String id, String name, String information) {
        this.id = id;
        this.name = name;
        this.information = information;
    }    
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public List<Decision> getRelatedDecisions() {
        return relatedDecisions;
    }

    public void setRelatedDecisions(List<Decision> relatedDecisions) {
        this.relatedDecisions = relatedDecisions;
    }
    
    
}
