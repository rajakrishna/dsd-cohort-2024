package com.dsd.reservationsystem.controller;

import com.dsd.reservationsystem.service.TimeSlotsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/timeslots")
public class TimeSlotsController {

    private final TimeSlotsService timeSlotsService;

    public TimeSlotsController(TimeSlotsService timeSlotsService) {
        this.timeSlotsService = timeSlotsService;
    }

    @GetMapping("")
    @ResponseBody
    public Map<String, Object> getTimeSlotsForDay(@RequestBody Map<String,String> requestBody) {

        return this.timeSlotsService.getAllForDay(requestBody.get("todaysDate"));
    }
}
