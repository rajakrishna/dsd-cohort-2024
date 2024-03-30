package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.ServiceModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ServicesService {
    private Db database;


    public ServicesService(Db database) {
        this.database = database;
    }


    public List getAll() {
        ArrayList<ServiceModel> servicesDocs = this.database.getAllServices();

//        ArrayList<ServiceModel> servicesAvailable = new ArrayList<>();

//        for (ServiceModel service : servicesDocs) {
//            Object name = service.name();
//            Object id = service.id();
//
//            servicesAvailable.add(new HashMap<>() {{
//                put("name", name);
//                put("id", id);
//            }});
//        }

        return servicesDocs;
    }
}
