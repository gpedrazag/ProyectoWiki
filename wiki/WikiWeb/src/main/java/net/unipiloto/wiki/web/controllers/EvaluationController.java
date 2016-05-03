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
@RequestMapping(value = "/evaluation")
public class EvaluationController {

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public void insert(
            @RequestParam(value = "pros") String pros,
            @RequestParam(value = "cons") String cons,
            @RequestParam(value = "valoration") String valoration) {
        try {
            EvaluationTransaction.insert(pros, cons, valoration);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(@RequestParam(value = "id") String id,
            @RequestParam(value = "pros") String pros,
            @RequestParam(value = "cons") String cons,
            @RequestParam(value = "valoration") String valoration) {
        try {
            EvaluationTransaction.update("evaluation_" + id, pros, cons, valoration);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        try {
            EvaluationTransaction.delete("evaluation_" + id);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return EvaluationTransaction.selectById("evaluation_" + id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return EvaluationTransaction.selectAll();
    }

}
