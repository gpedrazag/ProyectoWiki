package net.unipiloto.wiki.web.entities;

public class Change {
    
    private String id;
    private String pastContent;
    private String newContent;
    private String userID;
    private String individualID;
    private String dpChanged;
    private boolean isActive;
    private long Date;

    public Change(String id, String pastContent, String newContent, String userID, String individualID, String dpChanged, boolean isActive, long Date) {
        this.id = id;
        this.pastContent = pastContent;
        this.newContent = newContent;
        this.userID = userID;
        this.individualID = individualID;
        this.dpChanged = dpChanged;
        this.isActive = isActive;
        this.Date = Date;
    }
    
    public boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDpChanged() {
        return dpChanged;
    }

    public void setDpChanged(String dpChanged) {
        this.dpChanged = dpChanged;
    }
    
    public String getPastContent() {
        return pastContent;
    }

    public void setPastContent(String pastContent) {
        this.pastContent = pastContent;
    }

    public String getNewContent() {
        return newContent;
    }

    public void setNewContent(String newContent) {
        this.newContent = newContent;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getIndividualID() {
        return individualID;
    }

    public void setIndividualID(String individualID) {
        this.individualID = individualID;
    }

    public long getDate() {
        return Date;
    }

    public void setDate(long Date) {
        this.Date = Date;
    }
    
    
}
