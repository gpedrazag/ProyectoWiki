package net.unipiloto.wiki.web.entities;

import java.util.List;

public class Criteria
{
    private String id;
    private String keyword;
    private String description;
    private List<Evaluation> linkedEvaluations;

    public Criteria(String id, String keyword, String description)
    {
        this.id = id;
        this.keyword = keyword;
        this.description = description;
    }

    public List<Evaluation> getLinkedEvaluations()
    {
        return linkedEvaluations;
    }

    public void setLinkedEvaluations(List<Evaluation> linkedEvaluations)
    {
        this.linkedEvaluations = linkedEvaluations;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getKeyword()
    {
        return keyword;
    }

    public void setKeyword(String keyword)
    {
        this.keyword = keyword;
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
