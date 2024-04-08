package com.dsd.reservationsystem.models;

public class Appointment {
    private String customerId;
    private String day;
    private String timeSlot;
    private String confirmationNumber;
    private Customer customerInfo;

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getConfirmationNumber() {
        return confirmationNumber;
    }

    public void setConfirmationNumber(String confirmationNumber) {
        this.confirmationNumber = confirmationNumber;
    }

    public Customer getCustomerInfo() {
        return customerInfo;
    }

    public void setCustomerInfo(Customer customerInfo) {
        this.customerInfo = customerInfo;
    }
}
