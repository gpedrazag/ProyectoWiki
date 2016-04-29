package net.unipiloto.wiki.web.entities.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import net.unipiloto.wiki.web.tools.OntologyTools;
import org.openrdf.model.IRI;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.model.vocabulary.RDF;
import org.openrdf.query.QueryLanguage;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class ConstraintTransaction
{
    public static void insert(int id, String name, String description, String rationale, String keyword) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#constraint_"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#Constraint");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            String sparql = 
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#constraint_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#id>\n"+
                "'"+id+"'\n"+
                "} WHERE{};\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#constraint_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#name>\n"+
                "'"+name+"'\n"+
                "}\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#constraint_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#description>\n"+
                "'"+description+"'\n"+
                "} WHERE{};\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#constraint_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#rationale>\n"+
                "'"+rationale+"'\n"+
                "} WHERE{};\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#constraint_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#keyword>\n"+
                "'"+keyword+"'\n"+
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
    
    public static void update(int id, String name, String description, String rationale, String keyword) throws IOException, URISyntaxException
    {
        
        delete(id);
        insert(id, name, description, rationale, keyword);
        
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
                + "<http://www.semanticweb.org/sa#constraint_"+id+"> "
                + "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type> "
                + "<http://www.semanticweb.org/sa#Constraint>}\n"
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
