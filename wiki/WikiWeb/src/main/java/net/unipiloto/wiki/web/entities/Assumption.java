package net.unipiloto.wiki.web.entities;

public class Assumption
{
    private int id;
    private String description;
    private String source;

    public Assumption(int id, String description, String source)
    {
        this.id = id;
        this.description = description;
        this.source = source;
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

    public String getSource()
    {
        return source;
    }

    public void setSource(String source)
    {
        this.source = source;
    }
    
    
}
