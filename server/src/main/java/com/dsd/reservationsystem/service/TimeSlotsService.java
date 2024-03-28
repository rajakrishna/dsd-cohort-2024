package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimeSlotsService {
    private Db database;

    public TimeSlotsService(Db database) {
        this.database = database;
    }

    public List getAll() {
        return this.database.getTimeSlots();
    }
}
