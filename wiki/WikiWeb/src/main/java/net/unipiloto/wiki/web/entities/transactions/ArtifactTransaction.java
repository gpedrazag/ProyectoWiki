package net.unipiloto.wiki.web.entities.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import net.unipiloto.wiki.web.entities.Artifact;
import net.unipiloto.wiki.web.tools.OntologyTools;
import org.openrdf.model.IRI;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.model.vocabulary.RDF;
import org.openrdf.query.QueryLanguage;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class ArtifactTransaction
{
    public static void insert(int id, String description) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#artifact_"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#Artifact");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            String sparql = 
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#artifact_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#id>\n"+
                "'"+id+"'\n"+
                "} WHERE{};\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#artifact_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#description>\n"+
                "'"+description+"'\n"+
                "}\n"+
                "WHERE{};";
            conn.prepareUpdate(QueryLanguage.SPARQL, sparql);
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
        
    }
    
    public static void update(int id, String description) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, description);
    }
    
    public static void delete(int id) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            String sparql = 
                "DELETE {\n"
                + "<http://www.semanticweb.org/sa#artifact_"+id+"> "
                + "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type> "
                + "<http://www.semanticweb.org/sa#Artifact>}\n"
                + "WHERE{}"
            ;
            conn.prepareUpdate(sparql);
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
    }
    
    public static Artifact selectById(int id) 
    {
        Artifact artifact = null;
        
        return artifact;
    }
}
