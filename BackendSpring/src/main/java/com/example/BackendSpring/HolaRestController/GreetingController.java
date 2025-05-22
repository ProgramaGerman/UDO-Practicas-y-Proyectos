package com.example.BackendSpring.HolaRestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {


    @GetMapping("/saludo/{usuario}")
    public static String greeting(@PathVariable String usuario){
        return "Hola " + usuario;
    }
}
