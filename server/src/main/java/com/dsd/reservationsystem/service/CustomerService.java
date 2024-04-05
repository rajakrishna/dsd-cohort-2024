package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.Customer;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

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
}