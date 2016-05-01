package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.DecisionTransaction;
import org.boon.json.JsonFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/decision")
public class DecisionController {

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public void insert(@RequestParam(value = "id") String id, @RequestParam(value = "name") String name, @RequestParam(value = "arguments") String arguments, @RequestParam(value = "state") String state) {
        try {
            DecisionTransaction.insert("decision_" + id, name, arguments, state);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(@RequestParam(value = "id") String id, @RequestParam(value = "name") String name, @RequestParam(value = "arguments") String arguments, @RequestParam(value = "state") String state) {
        try {
            DecisionTransaction.update("decision_" + id, name, arguments, state);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        try {
            DecisionTransaction.delete("decision_" + id);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return JsonFactory.toJson(DecisionTransaction.selectById("decision_" + id));
    }

//    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
//    public String selectAll() {
//        return DecisionTransaction.selectAll());
//    }
}
