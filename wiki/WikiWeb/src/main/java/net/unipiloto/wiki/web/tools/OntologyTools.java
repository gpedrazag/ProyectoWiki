package net.unipiloto.wiki.web.tools;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.channels.FileChannel;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.openrdf.OpenRDFException;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.sail.SailRepository;
import org.openrdf.rio.RDFFormat;
import org.openrdf.sail.nativerdf.NativeStore;


public class OntologyTools
{
    private static Repository repo;
    
    public static Repository getInstance()
    {
        if (repo==null)
        {
            repo = initRepository();
        }
        return repo;
    }
    
    public static Repository initRepository()
    {
        RepositoryConnection conn = null;
        //File[] files = configWorkStation(request);
        if(repo != null)
        {
            if(!repo.isInitialized())
                repo.initialize();
        }
        else
        {
            try
            {
                String ch = System.getProperty("catalina.home");
                String sep = System.getProperty("file.separator");
                String outreach = ch+sep+"outreach";
                File ont = new File(outreach+sep+"ontologies"+sep+"ontology.owl");
                repo = new SailRepository(new NativeStore(new File(outreach+sep+"native_store"+sep)));
                repo.initialize();
                conn = repo.getConnection();
                if(conn.getNamespace("http://www.semanticweb.org/sa#") == null)
                {
                    conn.add(ont, "http://www.semanticweb.org/sa", RDFFormat.RDFXML);
                }
                
            } 
            catch (IOException | OpenRDFException ex)
            {
                Logger.getLogger(OntologyTools.class.getName()).log(Level.SEVERE, null, ex);
            }
            finally
            {
                conn.close();
                repo.shutDown();
            }
        }
        
        return repo;
    }
    
    private static File[] configWorkStation() throws URISyntaxException
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
        File ont = new File(ontDir.getAbsolutePath()+sep+"ontology.owl");
        File newOnt = null;
        if(!ont.exists())
        {
            try
            {
                
                boolean create = true;
                if(create)
                {
                    FileChannel sc = null;
                    FileChannel dt = null;
                    try
                    {
                        sc = new FileInputStream(new File(OntologyTools.class.getResource("/ontologies/ontology.owl").toURI())).getChannel();
                        newOnt = new File(ontDir+sep+"ontology.owl");
                        newOnt.createNewFile();
                        dt = new FileInputStream(newOnt).getChannel();
                        sc.force(true);
                        dt.force(true);
                        dt.transferFrom(sc, 0, sc.size());
                    }
                    finally
                    {
                        sc.close();
                        dt.close();
                    }
                    
                }
                newOnt = new File(outreach.getAbsolutePath()+sep+"ontologies"+sep+"ontology.owl");
            } 
            catch (IOException ex)
            {                
            }
        }
        else
        {
            newOnt=ont;
        }
        return new File[]{nativeDir, newOnt};
    }
        
}
