package net.unipiloto.wiki.ejb.services.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import javax.ejb.Stateful;
import net.unipiloto.wiki.ejb.services.OntologyGeneralService;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.sail.SailRepository;
import org.openrdf.sail.nativerdf.NativeStore;


@Stateful(mappedName = "java:global/wiki/OntologyGeneralService")
public class OntologyGeneralServiceImpl implements OntologyGeneralService
{
    private Repository repo;
    private RepositoryConnection conn;
    
    @Override
    public void initRepository()
    {
        configWorkStation();
        repo = new SailRepository(new NativeStore());
        repo.initialize();
        conn = repo.getConnection();
       
    }

    private void configWorkStation()
    {
        String ch = System.getProperty("catalina.home");
        String sep = System.getProperty("file.separator");
        File outreach = new File(ch+sep+"outreach"+sep);
        if(!outreach.isDirectory())
        {
            outreach.mkdir();
        }
        File nativeDir = new File(outreach.getAbsolutePath()+sep+"native_store"+sep);
        if(!nativeDir.isDirectory())
        {
            nativeDir.mkdir();
        }
        File ontDir = new File(outreach.getAbsolutePath()+sep+"ontologies"+sep);
        if(!ontDir.isDirectory())
        {
            ontDir.mkdir();
        }
        File ont = new File(getClass().getClassLoader().getResource("ontologies"+sep+"ontology.owl").getPath().substring(1));
        File newOnt = new File(ontDir.getAbsolutePath()+sep+ont.getName());
        if(!newOnt.exists())
        {
            try
            {
                Files.move(ont.toPath(), ontDir.toPath().resolve(ont.toPath().getFileName()),StandardCopyOption.REPLACE_EXISTING);
            } 
            catch (IOException ex)
            {                
            }
        }
    }
        
}
