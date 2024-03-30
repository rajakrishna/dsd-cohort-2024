package com.dsd.reservationsystem.database;

import com.dsd.reservationsystem.models.ServiceModel;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
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
        InputStream serviceAccount = new FileInputStream("credentials.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(credentials)
                .build();
        FirebaseApp.initializeApp(options);

        this.database = FirestoreClient.getFirestore();
    }

    public List getAllParts() {
        QuerySnapshot partsCollection;
        ApiFuture<QuerySnapshot> query = database.collection("parts").get();

        try {
            ArrayList docs = new ArrayList();
            partsCollection = query.get();
            List<QueryDocumentSnapshot> documents = partsCollection.getDocuments();

            for (QueryDocumentSnapshot document : documents) {
                docs.add(document.getData());
            }

            return docs;
        } catch (Exception exception) {
            return new ArrayList<>(Arrays.asList(new HashMap<>() {{
                put("id", "failed to get parts");
            }}));
        }
    }

    public List getTimeSlots() {

        //empty snapshot
        QuerySnapshot timeSlotsCollection;

        //request to firebase for timeslots collection
        //request to firebase for timeslots collection
        ApiFuture<QuerySnapshot> query = database.collection("timeSlots").get();

        try {
            //get snapshot from query
            timeSlotsCollection = query.get();

            //set new empty list
            ArrayList docs = new ArrayList();

            //get list of all documents from snapshot
            List<QueryDocumentSnapshot> documents = timeSlotsCollection.getDocuments();

            //loop all documents in snapshot and get the data
            for (QueryDocumentSnapshot document : documents) {
                docs.add(document.getData()); //add data of each doc to arraylist
            }

            return docs;

        } catch (Exception exception) {
            return new ArrayList<>(Arrays.asList(new HashMap<>() {{
                put("id", "failed to get timeslots");
            }}));
        }
    }

    public ArrayList<ServiceModel> getAllServices() {
        ApiFuture<QuerySnapshot> query = database.collection("services").get();

        try {
            ArrayList<ServiceModel> docs = new ArrayList();
            QuerySnapshot servicesCollection = query.get();
            List<QueryDocumentSnapshot> documents = servicesCollection.getDocuments();

            for (QueryDocumentSnapshot document : documents) {
                ServiceModel doc = new ServiceModel((String) document.getData().get("id"), (String) document.getData().get("name"));
                docs.add(doc);
            }

            return docs;
        } catch (Exception exception) {
            return new ArrayList<>(Arrays.asList(new ServiceModel("id", "failed to get services")));
        }
    }
}
