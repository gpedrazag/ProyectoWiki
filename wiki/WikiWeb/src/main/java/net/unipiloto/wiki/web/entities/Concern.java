package net.unipiloto.wiki.web.entities;

import java.util.List;

public class Concern
{
    private int id;
    private String concern;
    private List<QualityAttribute> describedByQA;
    private List<FunctionalRequeriment> describedByFR;

    public Concern(int id, String concern)
    {
        this.id = id;
        this.concern = concern;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getConcern()
    {
        return concern;
    }

    public void setConcern(String concern)
    {
        this.concern = concern;
    }

    public List<QualityAttribute> getDescribedByQA()
    {
        return describedByQA;
    }

    public void setDescribedByQA(List<QualityAttribute> describedByQA)
    {
        this.describedByQA = describedByQA;
    }

    public List<FunctionalRequeriment> getDescribedByFR()
    {
        return describedByFR;
    }

    public void setDescribedByFR(List<FunctionalRequeriment> describedByFR)
    {
        this.describedByFR = describedByFR;
    }
    
    
}
