package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicesService {
    private Db database;


    public ServicesService(Db database) {
        this.database = database;
    }


    public List getAll() {
        return this.database.getAllServices();
    }
}
