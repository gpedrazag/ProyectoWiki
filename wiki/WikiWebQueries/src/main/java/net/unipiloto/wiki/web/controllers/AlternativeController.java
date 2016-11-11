package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.AlternativeTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/Alternative")
public class AlternativeController {

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public boolean update(
            @RequestParam(value = "id", defaultValue = "-_-") String id,
            @RequestParam(value = "rationale", defaultValue = "-_-") String rationale,
            @RequestParam(value = "description", defaultValue = "-_-") String description) {
        boolean error = false;
        try {
            AlternativeTransaction.update(
                    id,
                    rationale,
                    description);
        } catch (IOException | URISyntaxException ex) {
            error = true;
            Logger.getLogger(ArtifactController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return error;
    }
    
    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return AlternativeTransaction.selectById(id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return AlternativeTransaction.selectAll();
    }

}
