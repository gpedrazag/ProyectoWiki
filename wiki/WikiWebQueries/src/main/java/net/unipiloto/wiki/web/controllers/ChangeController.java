package net.unipiloto.wiki.web.controllers;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.unipiloto.wiki.web.transactions.ChangesTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/change")
public class ChangeController {

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public String insert(
            @RequestParam(value = "pastContent") String pastContent,
            @RequestParam(value = "newContent") String newContent,
            @RequestParam(value = "indvId") String indvId,
            @RequestParam(value = "userID") String userID,
            @RequestParam(value = "date") String date,
            @RequestParam(value = "dpChanged") String dpChanged) {
        String id = "";
        try {
            id = ChangesTransaction.insert(
                    pastContent,
                    newContent,
                    indvId,
                    userID,
                    Long.parseLong(date),
                    dpChanged,
                    true
            );
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ChangeController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return id;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void delete(@RequestParam(value = "id") String id) {
        ChangesTransaction.delete(id);
    }

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return ChangesTransaction.selectById(id);
    }

    @RequestMapping(value = "/selectAllChangesByClass", method = RequestMethod.POST)
    public String selectAllChangesByClass(@RequestParam(value = "classType") String classType) {
        return ChangesTransaction.selectAllChangesByClass(classType);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return ChangesTransaction.selectAll();
    }

    @RequestMapping(value = "/selectActualChange", method = RequestMethod.POST)
    public String selectActualChange(@RequestParam(value = "id") String id, @RequestParam(value = "dp") String dp) {
        return ChangesTransaction.selectActualChange(id, dp);
    }

    @RequestMapping(value = "/selectAllChangesByClassAndDp", method = RequestMethod.POST)
    public String selectAllChangesByClassAndDp(@RequestParam(value = "dp") String dp, @RequestParam(value = "classType") String classType) {
        return ChangesTransaction.selectAllChangesByClassAndDp(classType, dp);
    }

    @RequestMapping(value = "/updateChange", method = RequestMethod.POST)
    public boolean updateChange(@RequestParam(value = "id") String id, @RequestParam(value = "indvID") String indvID, @RequestParam(value = "dp") String dp) {
        boolean error = false;
        try {
            ChangesTransaction.updateChange(id, indvID, dp);
        } catch(Exception ex) {
            error = true;
        }
        return error;
    }
}
