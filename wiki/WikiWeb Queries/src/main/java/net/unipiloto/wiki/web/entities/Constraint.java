package net.unipiloto.wiki.web.entities;

public class Constraint
{
    private String id;
    private String name;
    private String description;
    private String rationale;
    private String keyword;
    
    public Constraint(String id, String name, String description, String rationale, String keyword)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rationale = rationale;
        this.keyword = keyword;
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

    public String getRationale()
    {
        return rationale;
    }

    public void setRationale(String rationale)
    {
        this.rationale = rationale;
    }

    public String getKeyword()
    {
        return keyword;
    }

    public void setKeyword(String keyword)
    {
        this.keyword = keyword;
    }
    
     
}
