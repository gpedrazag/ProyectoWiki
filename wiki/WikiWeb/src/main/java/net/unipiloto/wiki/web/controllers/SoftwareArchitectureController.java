package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.SoftwareArchitectureTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/SoftwareArchitecture")
public class SoftwareArchitectureController {

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public void insert(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "relatedArtifacts") List<String> relatedArtifacts,
            @RequestParam(value = "decisionsRelated") List<String> decisionsRelated) {
        try {
            SoftwareArchitectureTransaction.insert(
                    name,
                    description,
                    relatedArtifacts,
                    decisionsRelated);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "relatedArtifacts") List<String> relatedArtifacts,
            @RequestParam(value = "decisionsRelated") List<String> decisionsRelated) {
        try {
            SoftwareArchitectureTransaction.update(
                    "SoftwareArchitecture_" + id,
                    name,
                    description,
                    relatedArtifacts,
                    decisionsRelated);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        try {
            SoftwareArchitectureTransaction.delete("SoftwareArchitecture_" + id);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return SoftwareArchitectureTransaction.selectById("artifact_" + id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return SoftwareArchitectureTransaction.selectAll();
    }
}
