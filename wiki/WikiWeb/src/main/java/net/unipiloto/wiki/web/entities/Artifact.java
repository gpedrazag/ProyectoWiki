package net.unipiloto.wiki.web.entities;

import java.util.List;

public class Artifact
{
    private int id;
    private String description;
    private List<Decision> haveDecisions;

    public Artifact(int id, String description)
    {
        this.id = id;
        this.description = description;
    }

    public List<Decision> getHaveDecisions()
    {
        return haveDecisions;
    }

    public void setHaveDecisions(List<Decision> haveDecisions)
    {
        this.haveDecisions = haveDecisions;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
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
