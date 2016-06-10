package net.unipiloto.wiki.web.services;

import javax.ejb.Remote;

@Remote
public interface SoftwareArchitectureService 
{
    public String selectById(String id);
    public String selectAll();
}
