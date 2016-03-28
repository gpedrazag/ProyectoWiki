package net.unipiloto.wiki.web.services;

import javax.ejb.Remote;

@Remote
public interface OntologyGeneralService
{
    public void initRepository();
}
