package net.unipiloto.wiki.web.entities;

import java.util.List;

public class SoftwareArchitecture
{
    private String id;
    private String name;
    private String description;
    private List<Artifact> relatedArtifacts;
    private List<Decision> relatedDecisions;
    
    public SoftwareArchitecture(String id, String name, String description)
    {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public List<Decision> getRelatedDecisions()
    {
        return relatedDecisions;
    }

    public void setRelatedDecisions(List<Decision> relatedDecisions)
    {
        this.relatedDecisions = relatedDecisions;
    }

    public List<Artifact> getRelatedArtifacts()
    {
        return relatedArtifacts;
    }

    public void setRelatedArtifacts(List<Artifact> relatedArtifacts)
    {
        this.relatedArtifacts = relatedArtifacts;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }
    
     
}
