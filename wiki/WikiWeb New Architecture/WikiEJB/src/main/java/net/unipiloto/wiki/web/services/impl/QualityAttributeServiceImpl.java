package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Artifact;
import net.unipiloto.wiki.domain.entities.QualityAttribute;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.QualityAttributeService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/QualityAttributeService")
public class QualityAttributeServiceImpl implements QualityAttributeService
{
    @Override
    public String selectQAByConcenrId(String id, RepositoryConnection connection) 
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
                +"}"
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
                qas.get(i).setTriggerArtifacts(JsonFactory.fromJsonArray(new ArtifactServiceImpl().selectByQAId(qas.get(i).getId(), connection),Artifact.class));
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
        
        return JsonFactory.toJson(qas);
    }
    
    @Override
    public String selectById(String id)
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
                + "}"
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
                fr.setTriggerArtifacts(JsonFactory.fromJsonArray(new ArtifactServiceImpl().selectByQAId(id, conn),Artifact.class));
            }
        }
        finally
        {
            conn.close();
        }
        
        return JsonFactory.toJson(fr);
    }
    
    @Override
    public String selectAll()
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
                +"}"
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
                qas.get(i).setTriggerArtifacts(JsonFactory.fromJsonArray(new ArtifactServiceImpl().selectByQAId(qas.get(i).getId(), conn),Artifact.class));
                
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
