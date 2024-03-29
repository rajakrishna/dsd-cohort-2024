package com.dsd.reservationsystem.controller;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.service.PartsService;
import com.dsd.reservationsystem.service.TimeSlotsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeslots")
public class TimeSlotsController {

    private TimeSlotsService timeSlotsService;

    public TimeSlotsController(TimeSlotsService timeSlotsService) {
        this.timeSlotsService = timeSlotsService;
    }

    @GetMapping("")
    @ResponseBody
    public List getTimeSlotsForDay(@RequestBody String todayDate) {

        return this.timeSlotsService.getAll();
    }
}
