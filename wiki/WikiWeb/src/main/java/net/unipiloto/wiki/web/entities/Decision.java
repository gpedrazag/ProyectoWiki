package net.unipiloto.wiki.web.entities;

import java.util.List;

public class Decision
{
    private String id;
    private String nombre;
    private String arguments;
    private String state;
    private List<Constraint> mayHaveConstraStrings;
    private List<Criteria> haveCriterias;
    private List<Assumption> mayHaveAssumptions;
    private List<Concern> haveAsTriggerConcerns;
    private List<Responsible> haveResponsibles;
    private List<Decision> descomposeInDecisions;
    private List<Decision> compatibleToDecisions;
    private List<Decision> notCompatibleToDecisions;
    private List<Alternative> haveAlternatives;
    private Solution haveSolution;

    public Decision(String id, String nombre, String arguments, String state)
    {
        this.id = id;
        this.nombre = nombre;
        this.arguments = arguments;
        this.state = state;
    }

    public List<Constraint> getMayHaveConstraStrings()
    {
        return mayHaveConstraStrings;
    }

    public void setMayHaveConstraStrings(List<Constraint> mayHaveConstraStrings)
    {
        this.mayHaveConstraStrings = mayHaveConstraStrings;
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

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
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
