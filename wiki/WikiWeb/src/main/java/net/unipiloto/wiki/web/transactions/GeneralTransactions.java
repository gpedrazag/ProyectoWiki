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
                "?x <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#Individual> .\n" +
                "?x <http://www.semanticweb.org/sa#id> ?id . \n"+
                "?y <http://www.w3.org/2000/01/rdf-schema#domain> ?x .\n"+
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
                l.add(new Generic(
                    bs.getValue("id").stringValue(),
                    bs.getValue("description").stringValue(),
                    bs.getValue("name").stringValue(),
                    bs.getValue("actor").stringValue(),
                    bs.getValue("arguments").stringValue(),
                    bs.getValue("boost").stringValue(),
                    bs.getValue("boostSource").stringValue(),
                    bs.getValue("concern").stringValue(),
                    bs.getValue("cons").stringValue(),
                    bs.getValue("enviroment").stringValue(),
                    bs.getValue("input").stringValue(),
                    bs.getValue("keyword").stringValue(),
                    bs.getValue("measure").stringValue(),
                    bs.getValue("output").stringValue(),
                    bs.getValue("pros").stringValue(),
                    bs.getValue("rationale").stringValue(),
                    bs.getValue("source").stringValue(),
                    bs.getValue("state").stringValue(),
                    bs.getValue("valoration").stringValue()
                ));
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
