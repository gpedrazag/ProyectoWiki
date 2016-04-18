package net.unipiloto.wiki.web.entities.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import net.unipiloto.wiki.web.services.OntologyGeneralService;
import org.openrdf.model.IRI;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.model.vocabulary.RDF;
import org.openrdf.query.QueryLanguage;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class ArtifactTransaction
{
    public static void insertArtifact(int id, String description) throws IOException, URISyntaxException
    {
        Repository repo = OntologyGeneralService.getInstance();
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
                "   <http://www.semanticweb.org/sa#description>\n"+
                "'"+description+"'\n"+
                "}\n"+
                "WHERE{}";
            System.out.println(sparql);
            conn.prepareUpdate(QueryLanguage.SPARQL, sparql);
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
        
    }
    
    public static void updateArtifact(int id, String description) throws IOException, URISyntaxException
    {
        Repository repo = OntologyGeneralService.getInstance();
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
            insertArtifact(id, description);
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
    }
    
    public static void deleteArtifact(int id) throws IOException, URISyntaxException
    {
        Repository repo = OntologyGeneralService.getInstance();
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
}
