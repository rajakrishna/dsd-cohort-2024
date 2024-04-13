package com.dsd.reservationsystem.models;

public class AppointmentPostRequest {
    private String customerId;
    private String day;
    private String timeSlot;

    private Customer customerInfo;

    public AppointmentPostRequest(String customerId, String day, String timeSlot, Customer customerInfo) {
        this.customerId = customerId;
        this.day = day;
        this.timeSlot = timeSlot;

        this.customerInfo = customerInfo;
    }

    public AppointmentPostRequest() {
    }


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


    public Customer getCustomerInfo() {
        return customerInfo;
    }

    public void setCustomerInfo(Customer customerInfo) {
        this.customerInfo = customerInfo;
    }

    @Override
    public String toString() {
        return "AppointmentPostRequest{" +
                "customerId='" + customerId + '\'' +
                ", day='" + day + '\'' +
                ", timeSlot='" + timeSlot + '\'' +
                ", customerInfo=" + customerInfo +
                '}';
    }
}
