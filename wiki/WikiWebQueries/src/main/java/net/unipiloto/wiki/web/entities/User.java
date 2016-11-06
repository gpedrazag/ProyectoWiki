package net.unipiloto.wiki.web.entities;

import java.util.List;

public class User {
    
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String login;
    private String password;
    private List<Privilege> havePrivileges;

    public User(String id, String firstName, String lastName, String email, String login, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.login = login;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Privilege> getHavePrivileges() {
        return havePrivileges;
    }

    public void setHavePrivileges(List<Privilege> havePrivileges) {
        this.havePrivileges = havePrivileges;
    }
    
    
}
