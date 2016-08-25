package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.FunctionalRequeriment;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class FunctionalRequerimentTransaction
{
    public static List<FunctionalRequeriment> selectFRByConcernId(String id, RepositoryConnection connection)
    {
        List<FunctionalRequeriment> frs = new ArrayList();
        Repository repo = null;
        RepositoryConnection conn = null;
        if(connection != null)
        {
            conn = connection;
        }
        else
        {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#determinedBy> ?d . "
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#name> ?name . "
                +"?d <http://www.semanticweb.org/sa#actor> ?actor . "
                +"?d <http://www.semanticweb.org/sa#description> ?description . "
                +"?d <http://www.semanticweb.org/sa#input> ?input . "
                +"?d <http://www.semanticweb.org/sa#output> ?output "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                frs.add(
                    new FunctionalRequeriment(
                        bs.getValue("id").stringValue(), 
                        bs.getValue("name").stringValue(), 
                        bs.getValue("actor").stringValue(), 
                        bs.getValue("description").stringValue(), 
                        bs.getValue("input").stringValue(), 
                        bs.getValue("output").stringValue()
                    ));
            }
            
            if(frs.isEmpty())
            {
                frs = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return frs;
    }
    
    public static String selectById(String id)
    {
        FunctionalRequeriment fr = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output WHERE {\n"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#name> ?name . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#actor> ?actor . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#description> ?description . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#input> ?input . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#output> ?output "
                + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                fr = new FunctionalRequeriment(
                    bs.getValue("id").stringValue(), 
                        bs.getValue("name").stringValue(), 
                        bs.getValue("actor").stringValue(), 
                        bs.getValue("description").stringValue(), 
                        bs.getValue("input").stringValue(), 
                        bs.getValue("output").stringValue()
                );
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(fr);
    }
    
    public static String selectAll()
    {
        List<FunctionalRequeriment> frs = new ArrayList();
        
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();
        
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output WHERE {"
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#name> ?name . "
                +"?d <http://www.semanticweb.org/sa#actor> ?actor . "
                +"?d <http://www.semanticweb.org/sa#description> ?description . "
                +"?d <http://www.semanticweb.org/sa#input> ?input . "
                +"?d <http://www.semanticweb.org/sa#output> ?output "
                +"}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                frs.add(new FunctionalRequeriment(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("name").stringValue(), 
                    bs.getValue("actor").stringValue(), 
                    bs.getValue("description").stringValue(), 
                    bs.getValue("input").stringValue(), 
                    bs.getValue("output").stringValue()
                ));
            }
            
            if(frs.isEmpty())
            {
                frs = null;
            }
        }
        finally
        {
            conn.close();
       
        }
        
        return JsonFactory.toJson(frs);
    }
    
    
}
