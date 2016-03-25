package net.unipiloto.wiki.ejb.services.impl;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import javax.ejb.Singleton;
import net.unipiloto.wiki.ejb.services.OntologyGeneralService;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.RepositoryException;
import org.openrdf.repository.sail.SailRepository;
import org.openrdf.rio.RDFFormat;
import org.openrdf.rio.RDFParseException;
import org.openrdf.sail.nativerdf.NativeStore;

@Singleton
public class OntologyGeneralServiceImpl implements OntologyGeneralService
{

    private RepositoryConnection conn;
    private Repository repository;
    
    @Override
    public short initRepository(String nativeDir, String ontDir) throws RepositoryException, URISyntaxException, IOException, RDFParseException
    {
        short result = 0;
        if(repository != null)
        {
            if(!repository.isInitialized())
            {
                repository.initialize();
                result = 2;
            }
        }
        else
        {
            File ont = new File(ontDir);
            File dir = new File(nativeDir);
            repository = new SailRepository(new NativeStore(dir));
            repository.initialize();
            conn = repository.getConnection();
            conn.add(ont, "http://sa.com/sa", RDFFormat.RDFXML);
        }
        return result;
    }

    @Override
    public RepositoryConnection getConn()
    {
        return conn;
    }
}
