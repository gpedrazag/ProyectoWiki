package net.unipiloto.wiki.web.others;

import java.util.List;

public class Generic
{
    private String classType;
    private String id;
    private List<Match> matches;

    public Generic(String id, String classType, List<Match> matches) {
        this.classType = classType;
        this.id = id;
        this.matches = matches;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Match> getMatches() {
        return matches;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }
    
    
}

