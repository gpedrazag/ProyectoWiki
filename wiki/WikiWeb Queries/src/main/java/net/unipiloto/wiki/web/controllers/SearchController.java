package net.unipiloto.wiki.web.controllers;

import net.unipiloto.wiki.web.others.OntologyTools;
import net.unipiloto.wiki.web.transactions.GeneralTransactions;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/search")
public class SearchController
{
    @RequestMapping(value = "patternSearch", method = RequestMethod.POST)
    public String generalSearch(
        @RequestParam(value = "pattern") String pattern,
        @RequestParam(value = "limit") int limit,
        @RequestParam(value = "offset") int offset)
    {
        return GeneralTransactions.search(pattern,limit, offset, OntologyTools.getInstance().getConnection());
    }
    
    @RequestMapping(value = "patternSearchCount", method = RequestMethod.POST)
    public int generalSearchCount(@RequestParam(value = "pattern") String pattern)
    {
        return GeneralTransactions.searchCount(pattern, OntologyTools.getInstance().getConnection());
    }
}
