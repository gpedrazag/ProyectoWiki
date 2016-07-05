package net.unipiloto.wiki.web.entities;

public class FunctionalRequeriment
{
    private String id;
    public String name;
    public String actor;
    public String description;
    public String input;
    public String output;

    public FunctionalRequeriment(String id, String name, String actor, String description, String input, String output)
    {
        this.id = id;
        this.name = name;
        this.actor = actor;
        this.description = description;
        this.input = input;
        this.output = output;
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

    public String getActor()
    {
        return actor;
    }

    public void setActor(String actor)
    {
        this.actor = actor;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getInput()
    {
        return input;
    }

    public void setInput(String input)
    {
        this.input = input;
    }

    public String getOutput()
    {
        return output;
    }

    public void setOutput(String output)
    {
        this.output = output;
    }
    
    
}
