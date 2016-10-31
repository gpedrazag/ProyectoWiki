package net.unipiloto.wiki.web.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import net.unipiloto.wiki.web.entities.FunctionalRequeriment;
import net.unipiloto.wiki.web.others.OntologyTools;
import org.boon.json.JsonFactory;
import org.openrdf.model.IRI;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.model.vocabulary.RDF;
import org.openrdf.query.BindingSet;
import org.openrdf.query.QueryLanguage;
import org.openrdf.query.TupleQuery;
import org.openrdf.query.TupleQueryResult;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class FunctionalRequerimentTransaction {

    private static void insert(
            String id,
            String name,
            String actor,
            String description,
            String input,
            String output,
            String state,
            String utility,
            String expectative,
            String response,
            String context) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            ValueFactory factory = repo.getValueFactory();
            IRI subject = factory.createIRI("http://www.semanticweb.org/sa#" + id);
            IRI object = factory.createIRI("http://www.semanticweb.org/sa#FunctionalRequeriment");
            conn.begin();
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, RDF.TYPE, object);
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#id"), factory.createLiteral(id));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#name"), factory.createLiteral(name));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#actor"), factory.createLiteral(actor));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#description"), factory.createLiteral(description));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#input"), factory.createLiteral(input));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#output"), factory.createLiteral(output));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#state"), factory.createLiteral(state));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#stakeholder_utility"), factory.createLiteral(utility));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#expectative"), factory.createLiteral(expectative));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#response"), factory.createLiteral(response));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#context"), factory.createLiteral(context));
            conn.add(subject, factory.createIRI("http://www.semanticweb.org/sa#actor"), factory.createLiteral(actor));
            conn.commit();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }

    }

    public static void update(
            String id,
            String name,
            String actor,
            String description,
            String input,
            String output,
            String state,
            String utility,
            String expectative,
            String response,
            String context) throws IOException, URISyntaxException {
        FunctionalRequeriment fr = JsonFactory.fromJson(selectById(id), FunctionalRequeriment.class);
        delete(id);
        insert(
                id,
                name.equals("-_-")?fr.getName():name,
                actor.equals("-_-")?fr.getActor():actor,
                description.equals("-_-")?fr.getDescription():description,
                input.equals("-_-")?fr.getInput():input,
                output.equals("-_-")?fr.getOutput():output,
                state.equals("-_-")?fr.getState():state,
                utility.equals("-_-")?fr.getUtility():utility,
                expectative.equals("-_-")?fr.getExpectative():expectative,
                response.equals("-_-")?fr.getResponse():response,
                context.equals("-_-")?fr.getContext():context
        );

    }

    private static void delete(String id) throws IOException, URISyntaxException {
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            conn.prepareUpdate(
                    "DELETE { <http://www.semanticweb.org/sa#" + id + "> ?p ?d2 }\n"
                    + "WHERE { <http://www.semanticweb.org/sa#" + id + "> ?p ?d2 }"
            ).execute();
        } catch (Exception ex) {
            conn.rollback();
        } finally {
            conn.close();

        }
    }

    public static List<FunctionalRequeriment> selectFRByConcernId(String id, RepositoryConnection connection) {
        List<FunctionalRequeriment> frs = new ArrayList();
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
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output ?state ?utility ?expectative ?response ?context WHERE {"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#determinedBy> ?d . "
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name . "
                    + "?d <http://www.semanticweb.org/sa#actor> ?actor . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#input> ?input . "
                    + "?d <http://www.semanticweb.org/sa#output> ?output . "
                    + "?d <http://www.semanticweb.org/sa#state> ?state . "
                    + "?d <http://www.semanticweb.org/sa#stakeholder_utility> ?utility . "
                    + "?d <http://www.semanticweb.org/sa#expectative> ?expectative . "
                    + "?d <http://www.semanticweb.org/sa#response> ?response . "
                    + "?d <http://www.semanticweb.org/sa#context> ?context "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                frs.add(
                        new FunctionalRequeriment(
                                bs.getValue("id").stringValue(),
                                bs.getValue("name").stringValue(),
                                bs.getValue("actor").stringValue(),
                                bs.getValue("description").stringValue(),
                                bs.getValue("input").stringValue(),
                                bs.getValue("output").stringValue(),
                                bs.getValue("state").stringValue(),
                                bs.getValue("utility").stringValue(),
                                bs.getValue("expectative").stringValue(),
                                bs.getValue("response").stringValue(),
                                bs.getValue("context").stringValue()
                        ));
            }

            if (frs.isEmpty()) {
                frs = null;
            }
        } finally {
            if (connection == null) {
                conn.close();

            }
        }

        return frs;
    }

    public static String selectById(String id) {
        FunctionalRequeriment fr = null;
        Repository repo = OntologyTools.getInstance();
        repo.initialize();
        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output ?state ?utility ?expectative ?response ?context WHERE {\n"
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#id> ?id . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#name> ?name . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#actor> ?actor . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#description> ?description . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#input> ?input . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#output> ?output . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#state> ?state . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#stakeholder_utility> ?utility . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#expectative> ?expectative . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#response> ?response . "
                    + "<http://www.semanticweb.org/sa#" + id + "> <http://www.semanticweb.org/sa#context> ?context "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                fr = new FunctionalRequeriment(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("actor").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("input").stringValue(),
                        bs.getValue("output").stringValue(),
                        bs.getValue("state").stringValue(),
                        bs.getValue("utility").stringValue(),
                        bs.getValue("expectative").stringValue(),
                        bs.getValue("response").stringValue(),
                        bs.getValue("context").stringValue()
                );
            }
        } finally {
            conn.close();
        }

        return JsonFactory.toJson(fr);
    }

    public static String selectAll() {
        List<FunctionalRequeriment> frs = new ArrayList();

        Repository repo = null;
        repo = OntologyTools.getInstance();
        repo.initialize();

        RepositoryConnection conn = repo.getConnection();
        try {
            TupleQuery tq = conn.prepareTupleQuery(QueryLanguage.SPARQL,
                    "SELECT DISTINCT ?id ?name ?actor ?description ?input ?output ?state ?utility ?expectative ?response ?context  WHERE {"
                    + "?d <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticweb.org/sa#FunctionalRequeriment> . "
                    + "?d <http://www.semanticweb.org/sa#id> ?id . "
                    + "?d <http://www.semanticweb.org/sa#name> ?name . "
                    + "?d <http://www.semanticweb.org/sa#actor> ?actor . "
                    + "?d <http://www.semanticweb.org/sa#description> ?description . "
                    + "?d <http://www.semanticweb.org/sa#input> ?input . "
                    + "?d <http://www.semanticweb.org/sa#output> ?output . "
                    + "?d <http://www.semanticweb.org/sa#state> ?state . "
                    + "?d <http://www.semanticweb.org/sa#stakeholder_utility> ?utility . "
                    + "?d <http://www.semanticweb.org/sa#expectative> ?expectative . "
                    + "?d <http://www.semanticweb.org/sa#response> ?response . "
                    + "?d <http://www.semanticweb.org/sa#context> ?context "
                    + "} "
                    + "ORDER BY ?id"
            );
            TupleQueryResult result = tq.evaluate();
            while (result.hasNext()) {
                BindingSet bs = result.next();
                frs.add(new FunctionalRequeriment(
                        bs.getValue("id").stringValue(),
                        bs.getValue("name").stringValue(),
                        bs.getValue("actor").stringValue(),
                        bs.getValue("description").stringValue(),
                        bs.getValue("input").stringValue(),
                        bs.getValue("output").stringValue(),
                        bs.getValue("state").stringValue(),
                        bs.getValue("utility").stringValue(),
                        bs.getValue("expectative").stringValue(),
                        bs.getValue("response").stringValue(),
                        bs.getValue("context").stringValue()
                ));
            }

            if (frs.isEmpty()) {
                frs = null;
            }
        } finally {
            conn.close();

        }

        return JsonFactory.toJson(frs);
    }
    
    public static void deleteContent(String content) {
        List<FunctionalRequeriment> l = JsonFactory.fromJsonArray(selectAll(), FunctionalRequeriment.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getActor().contains(content)) {
                    a.setActor(a.getActor().replace(content, ""));
                    i++;
                }
                if (a.getContext().contains(content)) {
                    a.setContext(a.getContext().replace(content, ""));
                    i++;
                }
                if (a.getDescription().contains(content)) {
                    a.setDescription(a.getDescription().replace(content, ""));
                    i++;
                }
                if (a.getExpectative().contains(content)) {
                    a.setExpectative(a.getExpectative().replace(content, ""));
                    i++;
                }
                if (a.getInput().contains(content)) {
                    a.setInput(a.getInput().replace(content, ""));
                    i++;
                }
                if (a.getName().contains(content)) {
                    a.setName(a.getName().replace(content, ""));
                    i++;
                }
                if (a.getOutput().contains(content)) {
                    a.setOutput(a.getOutput().replace(content, ""));
                    i++;
                }
                if (a.getResponse().contains(content)) {
                    a.setResponse(a.getResponse().replace(content, ""));
                    i++;
                }
                if (a.getState().contains(content)) {
                    a.setState(a.getState().replace(content, ""));
                    i++;
                }
                if (a.getUtility().contains(content)) {
                    a.setUtility(a.getUtility().replace(content, ""));
                    i++;
                }
                
                if (i > 0) {
                    update(
                        a.getId(), 
                        a.getName(), 
                        a.getActor(), 
                        a.getDescription(), 
                        a.getInput(), 
                        a.getOutput(), 
                        a.getState(), 
                        a.getUtility(), 
                        a.getExpectative(), 
                        a.getResponse(), 
                        a.getContext()
                    );
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

    public static void updateContent(String oc, String nc) {
        List<FunctionalRequeriment> l = JsonFactory.fromJsonArray(selectAll(), FunctionalRequeriment.class);
        l.stream().forEach((a) -> {
            try {
                int i = 0;
                if (a.getActor().contains(oc)) {
                    a.setActor(a.getActor().replace(oc, nc));
                    i++;
                }
                if (a.getContext().contains(oc)) {
                    a.setContext(a.getContext().replace(oc, nc));
                    i++;
                }
                if (a.getDescription().contains(oc)) {
                    a.setDescription(a.getDescription().replace(oc, nc));
                    i++;
                }
                if (a.getExpectative().contains(oc)) {
                    a.setExpectative(a.getExpectative().replace(oc, nc));
                    i++;
                }
                if (a.getInput().contains(oc)) {
                    a.setInput(a.getInput().replace(oc, nc));
                    i++;
                }
                if (a.getName().contains(oc)) {
                    a.setName(a.getName().replace(oc, nc));
                    i++;
                }
                if (a.getOutput().contains(oc)) {
                    a.setOutput(a.getOutput().replace(oc, nc));
                    i++;
                }
                if (a.getResponse().contains(oc)) {
                    a.setResponse(a.getResponse().replace(oc, nc));
                    i++;
                }
                if (a.getState().contains(oc)) {
                    a.setState(a.getState().replace(oc, nc));
                    i++;
                }
                if (a.getUtility().contains(oc)) {
                    a.setUtility(a.getUtility().replace(oc, nc));
                    i++;
                }
                
                if (i > 0) {
                    update(
                        a.getId(), 
                        a.getName(), 
                        a.getActor(), 
                        a.getDescription(), 
                        a.getInput(), 
                        a.getOutput(), 
                        a.getState(), 
                        a.getUtility(), 
                        a.getExpectative(), 
                        a.getResponse(), 
                        a.getContext()
                    );
                }
            } catch (IOException | URISyntaxException ex) {

            }
        });
    }

}
