package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import net.unipiloto.wiki.web.entities.SoftwareArchitecture;
import net.unipiloto.wiki.web.others.OntologyTools;
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
    public static void insert(String id, String name, String description, List<String> relatedArtifacts, List<String> decisionsRelated) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            if(id == null)
            {
                List<Integer> ids = selectAllIds(conn);
                if(ids != null)
                {
                    id = "sa_"+(ids.get(0)+1);
                }
                else
                {
                    id = "sa_1";
                }
            }
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#"+id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#SoftwareArchitecture");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            if(relatedArtifacts != null)
            {
                for(String s : relatedArtifacts)
                {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#composeBy"), factory.createIRI("http://www.semanticweb.org/sa#"+s));
                }
            }
            if(decisionsRelated != null)
            {
                for(String s : decisionsRelated)
                {
                    conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#isaSetOf"), factory.createIRI("http://www.semanticweb.org/sa#"+s));
                }
            }
            conn.commit();
        }
        catch(Exception ex)
        {
            conn.rollback();
        }
        finally
        {
            conn.close();
        }
        
    }
    
    public static void update(String id, String name, String description, List<String> relatedArtifacts, List<String> decisionsRelated) throws IOException, URISyntaxException
    {
        delete(id);
        insert(id, name, description, relatedArtifacts, decisionsRelated);
    }
    
    public static void delete(String id) throws IOException, URISyntaxException
    {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            conn.prepareUpdate(
                "DELETE { <http://www.semanticweb.org/sa#"+id+"> ?p ?d2 }\n"
                +"WHERE { <http://www.semanticweb.org/sa#"+id+"> ?p ?d2 }"
                
            ).execute();
            conn.prepareUpdate(
                "DELETE { ?d1 ?p <http://www.semanticweb.org/sa#"+id+"> }\n"
                +"WHERE { ?d1 ?p <http://www.semanticweb.org/sa#"+id+"> }"
                
            ).execute();
        }
        catch(Exception ex)
        {
            conn.rollback();
        }
        finally
        {
            conn.close();
            
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
                "SELECT DISTINCT ?id ?name ?description WHERE {\n"
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                + "<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description . "
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
                sa.setRelatedDecisions(DecisionTransaction.selectAllDecisionsBySoftwareArchitectureId(id, conn));
            }
        }
        finally
        {
            conn.close();
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
                "SELECT DISTINCT ?id ?description ?name WHERE {\n"
                + "?sa <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#SoftwareArchitecture> . "
                + "?sa <http://www.semanticweb.org/sa#id> ?id . "
                + "?sa <http://www.semanticweb.org/sa#description> ?description . "
                + "?sa <http://www.semanticweb.org/sa#name> ?name "
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
                sas.get(i).setRelatedDecisions(DecisionTransaction.selectAllDecisionsBySoftwareArchitectureId(sas.get(i).getId(),conn));
                sas.get(i).setRelatedArtifacts(ArtifactTransaction.getAllArtifactsBySoftwareArchitectureId(sas.get(i).getId(), conn));

            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(sas);
        
    }
    
    private static List<Integer> selectAllIds(RepositoryConnection conn)
    {
        List<Integer> ids = new ArrayList<Integer>();
        TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
            "SELECT DISTINCT ?id WHERE {\n"
            + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#SoftwareArchitecture> . "
            + "?alternative <http://www.semanticweb.org/sa#id> ?id "
            + "}"
        );
        TupleQueryResult result = tq.evaluate();
        while(result.hasNext())
        {
            BindingSet bs = result.next();
            ids.add(Integer.parseInt(bs.getValue("id").stringValue().split("_")[1]));
        }
        if(ids.isEmpty())
        {
            ids = null;
        }
        else
        {
            ids.sort(new Comparator<Integer>() {
                @Override
                public int compare(Integer t, Integer t1)
                {
                    if(t1 > t)
                    {
                        return 1;
                    }
                    else if (t1 < t)
                    {
                        return -1;
                    }
                    return 0;
                }
            });
        }
        return ids;
    }
}
