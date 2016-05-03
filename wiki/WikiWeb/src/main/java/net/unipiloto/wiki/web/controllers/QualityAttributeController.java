package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.QualityAttributeTransaction;
import org.boon.json.JsonFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/qualityAttribute")
public class QualityAttributeController {

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public void insert(
            @RequestParam(value = "actor") String actor,
            @RequestParam(value = "enviroment") String enviroment,
            @RequestParam(value = "measure") String measure,
            @RequestParam(value = "boost") String boost,
            @RequestParam(value = "boostSource") String boostSource,
            @RequestParam(value = "triggerArtifacts") String triggerArtifacts) {
        try {
            QualityAttributeTransaction.insert(
                    actor,
                    enviroment,
                    measure,
                    boost,
                    boostSource,
                    JsonFactory.fromJsonArray(triggerArtifacts, String.class));
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "actor") String actor,
            @RequestParam(value = "enviroment") String enviroment,
            @RequestParam(value = "measure") String measure,
            @RequestParam(value = "boost") String boost,
            @RequestParam(value = "boostSource") String boostSource,
            @RequestParam(value = "triggerArtifacts") String triggerArtifacts) {
        try {
            QualityAttributeTransaction.update(
                    "qualityAttribute_" + id,
                    actor,
                    enviroment,
                    measure,
                    boost,
                    boostSource,
                    JsonFactory.fromJsonArray(triggerArtifacts, String.class));
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        try {
            QualityAttributeTransaction.delete("qualityAttribute_" + id);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return QualityAttributeTransaction.selectById("qualityAttribute_" + id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return QualityAttributeTransaction.selectAll();
    }

}
