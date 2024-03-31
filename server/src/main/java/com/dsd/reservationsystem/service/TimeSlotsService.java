package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.Appointment;
import com.dsd.reservationsystem.models.DaySchedule;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class TimeSlotsService {
    private final Db database;
    ArrayList<String> timeSlotCodes = new ArrayList<>(Arrays.asList("TS79", "TS911", "TS111"));

    public TimeSlotsService(Db database) {
        this.database = database;
    }

    //date will be provided in 03022024 two-digit month, two-digit month and four digit year
    public Map<String, Boolean> getTimeSlotsAvailabilityForDay(String dateStr) throws Exception {
        Map<String, Boolean> timeSlotsAvailability = new HashMap<String, Boolean>() {{
            put("TS79", true);
            put("TS911", true);
            put("TS111", true);
        }};

        DaySchedule dayTimeSlots = this.database.getTimeSlotsForDay(dateStr);


        //get set of key:value from Map and loop through it
        for (Map.Entry<String, Appointment> timeSlot : dayTimeSlots.appointments().entrySet()) {
            String key = timeSlot.getKey();
            Object timeSlotData = timeSlot.getValue();

            //check if timecode exists, if exists then time slot is taken
            if (timeSlotData != null) {
                timeSlotsAvailability.put(key, false);
            }
        }
        return timeSlotsAvailability;
    }
}
