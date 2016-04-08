package net.unipiloto.wiki.web.entities.transactions;

import java.io.IOException;
import java.net.URISyntaxException;
import net.unipiloto.wiki.web.services.OntologyGeneralService;
import org.openrdf.model.IRI;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.model.vocabulary.RDF;
import org.openrdf.query.QueryLanguage;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;

public class ArtifactTransaction
{
    public static void insertArtifact(int id, String description) throws IOException, URISyntaxException
    {
        Repository repo = OntologyGeneralService.initRepository();
        if(!repo.isInitialized())
            repo.initialize();
        ValueFactory factory = repo.getValueFactory();
        IRI subject = factory.createIRI("http://www.semanticweb.org/sa#artifact_"+id);
        IRI object = factory.createIRI("http://www.semanticweb.org/sa#Artifact");
        RepositoryConnection conn = OntologyGeneralService.getConnection(repo);
        try
        {
            conn.add(subject, RDF.TYPE, OWL.INDIVIDUAL);
            conn.add(subject, OWL.INDIVIDUAL, object);
            String sparql = 
                "INSERT {\n"+
                "   <http://www.semanticweb.org/sa#artifact_"+id+">\n"+
                "   <http://www.semanticweb.org/sa#id>\n"+
                ""+description+"\n"+
                "}\n"+
                "WHERE{}";
            conn.prepareUpdate(QueryLanguage.SPARQL, sparql);
        }
        finally
        {
            conn.close();
        }
        
    }
}
