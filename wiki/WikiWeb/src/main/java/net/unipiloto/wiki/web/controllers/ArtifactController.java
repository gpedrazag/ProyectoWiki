package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import net.unipiloto.wiki.web.transactions.ArtifactTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/artifact")
public class ArtifactController {

    @RequestMapping(value = "/set", method = RequestMethod.POST)
    public void setArtifact(@RequestParam(value = "id") String id, @RequestParam(value = "description") String description) throws IOException, URISyntaxException {
        ArtifactTransaction.insert(id, description, null);
    }

    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public String getArtifact(@RequestParam(value = "id") String id) {
        return ArtifactTransaction.selectById("artifact_" + id);
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public String getAllArtifact() {
        return ArtifactTransaction.selectAll();
    }

}
