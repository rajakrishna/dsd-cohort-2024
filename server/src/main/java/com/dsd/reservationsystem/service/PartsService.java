package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;

import java.util.List;


public class PartsService {
    private Db database;


    public PartsService(Db database) {
        this.database = database;
    }


    public List getAll() {
        return this.database.getAllParts();
    }
}
