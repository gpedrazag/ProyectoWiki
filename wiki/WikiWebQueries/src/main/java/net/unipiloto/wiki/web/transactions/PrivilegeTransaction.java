package net.unipiloto.wiki.web.transactions;

import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.Privilege;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class PrivilegeTransaction {

    public static List<Privilege> selectPrivilegesByUserId(String id) {
        List<Privilege> privileges = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, ""
                    +"SELECT DISTINCT ?pid ?privilege_type\n"
                    + "WHERE { \n"
                    + "	?user <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#User> .\n"
                    + "	?user <http://www.semanticweb.org/sa#havePrivilege> ?privilege .\n"
                    + "	?user <http://www.semanticweb.org/sa#id> \""+id+"\"^^<http://www.w3.org/2001/XMLSchema#string> .\n"
                    + "	?privilege <http://www.semanticweb.org/sa#id> ?pid .\n"
                    + "	?privilege <http://www.semanticweb.org/sa#privilege_type> ?privilege_type\n"
                    + "}\n"
                    + "ORDER BY ?pid"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext()) {
                BindingSet bs = result.next();
                privileges.add(new Privilege(
                        bs.getValue("pid").stringValue(), 
                        bs.getValue("privilege_type").stringValue()
                ));
            }
        } finally {
            conn.close();
        }
        return privileges;
    }
}
