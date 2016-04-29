package net.unipiloto.wiki.web.entities;

public class Evaluation
{
    private int id;
    public String pros;
    public String cons;
    public String valoration;

    public Evaluation(int id, String pros, String cons, String valoration)
    {
        this.id = id;
        this.pros = pros;
        this.cons = cons;
        this.valoration = valoration;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
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
    
     
}
