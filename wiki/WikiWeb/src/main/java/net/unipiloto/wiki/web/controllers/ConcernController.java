package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.ConcernTransaction;
import org.boon.json.JsonFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/concern")
public class ConcernController {

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public void insert(
            @RequestParam(value = "concern") String concern,
            @RequestParam(value = "describedByQA") String describedByQA,
            @RequestParam(value = "describedByFR") String describedByFR) {
        try {
            ConcernTransaction.insert(
                    concern,
                    JsonFactory.fromJsonArray(describedByQA, String.class),
                    JsonFactory.fromJsonArray(describedByFR, String.class));
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "concern") String concern,
            @RequestParam(value = "describedByQA") String describedByQA,
            @RequestParam(value = "describedByFR") String describedByFR) {
        try {
            ConcernTransaction.update(
                    "concern_" + id,
                    concern,
                    JsonFactory.fromJsonArray(describedByQA, String.class),
                    JsonFactory.fromJsonArray(describedByFR, String.class));
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        try {
            ConcernTransaction.delete("concern_" + id);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return ConcernTransaction.selectById("concern_" + id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return ConcernTransaction.selectAll();
    }
}
