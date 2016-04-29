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

public class EvaluationTransaction
{
    public static void insert(int id, String pros, String cons, String valoration) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#evaluation_"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#Evaluation");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            String sparql = 
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#evaluation_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#id>\n"+
                "'"+id+"'\n"+
                "} WHERE{};\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#evaluation_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#pros>\n"+
                "'"+pros+"'\n"+
                "} WHERE{};\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#evaluation_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#cons>\n"+
                "'"+cons+"'\n"+
                "} WHERE{};\n"+
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#evaluation_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#valoration>\n"+
                "'"+valoration+"'\n"+
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
    
    public static void update(int id, String pros, String cons, String valoration) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, pros, cons, valoration);
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
                + "<http://www.semanticweb.org/sa#evaluation_"+id+"> "
                + "<http://www.w3.org/1999/02/22-rdf-syntax-ns#type> "
                + "<http://www.semanticweb.org/sa#Evaluation>}\n"
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
