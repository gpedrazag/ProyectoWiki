package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.ViewTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/Views")
public class ViewController {

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String getAllViews() {
        return ViewTransaction.selectAll();
    }

    @RequestMapping(value = "/selectByType", method = RequestMethod.POST)
    public String getByType(@RequestParam(value = "type") String type) {
        return ViewTransaction.selectByType(type);
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String getById(@RequestParam(value = "id") String id) {
        return ViewTransaction.selectById(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public boolean update(
            @RequestParam(value = "id", defaultValue = "-_-") String id,
            @RequestParam(value = "name", defaultValue = "-_-") String name,
            @RequestParam(value = "content", defaultValue = "-_-") String content
    ) {
        boolean error = false;
        try {
            ViewTransaction.update(id, name, content);
        } catch (IOException | URISyntaxException ex) {
            error = true;
        }
        return error;
    }
}
