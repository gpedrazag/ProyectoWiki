package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Decision;
import net.unipiloto.wiki.domain.entities.Responsible;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.ResponsibleService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/ResponsibleService")
public class ResponsibleServiceImpl
        implements ResponsibleService
{

    @Override
    public String selectAllResponsiblesByDecisionId(String id,
            RepositoryConnection connection)
    {
        List<Responsible> responsibles = new ArrayList();
        Repository repo = null;
        RepositoryConnection conn = null;
        if(connection != null)
        {
            conn = connection;
        }else
        {
            repo = OntologyTools.getInstance();
            repo.initialize();
            conn = repo.getConnection();
        }
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                responsibles.add(
                        new Responsible(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue()
                        ));
            }
            if(responsibles.isEmpty())
            {
                responsibles = null;
            }
        }finally
        {
            if(connection == null)
            {
                conn.close();
            }
        }
        return JsonFactory.toJson(responsibles);
    }

    @Override
    public String selectById(String id)
    {
        Responsible responsible = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                responsible = new Responsible(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue()
                );
            }
            responsible.setDecisions(JsonFactory.fromJsonArray(
                    new DecisionServiceImpl().selectAllDecisionsByResponsibleId(
                            id, conn), Decision.class));
        }finally
        {
            conn.close();
        }
        return JsonFactory.toJson(responsible);
    }

    @Override
    public String selectAll()
    {
        List<Responsible> responsibles = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name WHERE {\n"
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Responsible> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                responsibles.add(new Responsible(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue()
                ));
                int i = responsibles.size() - 1;
                responsibles.get(i).setDecisions(JsonFactory.fromJsonArray(
                        new DecisionServiceImpl().selectAllDecisionsByResponsibleId(
                                responsibles.get(i).getId(), conn),
                        Decision.class));
            }
        }finally
        {
            conn.close();
        }
        return JsonFactory.toJson(responsibles);
    }
}
