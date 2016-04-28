package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.ConcernTransaction;

public class ConcernService
{
    public static void createConcern(int id, String concern)
    {
        
        try
        {
            ConcernTransaction.insert(id, concern);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ConcernService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ConcernService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyConcern(int id, String concern) 
    {
        try
        {
            ConcernTransaction.update(id, concern);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ConcernService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ConcernService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeConcern(int id) 
    {
        try
        {
            ConcernTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ConcernService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ConcernService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
