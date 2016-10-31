package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.DecisionTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/Decision")
public class DecisionController {

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "arguments") String arguments,
            @RequestParam(value = "state") String state
    ) {
        try {
            DecisionTransaction.update(
                    id,
                    name,
                    arguments,
                    state
            );
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return DecisionTransaction.selectById(id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return DecisionTransaction.selectAll();
    }
    
    @RequestMapping(value = "/haveSolution", method = RequestMethod.POST)
    public String haveSolution(@RequestParam(value = "id") String id) {
        return DecisionTransaction.haveSolution(id);
    }
}
