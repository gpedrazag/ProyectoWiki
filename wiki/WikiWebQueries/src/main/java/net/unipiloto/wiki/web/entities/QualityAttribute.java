package net.unipiloto.wiki.web.entities;

import java.util.List;

public class QualityAttribute
{
    private String id;
    private String name;
    private String description;
    private List<Artifact> triggerArtifacts;
    private String reference = "/QualityAttributeStage/";

    public QualityAttribute(String id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.triggerArtifacts = triggerArtifacts;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Artifact> getTriggerArtifacts() {
        return triggerArtifacts;
    }

    public void setTriggerArtifacts(List<Artifact> triggerArtifacts) {
        this.triggerArtifacts = triggerArtifacts;
    }
    

   
     
    
}
