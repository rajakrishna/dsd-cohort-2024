package com.dsd.reservationsystem.database;

import com.dsd.reservationsystem.models.*;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Repository
public class Db {
    private Firestore database;

    public Db() throws IOException {
        // String credentialsPath = "/etc/secrets/credentials.json";
        String credentialsPath = "credentials.json";
        // String environment = System.getenv("environment");
        // if (environment != "prod") {
        // credentialsPath = "credentials.json";
        // }

        System.out.println(credentialsPath);
        InputStream serviceAccount = new FileInputStream(credentialsPath);
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(credentials)
                .build();
        FirebaseApp.initializeApp(options);

        this.database = FirestoreClient.getFirestore();
    }

    public List<Part> getAllParts() {
        QuerySnapshot partsCollection;
        ApiFuture<QuerySnapshot> query = database.collection("parts").get();

        try {
            ArrayList<Part> docs = new ArrayList<>();
            partsCollection = query.get();
            List<QueryDocumentSnapshot> documents = partsCollection.getDocuments();

            for (QueryDocumentSnapshot document : documents) {

                Map<String, Object> doc = document.getData();
                String id = document.getId();
                String name = (String) doc.get("name");
                Long quantity = (Long) doc.get("quantity");
                Long threshold = (Long) doc.get("threshold");
                docs.add(new Part(id, name, quantity, threshold));
            }

            return docs;
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return new ArrayList<Part>();
        }
    }

    public List getTimeSlots() {

        // empty snapshot
        QuerySnapshot timeSlotsCollection;

        // request to firebase for timeslots collection
        // request to firebase for timeslots collection
        ApiFuture<QuerySnapshot> query = database.collection("timeSlots").get();

        try {
            // get snapshot from query
            timeSlotsCollection = query.get();

            // set new empty list
            ArrayList docs = new ArrayList();

            // get list of all documents from snapshot
            List<QueryDocumentSnapshot> documents = timeSlotsCollection.getDocuments();

            // loop all documents in snapshot and get the data
            for (QueryDocumentSnapshot document : documents) {
                docs.add(document.getData()); // add data of each doc to arraylist
            }

            return docs;

        } catch (Exception exception) {
            return new ArrayList<>(Arrays.asList(new HashMap<>() {
                {
                    put("id", "failed to get timeslots");
                }
            }));
        }
    }

    public ArrayList<ServiceModel> getAllServices() {
        ApiFuture<QuerySnapshot> query = database.collection("services").get();

        try {
            ArrayList<ServiceModel> docs = new ArrayList();
            QuerySnapshot servicesCollection = query.get();
            List<QueryDocumentSnapshot> documents = servicesCollection.getDocuments();

            for (QueryDocumentSnapshot document : documents) {
                ServiceModel doc = new ServiceModel((String) document.getData().get("id"),
                        (String) document.getData().get("name"));
                docs.add(doc);
            }

            return docs;
        } catch (Exception exception) {

            return new ArrayList<>(Arrays.asList(new ServiceModel("id", "failed to get services")));
        }
    }

    // timeslots
    public DaySchedule getTimeSlotsForDay(String dateStr) throws Exception {
        // request to firebase for timeslots collection
        DocumentReference docRef = database.collection("timeSlots").document(dateStr);
        // System.out.println(dateStr);
        try {
            ApiFuture<DocumentSnapshot> query = docRef.get();

            // get snapshot from query
            DocumentSnapshot document = query.get();

            if (document.exists()) {
                // extract appointments from document
                HashMap<String, Appointment> appointments = getAppointmentHashMap(document);
                return new DaySchedule(dateStr, appointments);
            }

            // no document found send new file
            return new DaySchedule(dateStr, new HashMap<String, Appointment>());

        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new Exception("database failed to get timeslots for day" + dateStr);
        }
    }

    // timeslot utility for getting timeslot info
    private static HashMap<String, Appointment> getAppointmentHashMap(DocumentSnapshot document) {
        HashMap<String, Appointment> appointments = new HashMap<>();
        Map<String, Object> doc = document.getData();

        // loop through hash map of day timeslots
        for (Map.Entry<String, Object> timeSlot : doc.entrySet()) {
            String tsCode = timeSlot.getKey();
            HashMap<String, String> timeSlotData = (HashMap<String, String>) timeSlot.getValue();

            // System.out.println("Key: " + tsCode + ", Value: " + (String)
            // timeSlotData.get("customerId"));
            Appointment appointment = new Appointment();
            appointment.setCustomerId((String) timeSlotData.get("customerId"));
            appointments.put(tsCode, appointment);
        }
        return appointments;
    }

    public Customer createCustomer(Customer customer) {
        customer.setId(UUID.randomUUID().toString());
        // Save the customer to Firestore
        database.collection("customerInfo").document(String.valueOf(customer.getId())).set(customer);
        return customer;
    }
}
