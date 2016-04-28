package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.SolutionTransaction;

public class SolutionService
{
    public static void createSolution(int id, String rationale)
    {
        
        try
        {
            SolutionTransaction.insert(id, rationale);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(SolutionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(SolutionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifySolution(int id, String rationale) 
    {
        try
        {
            SolutionTransaction.update(id, rationale);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(SolutionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(SolutionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeSolution(int id) 
    {
        try
        {
            SolutionTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(SolutionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(SolutionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
