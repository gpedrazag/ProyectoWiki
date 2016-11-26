package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class ViewTransaction {

    public static String selectAll() {
        List<String> list = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT ?type\n"
                    + "WHERE { \n"
                    + "	?type <http://www.w3.org/2000/01/rdf-schema#subClassOf> <http://www.semanticweb.org/sa#Views>\n"
                    + "} ORDER BY ?type"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                list.add(bs.getValue("type").toString().split("#")[1]);
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(list);

    }

}
