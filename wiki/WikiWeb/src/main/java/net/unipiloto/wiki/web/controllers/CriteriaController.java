package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.CriteriaTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/criteria")
public class CriteriaController {

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public void insert(@RequestParam(value = "id") String id, @RequestParam(value = "keyword") String keyword, @RequestParam(value = "description") String description) {
        try {
            CriteriaTransaction.insert("criteria_" + id, keyword, description);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(@RequestParam(value = "id") String id, @RequestParam(value = "keyword") String keyword, @RequestParam(value = "description") String description) {
        try {
            CriteriaTransaction.update("criteria_" + id, keyword, description);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        try {
            CriteriaTransaction.delete("criteria_" + id);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

//    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
//    public String selectById(@RequestParam(value = "id") String id) {
//        return CriteriaTransaction.selectById("artifact_" + id);
//    }
//
//    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
//    public String selectAll() {
//        return CriteriaTransaction.selectAll();
//    }
}
