package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.*;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Query;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class AppointmentService {
    private Db database;
    private EmailService emailService;

    private CustomerService customerService;

    private TimeSlotsService timeSlotsService;

    public AppointmentService(Db database, EmailService emailService, CustomerService customerService, TimeSlotsService timeSlotsService) {
        this.database = database;
        this.emailService = emailService;
        this.customerService = customerService;
        this.timeSlotsService = timeSlotsService;
    }


    public Appointment saveAppointment(AppointmentPostRequest appointment) {


        //existing or new customer
        Customer customer;
        String customerEmail = appointment.getCustomerInfo().getEmail();
        AppointmentPostRequest.CustomerInfo customerInfo = appointment.getCustomerInfo();
        AppointmentPostRequest.AppointmentTime appointmentTime = appointment.getAppointmentTime();

        //try to find customer info by email
        try {

            //get customer by email
            Optional<Customer> foundCustomer = this.customerService.getCustomerByEmail(customerEmail);


            //no customer found. Make new entry and return it
            if (foundCustomer.isEmpty()) {

                //create new customer from request
                Customer newCustomer = new Customer();
                newCustomer.setAddress(customerInfo.getAddress());
                newCustomer.setEmail(customerInfo.getEmail());
                newCustomer.setName(customerInfo.getName());
                newCustomer.setPhoneNumber(customerInfo.getPhoneNumber());


                //create customer in database
                customer = this.customerService.createCustomer(newCustomer);

                System.out.println("createdCustomer");
                System.out.println(customer);
            } else {

                customer = foundCustomer.get();
                System.out.println("customer found");
                System.out.println(customer);
            }

        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {

            throw new RuntimeException(e);
        }


//        create new appointment from request
        Appointment newAppointment = new Appointment();
        newAppointment.setTimeSlot(appointmentTime.getTimeSlot());
        newAppointment.setDate(appointmentTime.getDay());
        newAppointment.setServiceId(customerInfo.getServiceId());
        newAppointment.setConfirmationNumber(UUID.randomUUID().toString());
        newAppointment.setStatus("PENDING");

        //update appointments on customer
        customer.addAppointment(newAppointment);

        System.out.println("customer new data");
        System.out.println(customer);

        //update customerInfo database with customer changes
        try {
            CollectionReference customersCollection = database.collection("customerInfo");
            customersCollection.document(customer.getId()).set(customer);

        } catch (Exception e) {
            System.out.println("failed to update customerInfo data");
            throw new RuntimeException("failed to update customerInfo data");
        }


        //update timeSlots database
        try {


            String date = newAppointment.getDate();

            //update timeslots with customer id
            timeSlotsService.updateDayTimeslot(customer.getId(), date, appointmentTime.getTimeSlot());

        } catch (Exception e) {
            System.out.println("failed to update timeslots data");
            throw new RuntimeException("failed to update timeslots data");
        }


        return newAppointment;
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
                daySchedule = database.getTimeSlotsForDay(appointment.getDate());
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
            daySchedule.appointments().put(appointment.getTimeSlot(), appointment);
            database.updateTimeSlotsForDay(appointment.getDate(), daySchedule.appointments());

            return appointment;
        } else {
            return null;
        }
    }

    public List<HashMap<String, String>> getAppointmentsForDay(String date) throws ExecutionException, InterruptedException {


        List<HashMap<String, String>> appointmentsList = new ArrayList<>();

        //call database for days appointments
        Map<String, Object> daysTimeSlots = database.getAppointmentsForDay(date);


        //create appointment structures
        // loop through hash map of day timeslots and add appointments to list to display appointments for this day
        for (Map.Entry<String, Object> timeSlot : daysTimeSlots.entrySet()) {
            String tsCode = timeSlot.getKey();
            HashMap<String, String> customerAppointment = new HashMap<>();
            HashMap<String, String> timeSlotData = (HashMap<String, String>) timeSlot.getValue();

            String customerId = timeSlotData.get("customerId");

            //todo get customer info
            Customer customer = customerService.getCustomerById(customerId);
            System.out.println("customer ID=========");
            System.out.println(customerId);

            customerAppointment.put("name", customer.getName());


            //search customers appointments for matching date and timeslot
            for (Appointment custAppt : customer.getAppointments()) {


                if ((date.equals(custAppt.getDate())) && tsCode.equals(custAppt.getTimeSlot())) {

                    customerAppointment.put("time", custAppt.getTimeSlot());
                    customerAppointment.put("serviceId", custAppt.getServiceId());


                }
            }
            
            appointmentsList.add(customerAppointment);

        }


        return appointmentsList;
    }

}

