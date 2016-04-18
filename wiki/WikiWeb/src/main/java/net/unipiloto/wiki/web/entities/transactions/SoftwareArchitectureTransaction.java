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

public class SoftwareArchitectureTransaction
{
    public static void insert(int id, String name, String description) throws IOException, URISyntaxException
    {
        Repository repo = OntologyGeneralService.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#softwarearchitecture_"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#SoftwareArchitecture");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            String sparql = 
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#softwarearchitecture_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#id>\n"+
                "'"+id+"'\n"+
                "}\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#softwarearchitecture_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#name>\n"+
                "'"+name+"'\n"+
                "}\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#softwarearchitecture_"+id+">\n"+
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
    
    public static void update(int id, String name, String description) throws IOException, URISyntaxException
    {
        Repository repo = OntologyGeneralService.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            String sparql = 
                "DELETE {\n"
                + "<http://www.semanticweb.org/sa#softwarearchitecture_"+id+"> "
                + "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type> "
                + "<http://www.semanticweb.org/sa#SoftwareArchitecture>}\n"
                + "WHERE{}"
            ;
            conn.prepareUpdate(sparql);
            insert(id, name, description);
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
    }
    
    public static void delete(int id) throws IOException, URISyntaxException
    {
        Repository repo = OntologyGeneralService.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            String sparql = 
                "DELETE {\n"
                + "<http://www.semanticweb.org/sa#softwarearchitecture_"+id+"> "
                + "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type> "
                + "<http://www.semanticweb.org/sa#SoftwareArchitecture>}\n"
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
