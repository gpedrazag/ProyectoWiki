package net.unipiloto.wiki.domain.entities;

public class Assumption
{
    private String id;
    private String description;
    private String source;

    public Assumption(String id, String description, String source)
    {
        this.id = id;
        this.description = description;
        this.source = source;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
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

    public String getSource()
    {
        return source;
    }

    public void setSource(String source)
    {
        this.source = source;
    }
    
    
}
