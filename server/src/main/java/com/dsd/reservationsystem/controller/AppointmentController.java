package com.dsd.reservationsystem.controller;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.Appointment;
import com.dsd.reservationsystem.models.AppointmentPostRequest;
import com.dsd.reservationsystem.models.Customer;
import com.dsd.reservationsystem.service.AppointmentService;
import com.dsd.reservationsystem.service.TimeSlotsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private TimeSlotsService timeSlotsService;

    @PostMapping("/save")
    public ResponseEntity<Appointment> saveAppointment(@RequestBody AppointmentPostRequest appointmentRequest) {
        // Check if the appointment time is available

        System.out.println("Appointment request is :");
        System.out.println(appointmentRequest);

        // Save the appointment
        appointmentService.saveAppointment(appointmentRequest);
        Appointment createdAppointment = new Appointment();
        return new ResponseEntity<Appointment>(createdAppointment, HttpStatus.OK);
    }

    private boolean isTimeSlotAvailable(String day, String timeSlot) {
        // Get the time slots for the selected day
        return timeSlotsService.isTimeSlotAvailable(day, timeSlot);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAppointments(@RequestParam String date) throws ExecutionException, InterruptedException {
        List<Appointment> appointments = appointmentService.getAppointmentsForDay(date);
        return ResponseEntity.ok(appointments);
    }
}