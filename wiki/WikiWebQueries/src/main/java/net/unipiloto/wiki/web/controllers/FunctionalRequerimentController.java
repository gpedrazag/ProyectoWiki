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
    public void update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "actor") String actor,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "input") String input,
            @RequestParam(value = "output") String output,
            @RequestParam(value = "state") String state,
            @RequestParam(value = "utility") String utility,
            @RequestParam(value = "expectative") String expectative,
            @RequestParam(value = "response") String response,
            @RequestParam(value = "context") String context) {
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
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
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
