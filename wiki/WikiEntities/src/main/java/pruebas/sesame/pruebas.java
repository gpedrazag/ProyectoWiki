package pruebas.sesame;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import org.openrdf.model.IRI;
import org.openrdf.model.Model;
import org.openrdf.model.Statement;
import org.openrdf.model.ValueFactory;
import org.openrdf.model.impl.LinkedHashModel;
import org.openrdf.model.impl.SimpleValueFactory;
import org.openrdf.model.vocabulary.OWL;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.sail.SailRepository;
import org.openrdf.repository.util.Connections;
import org.openrdf.rio.RDFFormat;
import org.openrdf.rio.RDFWriter;
import org.openrdf.rio.Rio;
import org.openrdf.sail.nativerdf.NativeStore;

public class pruebas
{
    private static Repository repo;
    private static RepositoryConnection conn;
    
    public static void main(String[] args) throws IOException
    {
        String ontDir = "C:\\Users\\Gabriel\\Desktop\\ontologia\\ontology.owl";
        String nativeDir = "C:\\Users\\Gabriel\\Desktop\\native_dir";
        repo = new SailRepository(new NativeStore(new File(nativeDir)));
        repo.initialize();
        conn = repo.getConnection();
        FileOutputStream out = new FileOutputStream(ontDir);
        RDFWriter writer = Rio.createWriter(RDFFormat.RDFXML, out);
        Model model = new LinkedHashModel();
        ValueFactory fact = SimpleValueFactory.getInstance();
        IRI newArtifact = fact.createIRI("http://www.semanticweb.org/sa#artefactoNuevo");
        IRI artifact = fact.createIRI("http://www.semanticweb.org/sa#Artifact");
        Statement newStatement = fact.createStatement(newArtifact, OWL.INDIVIDUAL, artifact);
        //model.add(newArtifact, OWL.INDIVIDUAL, artifact);
        model.add(newStatement);
        writer.startRDF();
        for(Statement st : model)
        {
            writer.handleStatement(st);
        }
        writer.endRDF();
    }
}
