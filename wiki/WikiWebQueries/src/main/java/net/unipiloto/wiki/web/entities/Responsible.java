package net.unipiloto.wiki.web.entities;

import java.util.List;

public class Responsible
{
    private String id;
    private String name;
    private List<Decision> decisions;
    private String reference = "/Responsible/";

    public Responsible(String id, String name)
    {
        this.id = id;
        this.name = name;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
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

    public List<Decision> getDecisions()
    {
        return decisions;
    }

    public void setDecisions(List<Decision> decisions)
    {
        this.decisions = decisions;
    }
    
    
}
