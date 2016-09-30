package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.QualityAttribute;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class QualityAttributeTransaction
{
    public static List<QualityAttribute> selectQAByConcenrId(String id, RepositoryConnection connection) 
    {
        List<QualityAttribute> qas = new ArrayList();
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
                "SELECT DISTINCT ?id ?actor ?enviroment ?measure ?boost ?boostSource WHERE {"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#determinedBy> ?d . "
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#actor> ?actor . "
                +"?d <http://www.semanticweb.org/sa#enviroment> ?enviroment . "
                +"?d <http://www.semanticweb.org/sa#measure> ?measure . "
                +"?d <http://www.semanticweb.org/sa#boost> ?boost . "
                +"?d <http://www.semanticweb.org/sa#boostSource> ?boostSource "
                +"} "
                +"ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                qas.add(
                    new QualityAttribute(
                        bs.getValue("id").stringValue(), 
                        bs.getValue("actor").stringValue(), 
                        bs.getValue("enviroment").stringValue(), 
                        bs.getValue("measure").stringValue(), 
                        bs.getValue("boost").stringValue(), 
                        bs.getValue("boostSource").stringValue()
                    ));
                int i = qas.size()-1;
                qas.get(i).setTriggerArtifacts(ArtifactTransaction.selectByQAId(qas.get(i).getId(), connection));
            }
            
            if(qas.isEmpty())
            {
                qas = null;
            }
        }
        finally
        {
            if(connection == null)
            {
                conn.close();
                
            }
        }
        
        return qas;
    }
    
    public static String selectById(String id)
    {
        QualityAttribute fr = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?actor ?enviroment ?measure ?boost ?boostSource WHERE {\n"
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#id> ?id . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#actor> ?actor . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#enviroment> ?enviroment . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#measure> ?measure . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#boost> ?boost . "
                +"<http://www.semanticweb.org/sa#"+id+"> <http://www.semanticweb.org/sa#boostSource> ?boostSource "
                +"} "
                +"ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                fr = new QualityAttribute(
                    bs.getValue("id").stringValue(), 
                        bs.getValue("actor").stringValue(), 
                        bs.getValue("enviroment").stringValue(), 
                        bs.getValue("measure").stringValue(), 
                        bs.getValue("boost").stringValue(), 
                        bs.getValue("boostSource").stringValue()
                );
                fr.setTriggerArtifacts(ArtifactTransaction.selectByQAId(id, conn));
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
        List<QualityAttribute> qas = new ArrayList();
        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();
        
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, 
                "SELECT DISTINCT ?id ?actor ?enviroment ?measure ?boost ?boostSource WHERE {"
                +"?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#QualityAttributeStage> . "
                +"?d <http://www.semanticweb.org/sa#id> ?id . "
                +"?d <http://www.semanticweb.org/sa#actor> ?actor . "
                +"?d <http://www.semanticweb.org/sa#enviroment> ?enviroment . "
                +"?d <http://www.semanticweb.org/sa#measure> ?measure . "
                +"?d <http://www.semanticweb.org/sa#boost> ?boost . "
                +"?d <http://www.semanticweb.org/sa#boostSource> ?boostSource "
                +"} "
                +"ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                
                BindingSet bs = result.next();
                qas.add(new QualityAttribute(
                    bs.getValue("id").stringValue(), 
                    bs.getValue("actor").stringValue(), 
                    bs.getValue("enviroment").stringValue(), 
                    bs.getValue("measure").stringValue(), 
                    bs.getValue("boost").stringValue(), 
                    bs.getValue("boostSource").stringValue()
                ));
                
                int i = qas.size()-1;
                qas.get(i).setTriggerArtifacts(ArtifactTransaction.selectByQAId(qas.get(i).getId(), conn));
                
            }
            
            if(qas.isEmpty())
            {
                qas = null;
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(qas);
    }
}
