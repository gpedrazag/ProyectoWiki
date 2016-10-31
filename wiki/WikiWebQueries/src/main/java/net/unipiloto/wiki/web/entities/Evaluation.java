package net.unipiloto.wiki.web.entities;

import java.util.List;

public class Evaluation
{
    private String id;
    public String pros;
    public String cons;
    public String valoration;
    public List<Alternative> linkAlternative;
    private String reference = "/Evaluation/";

    public Evaluation(String id, String pros, String cons, String valoration)
    {
        this.id = id;
        this.pros = pros;
        this.cons = cons;
        this.valoration = valoration;
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

    public String getPros()
    {
        return pros;
    }

    public void setPros(String pros)
    {
        this.pros = pros;
    }

    public String getCons()
    {
        return cons;
    }

    public void setCons(String cons)
    {
        this.cons = cons;
    }

    public String getValoration()
    {
        return valoration;
    }

    public void setValoration(String valoration)
    {
        this.valoration = valoration;
    }

    public List<Alternative> getLinkAlternative() {
        return linkAlternative;
    }

    public void setLinkAlternative(List<Alternative> linkAlternative) {
        this.linkAlternative = linkAlternative;
    }
    
     
}
