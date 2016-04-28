package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.AlternativeTransaction;

public class AlternativeService
{
    public static void createAlternative(int id, String description)
    {
        
        try
        {
            AlternativeTransaction.insert(id, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(AlternativeService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(AlternativeService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyAlternative(int id, String description) 
    {
        try
        {
            AlternativeTransaction.update(id, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(AlternativeService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(AlternativeService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeAlternative(int id) 
    {
        try
        {
            AlternativeTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(AlternativeService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(AlternativeService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
