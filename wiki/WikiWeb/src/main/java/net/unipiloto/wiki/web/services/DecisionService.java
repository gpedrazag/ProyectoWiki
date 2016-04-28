package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.DecisionTransaction;

public class DecisionService
{
    public static void createDecision(int id, String name, String arguments, String state)
    {
        
        try
        {
            DecisionTransaction.insert(id, name, arguments, state);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(DecisionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(DecisionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyDecision(int id, String name, String arguments, String state) 
    {
        try
        {
            DecisionTransaction.update(id, name, arguments, state);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(DecisionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(DecisionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeDecision(int id) 
    {
        try
        {
            DecisionTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(DecisionService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(DecisionService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
