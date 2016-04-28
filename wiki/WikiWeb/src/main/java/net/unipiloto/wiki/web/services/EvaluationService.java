package net.unipiloto.wiki.web.services;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.entities.transactions.EvaluationTransaction;

public class EvaluationService
{
    public static void createEvaluation(int id, String pros, String cons, String valoration)
    {
        
        try
        {
            EvaluationTransaction.insert(id, pros, cons, valoration);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(EvaluationService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(EvaluationService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void modifyEvaluation(int id, String pros, String cons, String valoration) 
    {
        try
        {
            EvaluationTransaction.update(id, pros, cons, valoration);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(EvaluationService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(EvaluationService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void removeEvaluation(int id) 
    {
        try
        {
            EvaluationTransaction.delete(id);
        } 
        catch (IOException ex)
        {
            Logger.getLogger(EvaluationService.class.getName()).log(Level.SEVERE, null, ex);
        } 
        catch (URISyntaxException ex)
        {
            Logger.getLogger(EvaluationService.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
