package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.AssumptionTransaction;

public class AssumptionService
{
    public static void createAssumption(int id, String description, String source)
    {
        
        try
        {
            AssumptionTransaction.insert(id, description, source);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(AssumptionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(AssumptionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyAssumption(int id, String description, String source) 
    {
        try
        {
            AssumptionTransaction.update(id, description, source);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(AssumptionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(AssumptionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeAssumption(int id) 
    {
        try
        {
            AssumptionTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(AssumptionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(AssumptionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
