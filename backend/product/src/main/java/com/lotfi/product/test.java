package com.lotfi.product;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class test {


    @GetMapping("")
    public ResponseEntity<String> tes() {
        return ResponseEntity.ok().body("test");
    }


}
