package com.dsd.reservationsystem.service;

import com.dsd.reservationsystem.database.Db;
import com.dsd.reservationsystem.models.Part;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartsService {
  private Db database;


  public PartsService(Db database) {
    this.database = database;
  }


  public List<Part> getAll() {
    return this.database.getAllParts();
  }
}
