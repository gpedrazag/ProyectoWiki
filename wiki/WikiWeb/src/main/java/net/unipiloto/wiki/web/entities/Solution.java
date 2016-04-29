package net.unipiloto.wiki.web.entities;

public class Solution extends Alternative
{
    private int id;
    private String rationale;

    public Solution(int id, String name, String description)
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

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }
    
    
}
