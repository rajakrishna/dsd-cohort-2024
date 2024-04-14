package com.dsd.reservationsystem.models;

public class AppointmentPostRequest {
  private AppointmentTime appointmentTime;
  private Customer customerInfo;


  public AppointmentPostRequest() {
  }

  public AppointmentPostRequest(AppointmentTime appointmentTime, Customer customerInfo) {
    this.appointmentTime = appointmentTime;
    this.customerInfo = customerInfo;
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


  public AppointmentTime getAppointmentTime() {
    return appointmentTime;
  }

  public void setAppointmentTime(AppointmentTime appointmentTime) {
    this.appointmentTime = appointmentTime;
  }

  public class AppointmentTime {
    private String day;
    private String timeSlot;

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


    @Override
    public String toString() {
      return "AppointmentTime{" +
          "day='" + day + '\'' +
          ", timeSlot='" + timeSlot + '\'' +
          '}';
    }
  }
}

