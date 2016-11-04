package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.others.Generic;
import net.unipiloto.wiki.web.others.Match;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class GeneralTransactions {

    public static String search(String pattern, int limit, int offset, RepositoryConnection connection) {
        String json = "{}";
        Repository repo = null;
        RepositoryConnection conn = null;

        if (connection != null) {
            conn = connection;
        } else {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try {
            String query = "SELECT DISTINCT ?x ?y ?z ?id ?individual WHERE {\n"
                    + "?x <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?individual .\n"
                    + "?individual <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#Class> .\n"
                    + "?x <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "?y <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#DatatypeProperty> .\n"
                    + "?x ?y ?z .\n"
                    + "FILTER NOT EXISTS {?x <http://www.semanticweb.org/sa#id> ?z} .\n"
                    + "FILTER regex(?z, \"" + pattern + "\", \"i\") }\n"
                    + "ORDER BY ?individual";
            if (limit != -1) {
                query += "LIMIT " + limit + " OFFSET " + offset;
            }
            TupleQuery tq = conn.prepareTupleQuery(query);

            TupleQueryResult rs = tq.evaluate();
            String classType = "";
            String id = "";
            List<Generic> data = new ArrayList();
            List<Match> matches = new ArrayList();
            while (rs.hasNext()) {
                BindingSet bs = rs.next();
                if (!id.equals("") && !bs.getValue("id").stringValue().equals(id)) {
                    data.add(new Generic(
                            id,
                            classType,
                            new ArrayList(matches)
                    ));
                    matches.clear();
                }
                matches.add(new Match(
                        bs.getValue("y").stringValue().split("#")[1],
                        bs.getValue("z").stringValue()
                ));
                classType = "/" + bs.getValue("individual").stringValue().split("#")[1] + "/";
                id = bs.getValue("id").stringValue();
            }
            data.add(new Generic(
                    id,
                    classType,
                    new ArrayList(matches)
            ));
            if (!data.isEmpty()) {
                json = JsonFactory.toJson(data);
            }
        } finally {
            if (connection == null) {
                conn.close();
            }
        }

        return json;
    }

    public static int searchCount(String pattern, RepositoryConnection connection) {
        Repository repo = null;
        RepositoryConnection conn = null;
        int i = 0;
        if (connection != null) {
            conn = connection;
        } else {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try {
            TupleQuery tq = conn.prepareTupleQuery(
                    "SELECT (COUNT(DISTINCT ?id) AS ?count) WHERE {\n"
                    + "?x <http://www.semanticweb.org/sa#id> ?id . \n"
                    + "?y <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#DatatypeProperty> . \n"
                    + "?x ?y ?z . \n"
                    + "FILTER NOT EXISTS {?x <http://www.semanticweb.org/sa#id> ?z} .\n"
                    + "FILTER NOT EXISTS {?x <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/2002/07/owl#NameIndividual>} .\n"
                    + "FILTER regex(?z, \"" + pattern + "\", \"i\")}"
            );

            TupleQueryResult rs = tq.evaluate();
            if (rs.hasNext()) {
                i = Integer.parseInt(rs.next().getValue("count").stringValue());
            }
        } finally {

        }
        return i;
    }
}
