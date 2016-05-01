package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.SoftwareArchitecture;
import net.unipiloto.wiki.web.tools.OntologyTools;
import org.boon.json.JsonFactory;
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

public class SoftwareArchitectureTransaction
{
    public static void insert(String id, String name, String description) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#SoftwareArchitecture");
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(name));
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
    
    public static void update(String id, String name, String description) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, name, description);
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
                factory.createIRI("http://www.semanticweb.org/sa#SoftwareArchitecture")
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
    
    public static String selectById(String id) 
    {
        SoftwareArchitecture sa = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT ?id ?name ?description WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id ."
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#name> ?name "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                sa = new SoftwareArchitecture(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("description").stringValue()
                );
                
                sa.setRelatedArtifacts(ArtifactTransaction.getAllArtifactsBySoftwareArchitectureId(id, conn));
                sa.setDecisionsRelated(DecisionTransaction.selectAllDecisionsBySoftwareArchitectureId(id, conn));
            }
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
        
        return JsonFactory.toJson(sa);
    }
    
    public static String selectAll()
    {
        List<SoftwareArchitecture> sas = new ArrayList<SoftwareArchitecture>();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT ?id ?description WHERE {\n"
                + "?sa <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#SoftwareArchitecture> . "
                + "?sa <http://www.semanticweb.org/sa#id> ?id . "
                + "?sa <http://www.semanticweb.org/sa#description> ?description . "
                + "?sa <http://www.semanticweb.org/sa#description> ?name "
                + "}"

            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while(result.hasNext())
            {
                BindingSet bs = result.next();

                sas.add(new SoftwareArchitecture(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("description").stringValue()
                ));
                int i = sas.size() - 1;
                sas.get(i).setDecisionsRelated(DecisionTransaction.selectAllDecisionsByArtifactId(sas.get(i).getId(),conn));
                sas.get(i).setRelatedArtifacts(ArtifactTransaction.getAllArtifactsBySoftwareArchitectureId(sas.get(i).getId(), conn));

            }
        }
        finally
        {
            conn.close();
            repo.shutDown();
        }
        
        return JsonFactory.toJson(sas);
        
    }
}
