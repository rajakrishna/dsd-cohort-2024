package com.dsd.reservationsystem.controller;

import com.dsd.reservationsystem.models.Part;
import com.dsd.reservationsystem.service.PartsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartsController {

  private PartsService partsService;

  public PartsController(PartsService partsService) {
    this.partsService = partsService;
  }

  @GetMapping("")
  public List<Part> getPartsInventory(@RequestParam("lowInventory") Boolean lowInventory) {
    // todo WORKING HERE getting low inventory param
    System.out.println("inventory low param " + lowInventory);
    return this.partsService.getAll();
  }
}
