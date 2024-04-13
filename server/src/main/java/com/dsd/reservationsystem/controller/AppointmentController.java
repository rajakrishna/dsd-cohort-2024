package com.dsd.reservationsystem.controller;

import com.dsd.reservationsystem.models.Appointment;
import com.dsd.reservationsystem.service.AppointmentService;
import com.dsd.reservationsystem.service.TimeSlotsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

  @Autowired
  private AppointmentService appointmentService;

  @Autowired
  private TimeSlotsService timeSlotsService;

  @PostMapping("/save")
  public ResponseEntity<Appointment> saveAppointment(@RequestBody Appointment appointmentRequest) {
    // Check if the appointment time is available

    System.out.println("Appointment request is :");
    System.out.println(appointmentRequest);

    // Save the appointment
    Appointment savedAppointment = appointmentService.saveAppointment(appointmentRequest);
//    Appointment createdAppointment = new Appointment();
    return new ResponseEntity<Appointment>(savedAppointment, HttpStatus.OK);
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