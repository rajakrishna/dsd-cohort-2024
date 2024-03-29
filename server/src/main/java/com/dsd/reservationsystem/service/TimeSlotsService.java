package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TimeSlotsService {
    private Db database;

    public TimeSlotsService(Db database) {
        this.database = database;
    }

    //date will be provided in 03022024 two-digit month, two-digit month and four digit year
    public Map<String, Object> getAllForDay(String dateStr) {
        return this.database.getTimeSlotsForDay(dateStr);
    }
}
