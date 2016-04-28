package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.SoftwareArchitectureTransaction;

public class SoftwareArchitectureService
{
    public static void createSoftwareArchitecture(int id, String name, String description)
    {
        
        try
        {
            SoftwareArchitectureTransaction.insert(id, name, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(SoftwareArchitectureService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(SoftwareArchitectureService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifySoftwareArchitecture(int id, String name, String description) 
    {
        try
        {
            SoftwareArchitectureTransaction.update(id, name, description);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(SoftwareArchitectureService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(SoftwareArchitectureService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeSoftwareArchitecture(int id) 
    {
        try
        {
            SoftwareArchitectureTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(SoftwareArchitectureService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(SoftwareArchitectureService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
