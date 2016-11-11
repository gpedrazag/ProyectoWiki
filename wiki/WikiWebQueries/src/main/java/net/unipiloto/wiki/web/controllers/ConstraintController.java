package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.ConstraintTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/Constraint")
public class ConstraintController {

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public boolean update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "name", defaultValue = "-_-") String name,
            @RequestParam(value = "description", defaultValue = "-_-") String description,
            @RequestParam(value = "rationale", defaultValue = "-_-") String rationale,
            @RequestParam(value = "keyword", defaultValue = "-_-") String keyword) {
        boolean error = false;
        try {
            ConstraintTransaction.update(id, name, description, rationale, keyword);
        } catch (IOException | URISyntaxException ex) {
            error = true;
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return error;
    }
    
    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return ConstraintTransaction.selectById(id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return ConstraintTransaction.selectAll();
    }
}
