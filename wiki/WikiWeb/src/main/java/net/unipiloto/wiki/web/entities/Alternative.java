package net.unipiloto.wiki.web.entities;

public class Alternative
{
    private String id;
    private String name;
    private String description;
    private Evaluation haveEvaluation;

    public Alternative(String id, String name, String description)
    {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public Evaluation getHaveEvaluation()
    {
        return haveEvaluation;
    }

    public void setHaveEvaluation(Evaluation haveEvaluation)
    {
        this.haveEvaluation = haveEvaluation;
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
