package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.Appointment;
import com.dsd.reservationsystem.models.AppointmentPostRequest;
import com.dsd.reservationsystem.models.Customer;
import com.dsd.reservationsystem.models.DaySchedule;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class AppointmentService {
    private Db database;
    private EmailService emailService;

    public AppointmentService(Db database, EmailService emailService) {
        this.database = database;
        this.emailService = emailService;
    }

    public Appointment saveAppointment(AppointmentPostRequest appointment) {


//        // Save the appointment to Firestore
        Appointment savedAppointment = this.database.createAppointment(appointment);
//
//        // Update the timeslot in Firestore to include the customerId
//        DaySchedule daySchedule;
//        try {
//            daySchedule = database.getTimeSlotsForDay(appointment.getDay());
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//        daySchedule.appointments().get(appointment.getTimeSlot()).setCustomerId(appointment.getCustomerId());
//        database.updateTimeSlotsForDay(appointment.getDay(), daySchedule.appointments());
//
//        return savedAppointment;

        // Save the appointment to Firestore
//        Appointment savedAppointment = this.database.createAppointment(appointment);

        // Fetch the customer's email
//        Customer customer = database.getCustomerById(appointment.getCustomerId());
//        String customerEmail = customer.getEmail();
//
//        // Send a confirmation email
//        emailService.sendSimpleMessage(
//                customerEmail,
//                "Appointment Confirmation",
//                "Your appointment has been confirmed. Your confirmation number is " + savedAppointment.getConfirmationNumber()
//        );
//
//        return savedAppointment;

        return new Appointment();
    }


    public Appointment addAppointmentToCustomer(String customerId, Appointment appointment) {
        // Fetch the customer by ID
        Customer customer = database.getCustomerById(customerId);
        if (customer != null) {
            // Add the new appointment to the customer's list of appointments
            List<Appointment> appointments = customer.getAppointments();
            appointments.add(appointment);
            customer.setAppointments(appointments);

            // Save the customer back to the database
            database.createCustomer(customer);

            // Add the appointment as a time slot for the given date
            DaySchedule daySchedule;
            try {
                daySchedule = database.getTimeSlotsForDay(appointment.getDay());
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
            daySchedule.appointments().put(appointment.getTimeSlot(), appointment);
            database.updateTimeSlotsForDay(appointment.getDay(), daySchedule.appointments());

            return appointment;
        } else {
            return null;
        }
    }

    public List<Appointment> getAppointmentsForDay(String date) throws ExecutionException, InterruptedException {
        return database.getAppointmentsForDay(date);
    }


}