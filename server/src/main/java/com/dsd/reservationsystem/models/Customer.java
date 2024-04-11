package com.dsd.reservationsystem.models;

import java.util.List;

public class Customer {
    private String id;
    private String address;
    private String name;
    private String phoneNumber;
    private String email;
    private List<Appointment> appointments;

    public Customer(String id, String address, String name, String phoneNumber, String email,
            List<Appointment> appointments) {
        this.id = id;
        this.address = address;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.appointments = appointments;
    }

    public Customer() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    // public static class Appointment {
    // private String serviceId;
    // private String confirmationNumber;
    // private String timeSlot;
    // private String date;
    // private String status;


//    public static class Appointment {
//        private String serviceId;
//        private String confirmationNumber;
//        private String timeSlot;
//        private String date;
//        private String status;
//
//
//        public Appointment(String serviceId, String confirmationNumber, String timeSlot, String date, String status) {
//            this.serviceId = serviceId;
//            this.confirmationNumber = confirmationNumber;
//            this.timeSlot = timeSlot;
//            this.date = date;
//            this.status = status;
//        }
//
//
//        public String getServiceId() {
//            return serviceId;
//        }
//
//        public void setServiceId(String serviceId) {
//            this.serviceId = serviceId;
//        }
//
//        public String getConfirmationNumber() {
//            return confirmationNumber;
//        }
//
//        public void setConfirmationNumber(String confirmationNumber) {
//            this.confirmationNumber = confirmationNumber;
//        }
//
//        public String getTimeSlot() {
//            return timeSlot;
//        }
//
//        public void setTimeSlot(String timeSlot) {
//            this.timeSlot = timeSlot;
//        }
//
//        public String getDate() {
//            return date;
//        }
//
//        public void setDate(String date) {
//            this.date = date;
//        }
//
//        public String getStatus() {
//            return status;
//        }
//
//        public void setStatus(String status) {
//            this.status = status;
//        }
//    }

    // public Appointment(String serviceId, String confirmationNumber, String
    // timeSlot, String date, String status) {
    // this.serviceId = serviceId;
    // this.confirmationNumber = confirmationNumber;
    // this.timeSlot = timeSlot;
    // this.date = date;
    // this.status = status;
    // }

    // public String getServiceId() {
    // return serviceId;
    // }

    // public void setServiceId(String serviceId) {
    // this.serviceId = serviceId;
    // }

    // public String getConfirmationNumber() {
    // return confirmationNumber;
    // }

    // public void setConfirmationNumber(String confirmationNumber) {
    // this.confirmationNumber = confirmationNumber;
    // }

    // public String getTimeSlot() {
    // return timeSlot;
    // }

    // public void setTimeSlot(String timeSlot) {
    // this.timeSlot = timeSlot;
    // }

    // public String getDate() {
    // return date;
    // }

    // public void setDate(String date) {
    // this.date = date;
    // }

    // public String getStatus() {
    // return status;
    // }

    // public void setStatus(String status) {
    // this.status = status;
    // }
    // }

}