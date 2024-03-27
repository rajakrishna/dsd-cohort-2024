package com.dsd.reservationsystem.database;

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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


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


    public List getAllParts(){
        QuerySnapshot partsCollection;
        ApiFuture<QuerySnapshot> query =  database.collection("parts").get();

        try {
            partsCollection = query.get();
            List<QueryDocumentSnapshot> documents = partsCollection.getDocuments();
            return documents;
        }catch (Exception exception){
            System.out.println("failed to get parts from firestore");
            return new ArrayList<>();
        }



    }
    public List getTimeSlots(){
        QuerySnapshot timeSlotsCollection;
        ApiFuture<QuerySnapshot> query =  database.collection("timeSlots").get();

        try {
            System.out.println("geting timeslots");
            timeSlotsCollection = query.get();
            ArrayList docs = new ArrayList();
            List<QueryDocumentSnapshot> documents = timeSlotsCollection.getDocuments();
            System.out.println("sucess getting timeslots");

            for (QueryDocumentSnapshot document : documents) {
               docs.add(document.getData());
            }





            return docs;
        }catch (Exception exception){
            System.out.println("failed to get timeSlots from firestore");
            return new ArrayList<>(Arrays.asList("fallback"));
        }



    }

}
