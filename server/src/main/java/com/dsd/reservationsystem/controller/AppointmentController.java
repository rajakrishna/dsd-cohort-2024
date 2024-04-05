package com.dsd.reservationsystem.controllers;

import com.dsd.reservationsystem.models.Appointment;
import com.dsd.reservationsystem.models.Customer;
import com.dsd.reservationsystem.service.AppointmentService;
import com.dsd.reservationsystem.service.TimeSlotsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private TimeSlotsService timeSlotsService;

    @PostMapping("/save")
    public ResponseEntity<String> saveAppointment(@RequestBody Appointment appointment) {
        // Check if the appointment time is available
        if (!timeSlotsService.isTimeSlotAvailable(appointment.getDay(), appointment.getTimeSlot())) {
            return new ResponseEntity<>("Time slot is not available", HttpStatus.BAD_REQUEST);
        }

        // Save the appointment
        appointmentService.saveAppointment(appointment);
        return new ResponseEntity<>("Appointment saved", HttpStatus.OK);
    }

    private boolean isTimeSlotAvailable(String day, String timeSlot) {
        // Get the time slots for the selected day
        return timeSlotsService.isTimeSlotAvailable(day,timeSlot);

    }
}