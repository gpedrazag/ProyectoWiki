package net.unipiloto.wiki.domain.entities;

public class Solution extends Alternative
{
    private String id;
    private String rationale;

    public Solution(String id, String name, String description)
    {
        super(id, name, description);
    }

    public String getRationale()
    {
        return rationale;
    }

    public void setRationale(String rationale)
    {
        this.rationale = rationale;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }
    
    
}
