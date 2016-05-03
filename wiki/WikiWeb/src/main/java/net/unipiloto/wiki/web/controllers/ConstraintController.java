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
@RequestMapping(value = "/constraint")
public class ConstraintController {

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public void insert(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "rationale") String rationale,
            @RequestParam(value = "keyword") String keyword) {
        try {
            ConstraintTransaction.insert(name, description, rationale, keyword);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "rationale") String rationale,
            @RequestParam(value = "keyword") String keyword) {
        try {
            ConstraintTransaction.update("constraint_" + id, name, description, rationale, keyword);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        try {
            ConstraintTransaction.delete("constraint_" + id);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return ConstraintTransaction.selectById("constraint_" + id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return ConstraintTransaction.selectAll();
    }
}
