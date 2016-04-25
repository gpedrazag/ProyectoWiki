package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.ArtifactTransaction;

public class ArtifactService
{
    public static void createArtifact(int id, String description)
    {
        
        try
        {
            ArtifactTransaction.insert(id, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ArtifactService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ArtifactService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyArfact(int id, String description) 
    {
        try
        {
            ArtifactTransaction.update(id, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ArtifactService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ArtifactService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeAmrfact(int id, String description) 
    {
        try
        {
            ArtifactTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ArtifactService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ArtifactService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
