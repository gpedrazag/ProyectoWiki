package net.unipiloto.wiki.web.services.impl;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import net.unipiloto.wiki.domain.entities.Artifact;
import net.unipiloto.wiki.domain.entities.Decision;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.services.ArtifactService;
import org.boon.json.JsonFactory;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

@Stateless(mappedName = "java:global/ArtifactService")
public class ArtifactServiceImpl
        implements ArtifactService
{

    @Override
    public String selectById(String id)
    {
        Artifact artifact = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id ."
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                artifact = new Artifact(
                        bs.getValue("id").stringValue(),
                        bs.getValue("description").stringValue()
                );
                artifact.setHaveDecisions(JsonFactory.fromJsonArray(
                        new DecisionServiceImpl().selectAllDecisionsByArtifactId(
                                artifact.getId(), conn), Decision.class));
            }
        }finally
        {
            conn.close();
        }
        return JsonFactory.toJson(artifact);
    }

    @Override
    public String selectAll()
    {
        List<Artifact> artifacts = new ArrayList();
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try
        {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?description WHERE {\n"
                    + "?artifact <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#Artifact> . "
                    + "?artifact <http://www.semanticweb.org/sa#id> ?id . "
                    + "?artifact <http://www.semanticweb.org/sa#description> ?description "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate(); //sdsdsdds;
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                artifacts.add(new Artifact(
                        bs.getValue("id").stringValue(),
                        bs.getValue("description").stringValue()
                ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(JsonFactory.fromJsonArray(
                        new DecisionServiceImpl().selectAllDecisionsByArtifactId(
                                artifacts.get(i).getId(), conn), Decision.class));
            }
        }finally
        {
            conn.close();
        }
        return JsonFactory.toJson(artifacts);
    }

    @Override
    public String selectByQAId(String id, RepositoryConnection connection)
    {
        List<Artifact> artifacts = new ArrayList();
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
                    "SELECT DISTINCT ?id ?description WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#triggerAn> ?d . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                artifacts.add(
                        new Artifact(
                                bs.getValue("id").stringValue(),
                                bs.getValue("description").stringValue()
                        ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(JsonFactory.fromJsonArray(
                        new DecisionServiceImpl().selectAllDecisionsByArtifactId(
                                artifacts.get(i).getId(), conn), Decision.class));
            }
            if(artifacts.isEmpty())
            {
                artifacts = null;
            }
        }finally
        {
            if(connection == null)
            {
                conn.close();
            }
        }
        return JsonFactory.toJson(artifacts);
    }

    @Override
    public String getAllArtifactsBySoftwareArchitectureId(String id,
            RepositoryConnection connection)
    {
        List<Artifact> artifacts = new ArrayList();
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
                    "SELECT DISTINCT ?id ?description WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#composeBy> ?d . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description "
                    + "}"
            );
            TupleQueryResult result = tq.evaluate();
            while(result.hasNext())
            {
                BindingSet bs = result.next();
                artifacts.add(
                        new Artifact(
                                bs.getValue("id").stringValue(),
                                bs.getValue("description").stringValue()
                        ));
                int i = artifacts.size() - 1;
                artifacts.get(i).setHaveDecisions(JsonFactory.fromJsonArray(
                        new DecisionServiceImpl().selectAllDecisionsByArtifactId(
                                artifacts.get(i).getId(), conn), Decision.class));
            }
            if(artifacts.isEmpty())
            {
                artifacts = null;
            }
        }finally
        {
            if(connection == null)
            {
                conn.close();
            }
        }
        return JsonFactory.toJson(artifacts);
    }
}
