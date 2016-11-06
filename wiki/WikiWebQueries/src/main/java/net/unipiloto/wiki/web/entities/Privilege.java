package net.unipiloto.wiki.web.entities;

public class Privilege {
    
    private String id;
    private String privilegeType;

    public Privilege(String id, String privilegeType) {
        this.id = id;
        this.privilegeType = privilegeType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPrivilegeType() {
        return privilegeType;
    }

    public void setPrivilegeType(String privilegeType) {
        this.privilegeType = privilegeType;
    }    
    
}
