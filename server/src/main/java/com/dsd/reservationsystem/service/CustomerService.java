package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.Customer;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

  private Db database;

  public CustomerService(Db database) {
    this.database = database;

  }

  public Customer createCustomer(Customer customer) {

    // Save the customer to Firestore
    return database.createCustomer(customer);
  }


  public Customer getCustomerById(String id) {
    Customer customer = database.getCustomerById(id);
    if (customer != null) {
      return customer;
    } else {
      return null;
    }
  }

  public Customer getCustomerByEmail(String email) throws Exception {
    //todo get customer by email
    ApiFuture<QuerySnapshot> query = this.database.collection("customerInfo").whereEqualTo("email",
        email).limit(1).get();

    List<QueryDocumentSnapshot> documents = query.get().getDocuments();

    try {


      if (documents.isEmpty()) {
        throw new Exception("NoUserException");
      }

      return documents.get(0).toObject(Customer.class);


    } catch (Exception e) {
      System.out.println("unhandled exeption getting customer info");
      throw e;
    }
  }
}