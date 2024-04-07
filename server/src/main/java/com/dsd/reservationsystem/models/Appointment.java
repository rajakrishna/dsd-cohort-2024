package com.dsd.reservationsystem.models;

public class Appointment {
    private String customerId;

    public Appointment() {

    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "customerId='" + customerId + '\'' +
                '}';
    }
}
