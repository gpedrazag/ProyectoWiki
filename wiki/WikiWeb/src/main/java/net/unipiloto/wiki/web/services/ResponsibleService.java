package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.ResponsibleTransaction;

public class ResponsibleService
{
    public static void createResponsible(int id, String name)
    {
        
        try
        {
            ResponsibleTransaction.insert(id, name);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ResponsibleService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ResponsibleService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyResponsible(int id, String name) 
    {
        try
        {
            ResponsibleTransaction.update(id, name);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ResponsibleService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ResponsibleService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeResponsible(int id) 
    {
        try
        {
            ResponsibleTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(ResponsibleService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(ResponsibleService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
