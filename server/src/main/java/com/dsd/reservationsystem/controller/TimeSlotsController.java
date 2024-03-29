package com.dsd.reservationsystem.controller;

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
      Map<String, Boolean> timeSlots = this.timeSlotsService.getTimeSlotsForDay(requestBody.get("todaysDate"));
      return ResponseEntity.ok().body(timeSlots);

    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
