package net.unipiloto.wiki.ejb.services;

import javax.ejb.Remote;

@Remote
public interface OntologyGeneralService
{
    public void initRepository();
}
