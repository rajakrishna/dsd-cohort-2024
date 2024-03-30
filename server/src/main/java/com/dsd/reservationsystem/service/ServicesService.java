package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
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
        ArrayList<Map<String, Object>> servicesDocs = this.database.getAllServices();

        ArrayList<Map<String, Object>> servicesAvailable = new ArrayList<>();

        for (Map<String, Object> service : servicesDocs) {
            Object name = service.get("name");
            Object id = service.get("id");

            servicesAvailable.add(new HashMap<>() {{
                put("name", name);
                put("id", id);
            }});
        }

        return servicesAvailable;
    }
}
