package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.FunctionalRequerimentTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/FunctionalRequeriment")
public class FunctionalRequerimentController {

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public boolean update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "name", defaultValue = "-_-") String name,
            @RequestParam(value = "actor", defaultValue = "-_-") String actor,
            @RequestParam(value = "description", defaultValue = "-_-") String description,
            @RequestParam(value = "input", defaultValue = "-_-") String input,
            @RequestParam(value = "output", defaultValue = "-_-") String output,
            @RequestParam(value = "state", defaultValue = "-_-") String state,
            @RequestParam(value = "utility", defaultValue = "-_-") String utility,
            @RequestParam(value = "expectative", defaultValue = "-_-") String expectative,
            @RequestParam(value = "response", defaultValue = "-_-") String response,
            @RequestParam(value = "context", defaultValue = "-_-") String context) {
        boolean error = false;
        try {
            FunctionalRequerimentTransaction.update(
                    id, 
                    name, 
                    actor, 
                    description, 
                    input, 
                    output, 
                    state, 
                    utility, 
                    expectative, 
                    response, 
                    context);
        } catch (IOException | URISyntaxException ex) {
            error = true;
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return error;
    }
    
    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return FunctionalRequerimentTransaction.selectById(id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return FunctionalRequerimentTransaction.selectAll();
    }

}
