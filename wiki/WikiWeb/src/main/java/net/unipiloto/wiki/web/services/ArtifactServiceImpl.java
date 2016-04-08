package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.ArtifactTransaction;

public class ArtifactServiceImpl
{
    public static void createArtifact(int id, String description)
    {
        
        try
        {
            ArtifactTransaction.insertArtifact(id, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ArtifactServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ArtifactServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
