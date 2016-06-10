package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Alternative;
import net.unipiloto.wiki.domain.entities.Evaluation;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.AlternativeService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/AlternativeService")
public class AlternativeServiceImpl
        implements AlternativeService
{

    @Override
    public String selectAllAlternativesByDecisionId(String id,
            RepositoryConnection connection)
    {
        List<Alternative> concerns = new ArrayList();
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
                    "SELECT DISTINCT ?id ?description ?name WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#decisionHave> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                concerns.add(
                        new Alternative(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue(),
                                bs.getValue("description").stringValue()
                        ));
            }
            if(concerns.isEmpty())
            {
                concerns = null;
            }
        }finally
        {
            if(connection == null)
            {
                conn.close();
            }
        }
        return JsonFactory.toJson(concerns);
    }

    @Override
    public String selectById(String id)
    {
        Alternative alternative = null;
        Repository repo = OntologyTools.getInstance();;
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?name WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id ."
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                alternative = new Alternative(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue()
                );
            }
            alternative.setHaveEvaluation(JsonFactory.fromJson(
                    new EvaluationServiceImpl().selectByAlternativeId(id, conn),
                    Evaluation.class));
        }finally
        {
            conn.close();
        }
        return JsonFactory.toJson(alternative);
    }

    @Override
    public String selectAll()
    {
        List<Alternative> alternatives = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description ?name WHERE {\n"
                    + "?alternative <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Alternative> . "
                    + "?alternative <http://www.semanticweb.org/sa#id> ?id ."
                    + "?alternative <http://www.semanticweb.org/sa#description> ?description . "
                    + "?alternative <http://www.semanticweb.org/sa#name> ?name "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                alternatives.add(new Alternative(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("description").stringValue()
                ));
                int i = alternatives.size() - 1;
                alternatives.get(i).setHaveEvaluation(
                        JsonFactory.fromJson(new EvaluationServiceImpl().selectByAlternativeId(
                                alternatives.get(i).getId(), conn),Evaluation.class));
            }
        }finally
        {
            conn.close();
        }
        return JsonFactory.toJson(alternatives);
    }
}
