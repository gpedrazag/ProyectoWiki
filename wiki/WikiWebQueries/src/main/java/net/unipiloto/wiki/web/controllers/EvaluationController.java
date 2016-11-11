package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.EvaluationTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/Evaluation")
public class EvaluationController {

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public boolean update(@RequestParam(value = "id") String id,
            @RequestParam(value = "pros", defaultValue = "-_-") String pros,
            @RequestParam(value = "cons", defaultValue = "-_-") String cons,
            @RequestParam(value = "valoration", defaultValue = "-_-") String valoration) {
        boolean error = false;
        try {
            EvaluationTransaction.update(id, pros, cons, valoration);
        } catch (IOException | URISyntaxException ex) {
            error = true;
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return error;
    }
    
    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return EvaluationTransaction.selectById(id);
    }
    
    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return EvaluationTransaction.selectAll();
    }

}
