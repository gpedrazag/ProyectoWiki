package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.QualityAttributeTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/QualityAttributeStage")
public class QualityAttributeController {

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public boolean update(
            @RequestParam(value = "id") String id,
            @RequestParam(value = "name", defaultValue = "-_-") String name,
            @RequestParam(value = "description", defaultValue = "-_-") String description) {
        boolean error = false;
        try {
            QualityAttributeTransaction.update(
                    id,
                    name,
                    description);
        } catch (IOException | URISyntaxException ex) {
            error = true;
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return error;
    }
    
    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return QualityAttributeTransaction.selectById(id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return QualityAttributeTransaction.selectAll();
    }

}
