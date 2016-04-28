package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.ConstraintTransaction;

public class ConstraintService
{
    public static void createConstraint(int id, String name, String description, String rationale, String keyword)
    {
        
        try
        {
            ConstraintTransaction.insert(id, name, description, rationale, keyword);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ConstraintService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ConstraintService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyConstraint(int id, String name, String description, String rationale, String keyword) 
    {
        try
        {
            ConstraintTransaction.update(id, name, description, rationale, keyword);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ConstraintService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ConstraintService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeConstraint(int id) 
    {
        try
        {
            ConstraintTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ConstraintService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ConstraintService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
