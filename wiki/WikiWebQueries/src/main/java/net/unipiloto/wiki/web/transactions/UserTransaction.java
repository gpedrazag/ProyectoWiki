package net.unipiloto.wiki.web.transactions;

import net.unipiloto.wiki.web.entities.User;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class UserTransaction {

    public static String selectById(String id) {
        User user = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, ""
                    + "SELECT DISTINCT ?id ?first_name ?last_name ?email ?login ?password\n"
                    + "WHERE { \n"
                    + "	?user <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#User> .\n"
                    + "	?user <http://www.semanticweb.org/sa#id> \""+id+"\"^^<http://www.w3.org/2001/XMLSchema#string> .\n"
                    + "	?user <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "	?user <http://www.semanticweb.org/sa#first_name> ?first_name .\n"
                    + "	?user <http://www.semanticweb.org/sa#last_name> ?last_name .\n"
                    + "	?user <http://www.semanticweb.org/sa#email> ?email .\n"
                    + "	?user <http://www.semanticweb.org/sa#login> ?login .\n"
                    + "	?user <http://www.semanticweb.org/sa#password> ?password .\n"
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                user = new User(
                        bs.getValue("id").stringValue(),
                        bs.getValue("first_name").stringValue(),
                        bs.getValue("last_name").stringValue(),
                        bs.getValue("email").stringValue(),
                        bs.getValue("login").stringValue(),
                        bs.getValue("password").stringValue()
                );
                user.setHavePrivileges(PrivilegeTransaction.selectPrivilegesByUserId(user.getId()));
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(user);
    }

    public static User selectByLoginAndPassword(String login, String password) {
        User user = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL, ""
                    + "SELECT DISTINCT ?id ?first_name ?last_name ?email\n"
                    + "WHERE { \n"
                    + "	?user <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#User> .\n"
                    + "	?user <http://www.semanticweb.org/sa#login> \"" + login + "\"^^<http://www.w3.org/2001/XMLSchema#string> .\n"
                    + "	?user <http://www.semanticweb.org/sa#password> \"" + password + "\"^^<http://www.w3.org/2001/XMLSchema#string> .\n"
                    + "	?user <http://www.semanticweb.org/sa#id> ?id .\n"
                    + "	?user <http://www.semanticweb.org/sa#first_name> ?first_name . \n"
                    + "	?user <http://www.semanticweb.org/sa#last_name> ?last_name .\n"
                    + "	?user <http://www.semanticweb.org/sa#email> ?email .\n"
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                user = new User(
                        bs.getValue("id").stringValue(),
                        bs.getValue("first_name").stringValue(),
                        bs.getValue("last_name").stringValue(),
                        bs.getValue("email").stringValue(),
                        login,
                        password
                );
                user.setHavePrivileges(PrivilegeTransaction.selectPrivilegesByUserId(user.getId()));
            }
        } finally {
            conn.close();
        }

        return user;
    }

}
