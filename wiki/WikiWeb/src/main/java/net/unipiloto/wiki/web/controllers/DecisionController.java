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
    public void insert(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "argument") String arguments,
            @RequestParam(value = "state") String state,
            @RequestParam(value = "mayHaveConstraints") String mayHaveConstraints,
            @RequestParam(value = "haveCriterias") String haveCriterias,
            @RequestParam(value = "mayHaveAssumptions") String mayHaveAssumptions,
            @RequestParam(value = "haveAsTriggerConcerns") String haveAsTriggerConcerns,
            @RequestParam(value = "haveResponsibles") String haveResponsibles,
            @RequestParam(value = "haveAlternatives") String haveAlternatives,
            @RequestParam(value = "haveSol") String haveSolution) {
        try {
            DecisionTransaction.insert(
                    null,
                    name,
                    arguments,
                    state,
                    JsonFactory.fromJsonArray(mayHaveConstraints, String.class),
                    JsonFactory.fromJsonArray(haveCriterias, String.class),
                    JsonFactory.fromJsonArray(mayHaveAssumptions, String.class),
                    JsonFactory.fromJsonArray(haveAsTriggerConcerns, String.class),
                    JsonFactory.fromJsonArray(haveResponsibles, String.class),
                    JsonFactory.fromJsonArray(haveAlternatives, String.class),
                    haveSolution);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "argument") String arguments,
            @RequestParam(value = "state") String state,
            @RequestParam(value = "mayHaveConstraints") String mayHaveConstraints,
            @RequestParam(value = "haveCriterias") String haveCriterias,
            @RequestParam(value = "mayHaveAssumptions") String mayHaveAssumptions,
            @RequestParam(value = "haveAsTriggerConcerns") String haveAsTriggerConcerns,
            @RequestParam(value = "haveResponsibles") String haveResponsibles,
            @RequestParam(value = "haveAlternatives") String haveAlternatives,
            @RequestParam(value = "haveSolution") String haveSolution
    ) {
        try {
            DecisionTransaction.update(
                    id,
                    name,
                    arguments,
                    state,
                    JsonFactory.fromJsonArray(mayHaveConstraints, String.class),
                    JsonFactory.fromJsonArray(haveCriterias, String.class),
                    JsonFactory.fromJsonArray(mayHaveAssumptions, String.class),
                    JsonFactory.fromJsonArray(haveAsTriggerConcerns, String.class),
                    JsonFactory.fromJsonArray(haveResponsibles, String.class),
                    JsonFactory.fromJsonArray(haveAlternatives, String.class),
                    haveSolution
            );
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        try {
            DecisionTransaction.delete(id);
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
}
