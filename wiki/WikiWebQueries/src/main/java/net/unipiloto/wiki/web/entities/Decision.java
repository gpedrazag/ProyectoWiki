package net.unipiloto.wiki.web.entities;

import java.util.List;

public class Decision
{
    private String id;
    private String name;
    private String arguments;
    private String state;
    private List<Constraint> mayHaveConstraints;
    private List<Criteria> haveCriterias;
    private List<Assumption> mayHaveAssumptions;
    private List<Concern> haveAsTriggerConcerns;
    private List<Responsible> haveResponsibles;
    private List<Decision> descomposeInDecisions;
    private List<Decision> compatibleToDecisions;
    private List<Decision> notCompatibleToDecisions;
    private List<Alternative> haveAlternatives;
    private Solution haveSolution;
    private String reference = "/Decision/";

    public Decision(String id, String name, String arguments, String state)
    {
        this.id = id;
        this.name = name;
        this.arguments = arguments;
        this.state = state;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public List<Constraint> getMayHaveConstraints()
    {
        return mayHaveConstraints;
    }

    public void setMayHaveConstraints(List<Constraint> mayHaveConstraints)
    {
        this.mayHaveConstraints = mayHaveConstraints;
    }

    public List<Criteria> getHaveCriterias()
    {
        return haveCriterias;
    }

    public void setHaveCriterias(List<Criteria> haveCriterias)
    {
        this.haveCriterias = haveCriterias;
    }

    public List<Assumption> getMayHaveAssumptions()
    {
        return mayHaveAssumptions;
    }

    public void setMayHaveAssumptions(List<Assumption> mayHaveAssumptions)
    {
        this.mayHaveAssumptions = mayHaveAssumptions;
    }

    public List<Concern> getHaveAsTriggerConcerns()
    {
        return haveAsTriggerConcerns;
    }

    public void setHaveAsTriggerConcerns(List<Concern> haveAsTriggerConcerns)
    {
        this.haveAsTriggerConcerns = haveAsTriggerConcerns;
    }

    public List<Responsible> getHaveResponsibles()
    {
        return haveResponsibles;
    }

    public void setHaveResponsibles(List<Responsible> haveResponsibles)
    {
        this.haveResponsibles = haveResponsibles;
    }

    public List<Decision> getDescomposeInDecisions()
    {
        return descomposeInDecisions;
    }

    public void setDescomposeInDecisions(List<Decision> descomposeInDecisions)
    {
        this.descomposeInDecisions = descomposeInDecisions;
    }

    public List<Decision> getCompatibleToDecisions()
    {
        return compatibleToDecisions;
    }

    public void setCompatibleToDecisions(List<Decision> compatibleToDecisions)
    {
        this.compatibleToDecisions = compatibleToDecisions;
    }

    public List<Decision> getNotCompatibleToDecisions()
    {
        return notCompatibleToDecisions;
    }

    public void setNotCompatibleToDecisions(List<Decision> notCompatibleToDecisions)
    {
        this.notCompatibleToDecisions = notCompatibleToDecisions;
    }

    public List<Alternative> getHaveAlternatives()
    {
        return haveAlternatives;
    }

    public void setHaveAlternatives(List<Alternative> haveAlternatives)
    {
        this.haveAlternatives = haveAlternatives;
    }

    public Solution getHaveSolution()
    {
        return haveSolution;
    }

    public void setHaveSolution(Solution haveSolution)
    {
        this.haveSolution = haveSolution;
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

    public String getArguments()
    {
        return arguments;
    }

    public void setArguments(String arguments)
    {
        this.arguments = arguments;
    }

    public String getState()
    {
        return state;
    }

    public void setState(String state)
    {
        this.state = state;
    }
    
    
}
