package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Generic;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class GeneralTransactions
{
    public static String search(String pattern, RepositoryConnection connection)
    {
        List<Generic> l = new ArrayList();
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
            TupleQuery tq = conn.prepareTupleQuery(
                "SELECT DISTINCT ?id ?description ?name ?actor ?arguments ?boost "+
                "?boostSource ?concern ?cons ?enviroment ?input ?keyword ?measure "+
                "?output ?pros ?rationale ?source ?state ?valoration WHERE {\n"+
                "?x <http://www.semanticweb.org/sa#id> ?id . \n"+
                "?y <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#DatatypeProperty> . \n"+        
                "?x ?y ?z . \n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#description> ?description } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#name> ?name } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#actor> ?actor } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#arguments> ?arguments } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#boost> ?boost } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#boostSource> ?boostSource } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#concern> ?concern } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#cons> ?cons } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#enviroment> ?enviroment } .\n"+
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#input> ?input } .\n" +
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#keyword> ?keyword } .\n" +
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#measure> ?measure } .\n" +
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#output> ?output } .\n" +
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#pros> ?pros } .\n" +
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#rationale> ?rationale } .\n" +
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#source> ?source } .\n" +
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#state> ?state } .\n" +
                "OPTIONAL { ?x <http://www.semanticweb.org/sa#valoration> ?valoration } .\n" +
                "FILTER regex(?z, \""+pattern+"\", \"i\")}"
            );
            
            TupleQueryResult rs = tq.evaluate();
            while(rs.hasNext())
            {
                BindingSet bs = rs.next();
                Generic g = new Generic();
                if(bs.getValue("id") != null)
                    g.setId(bs.getValue("id").stringValue());
                if(bs.getValue("description") != null)
                    g.setDescription(bs.getValue("description").stringValue());
                if(bs.getValue("name") != null)
                    g.setName(bs.getValue("name").stringValue());
                if(bs.getValue("actor") != null)
                    g.setActor(bs.getValue("actor").stringValue());
                if(bs.getValue("arguments") != null)
                    g.setArguments(bs.getValue("arguments").stringValue());
                if(bs.getValue("boost") != null)
                    g.setBoost(bs.getValue("boost").stringValue());
                if(bs.getValue("boostSource") != null)
                    g.setBoostSource(bs.getValue("boostSource").stringValue());
                if(bs.getValue("concern") != null)
                    g.setConcern(bs.getValue("concern").stringValue());
                if(bs.getValue("cons") != null)
                    g.setCons(bs.getValue("cons").stringValue());
                if(bs.getValue("enviroment") != null)
                    g.setEnviroment(bs.getValue("enviroment").stringValue());
                if(bs.getValue("input") != null)
                    g.setInput(bs.getValue("input").stringValue());
                if(bs.getValue("keyword") != null)
                    g.setKeyword(bs.getValue("keyword").stringValue());
                if(bs.getValue("measure") != null)
                    g.setMeasure(bs.getValue("measure").stringValue());
                if(bs.getValue("output") != null)
                    g.setOutput(bs.getValue("output").stringValue());
                if(bs.getValue("pros") != null)
                    g.setPros(bs.getValue("pros").stringValue());
                if(bs.getValue("rationale") != null)
                    g.setRationale(bs.getValue("rationale").stringValue());
                if(bs.getValue("source") != null)
                    g.setSource(bs.getValue("source").stringValue());
                if(bs.getValue("state") != null)
                    g.setState(bs.getValue("state").stringValue());
                if(bs.getValue("valoration") != null)
                    g.setValoration(bs.getValue("valoration").stringValue());
                l.add(g);
            }
        }   
        finally
        {
            if(connection == null)
            {
                conn.close();
            }
        }
        
        return JsonFactory.toJson(l);
    }
}
