package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.CriteriaTransaction;

public class CriteriaService
{
    public static void createCriteria(int id, String keyword, String description)
    {
        
        try
        {
            CriteriaTransaction.insert(id, keyword, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(CriteriaService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(CriteriaService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyCriteria(int id, String keyword, String description) 
    {
        try
        {
            CriteriaTransaction.update(id, keyword, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(CriteriaService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(CriteriaService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeCriteria(int id) 
    {
        try
        {
            CriteriaTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(CriteriaService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(CriteriaService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
