package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import net.unipiloto.wiki.web.entities.Evaluation;
import net.unipiloto.wiki.web.tools.OntologyTools;
import org.openrdf.model.IRI;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.model.vocabulary.RDF;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class EvaluationTransaction
{
    public static void insert(String id, String pros, String cons, String valoration) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#Evaluation");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#pros"), factory.createLiteral(pros));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#cons"), factory.createLiteral(cons));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#valoration"), factory.createLiteral(valoration));
            conn.commit();
        }
        catch(Exception ex)
        {
            conn.rollback();
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
        
    }
    
    public static void update(String id, String pros, String cons, String valoration) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, pros, cons, valoration);
    }
    
    public static void delete(String id) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
        try
        {
            conn.begin();
            conn.remove(
                subject,
                factory.createIRI("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
                factory.createIRI("http://www.semanticweb.org/sa#Evaluation")
            );
            conn.commit();
        }
        catch(Exception ex)
        {
            conn.rollback();
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
    }
    
    public static Evaluation getByAlternativeId(String alternativeId)
    {
        Evaluation evaluation = null;
        
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT ?id, ?pros, ?cons, ?valoration WHERE {"
                + "<http://www.semanticweb.org/sa#"+alternativeId+"> <http://www.semanticweb.org/sa#alternativeLinkTo> ?d "
                + "?d  <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                + "?d <http://www.semanticweb.org/sa#id> ?id ."
                + "?d <http://www.semanticweb.org/sa#description> ?description "
                + "?d <http://www.semanticweb.org/sa#name> ?name "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                evaluation = new Evaluation(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("pros").stringValue(), 
                    bs.getValue("cons").stringValue(), 
                    bs.getValue("valoration").stringValue()
                );
            }
           
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
        
        return evaluation;
    }
}
