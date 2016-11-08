package net.unipiloto.wiki.web.entities;

public class Alternative
{
    private String reference = "/Alternative/";
    private String id;
    private String rationale;
    private String description;
    private Evaluation haveEvaluation;

    public Alternative(String id, String rationale, String description)
    {
        this.id = id;
        this.rationale = rationale;
        this.description = description;
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

    public Evaluation getHaveEvaluation()
    {
        return haveEvaluation;
    }

    public void setHaveEvaluation(Evaluation haveEvaluation)
    {
        this.haveEvaluation = haveEvaluation;
    }

    public String getRationale()
    {
        return rationale;
    }

    public void setRationale(String rationale)
    {
        this.rationale = rationale;
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
