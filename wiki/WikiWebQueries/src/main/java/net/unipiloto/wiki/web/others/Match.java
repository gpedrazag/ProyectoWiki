package net.unipiloto.wiki.web.others;

public class Match {

    private String property;
    private String content;

    public Match(String property, String content) {
        this.property = property;
        this.content = content;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
