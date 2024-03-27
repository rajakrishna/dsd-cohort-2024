package com.dsd.reservationsystem.controller;


import com.dsd.reservationsystem.database.Db;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartsController {

    private Db database;



    public PartsController(Db database) {
        this.database = database;
    }


    @GetMapping("")
    public List getPartsInventory(){
        return this.database.getAllParts();
    }
}
