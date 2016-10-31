package net.unipiloto.wiki.web.entities;

public class FunctionalRequeriment
{
    private String id;
    private String name;
    private String actor;
    private String description;
    private String input;
    private String output;
    private String state;
    private String utility;
    private String expectative;
    private String response;
    private String context;
    private String reference = "/FunctionalRequeriment/";
    

    public FunctionalRequeriment(String id, String name, String actor, String description, String input, String output, String state, String utility, String expectative, String response, String context) {
        this.id = id;
        this.name = name;
        this.actor = actor;
        this.description = description;
        this.input = input;
        this.output = output;
        this.state = state;
        this.utility = utility;
        this.expectative = expectative;
        this.response = response;
        this.context = context;
    }    

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }
    
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getUtility() {
        return utility;
    }

    public void setUtility(String utility) {
        this.utility = utility;
    }

    public String getExpectative() {
        return expectative;
    }

    public void setExpectative(String expectative) {
        this.expectative = expectative;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
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
