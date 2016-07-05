package net.unipiloto.wiki.web.controllers;

import net.unipiloto.wiki.web.transactions.FunctionalRequerimentTransaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/functionalRequeriment")
public class FunctionalRequerimentController {

    @RequestMapping(value = "/selectById", method = RequestMethod.POST)
    public String selectById(@RequestParam(value = "id") String id) {
        return FunctionalRequerimentTransaction.selectById(id);
    }

    @RequestMapping(value = "/selectAll", method = RequestMethod.POST)
    public String selectAll() {
        return FunctionalRequerimentTransaction.selectAll();
    }

}
