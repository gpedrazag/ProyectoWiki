package net.unipiloto.wiki.web.others;

public class Image {
    
    private String name;
    private String base64;
    private String resolution;

    public Image(String name, String base64, String resolution) {
        this.name = name;
        this.base64 = base64;
        this.resolution = resolution;
    }

    public Image(String name) {
        this.name = name;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public String getResolution() {
        return resolution;
    }

    public void setResolution(String resolution) {
        this.resolution = resolution;
    }    
}
