package net.unipiloto.wiki.ejb.services;

import java.io.IOException;
import java.net.URISyntaxException;
import javax.ejb.Remote;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.RepositoryException;
import org.openrdf.rio.RDFParseException;

@Remote
public interface OntologyGeneralService
{
    public short initRepository(String nativeDir, String ontDir) throws RepositoryException, URISyntaxException, IOException, RDFParseException;
    public RepositoryConnection getConn();
}
