package com.dsd.reservationsystem.controller;

import com.dsd.reservationsystem.database.Db;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/timeslots")
public class TimeSlotsController {

    private Db database;

    public TimeSlotsController(Db database) {
        this.database = database;
    }

    @GetMapping("")
    public List getTimeSlots() {
        return this.database.getTimeSlots();
    }
}
