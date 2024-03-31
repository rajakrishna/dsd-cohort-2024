package com.dsd.reservationsystem.controller;

import com.dsd.reservationsystem.models.Appointment;
import com.dsd.reservationsystem.service.TimeSlotsService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> getTimeSlotsForDay(@RequestBody Map<String, String> requestBody) {

        try {
            Map<String, Boolean> timeSlotsAvailability = this.timeSlotsService.getTimeSlotsAvailabilityForDay(requestBody.get("todaysDate"));
//            System.out.println("timeSlots");
//            System.out.println(timeSlotsAvailability);
            return ResponseEntity.ok().body(timeSlotsAvailability);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
