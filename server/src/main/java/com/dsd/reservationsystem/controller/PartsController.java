package com.dsd.reservationsystem.controller;


import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.service.PartsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartsController {

    private PartsService partsService;



    public PartsController(PartsService partsService) {
        this.partsService = partsService;
    }


    @GetMapping("")
    public List getPartsInventory(){
        return this.partsService.getAll();
    }
}
