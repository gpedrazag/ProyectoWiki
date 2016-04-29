package net.unipiloto.wiki.web.entities;

import java.util.List;

public class QualityAttribute
{
    private int id;
    private String actor;
    private String enviroment;
    private String measure;
    private String boost;
    private String boostSource;
    private List<Artifact> triggerArtifacts;
    

    public QualityAttribute(int id, String actor, String enviroment, String measure, String boost, String boostSource)
    {
        this.id = id;
        this.actor = actor;
        this.enviroment = enviroment;
        this.measure = measure;
        this.boost = boost;
        this.boostSource = boostSource;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getActor()
    {
        return actor;
    }

    public void setActor(String actor)
    {
        this.actor = actor;
    }

    public String getEnviroment()
    {
        return enviroment;
    }

    public void setEnviroment(String enviroment)
    {
        this.enviroment = enviroment;
    }

    public String getMeasure()
    {
        return measure;
    }

    public void setMeasure(String measure)
    {
        this.measure = measure;
    }

    public String getBoost()
    {
        return boost;
    }

    public void setBoost(String boost)
    {
        this.boost = boost;
    }

    public String getBoostSource()
    {
        return boostSource;
    }

    public void setBoostSource(String boostSource)
    {
        this.boostSource = boostSource;
    }

    public List<Artifact> getTriggerArtifacts()
    {
        return triggerArtifacts;
    }

    public void setTriggerArtifacts(List<Artifact> triggerArtifacts)
    {
        this.triggerArtifacts = triggerArtifacts;
    }
    
     
    
}
