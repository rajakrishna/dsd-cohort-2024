package com.dsd.reservationsystem.controller;

import com.dsd.reservationsystem.service.PartsService;

import com.dsd.reservationsystem.models.Part;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
public class PartsController {

    private PartsService partsService;


    public PartsController(PartsService partsService) {
        this.partsService = partsService;
    }


    @GetMapping("")
    public List<Part> getPartsInventory() {
        return this.partsService.getAllParts();
    }

    @PostMapping("")
    public ResponseEntity<Part> postParts(@RequestBody Part part) {
        Part createdPart = partsService.createPart(part);
        return ResponseEntity.ok(createdPart);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Part> getPartById(@PathVariable String id) {
        Part part = partsService.getPartById(id);
        if (part != null) {
            return ResponseEntity.ok(part);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("")
    public ResponseEntity<Part> postPart(@RequestBody Part part) {
        Part updatedPart = partsService.updatePart(part);
        return ResponseEntity.ok(updatedPart);
    }
}
