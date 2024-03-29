package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
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
  public Map<String, Boolean> getTimeSlotsForDay(String dateStr) throws Exception {

    Map<String, Boolean> timeSlotsAvailable = new HashMap<String, Boolean>() {{
      put("TS79", true);
      put("TS911", true);
      put("TS111", true);
    }};
    Map<String, Object> dayTimeSlots = this.database.getTimeSlotsForDay(dateStr);


    System.out.println("timeslots are: ");
    for (Map.Entry<String, Object> timeSlot : dayTimeSlots.entrySet()) {
      String key = timeSlot.getKey();
      Object time = timeSlot.getValue();

      System.out.println(key);
      System.out.println(time);

      //get time slot
      //if time slot has customer id then slot is taken

      //check if timecode exists if exists then time slot is taken
      if (time != null) {
        timeSlotsAvailable.put(key, false);
      }


    }

    return timeSlotsAvailable;
  }
}
