package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.Appointment;
import com.dsd.reservationsystem.models.Customer;
import com.dsd.reservationsystem.models.DaySchedule;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private Db database;

    public AppointmentService(Db database) {
        this.database = database;
    }

    public Appointment saveAppointment(Appointment appointment) {
        // Save the appointment to Firestore
        Appointment savedAppointment = this.database.createAppointment(appointment);

        // Update the timeslot in Firestore to include the customer id
        DaySchedule daySchedule;
        try {
            daySchedule = database.getTimeSlotsForDay(appointment.getDay());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        daySchedule.appointments().get(appointment.getTimeSlot()).setCustomerId(appointment.getCustomerId());
        database.updateTimeSlotsForDay(appointment.getDay(), daySchedule.appointments());

        return savedAppointment;
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
}