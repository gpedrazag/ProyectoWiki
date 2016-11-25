package net.unipiloto.wiki.web.controllers;

import java.util.List;
import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.transactions.GeneralTransactions;
import org.boon.json.JsonFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/search")
public class SearchController {

    @RequestMapping(value = "patternSearch", method = RequestMethod.POST)
    public String generalSearch(
            @RequestParam(value = "pattern") String pattern,
            @RequestParam(value = "limit") int limit,
            @RequestParam(value = "offset") int offset) {
        return GeneralTransactions.search(pattern, limit, offset, OntologyTools.getInstance().getConnection());
    }

    @RequestMapping(value = "patternSearchCount", method = RequestMethod.POST)
    public int generalSearchCount(@RequestParam(value = "pattern") String pattern) {
        return GeneralTransactions.searchCount(pattern, OntologyTools.getInstance().getConnection());
    }

    @RequestMapping(value = "getDPForClass", method = RequestMethod.POST)
    public String getDPForClass(@RequestParam(value = "classType") String classType) {
        return GeneralTransactions.getDPForClass(classType);
    }

    @RequestMapping(value = "getClassByIndvID", method = RequestMethod.POST)
    public String getClassByIndvID(@RequestParam(value = "id") String id) {
        return GeneralTransactions.getClassByIndvID(id);
    }

    @RequestMapping(value = "getAllClass", method = RequestMethod.POST)
    public String getAllClass(@RequestParam(value = "filter") String filter) {
        return JsonFactory.toJson(GeneralTransactions.getAllClassIndividuals(JsonFactory.fromJsonArray(filter, String.class)));
    }

}
