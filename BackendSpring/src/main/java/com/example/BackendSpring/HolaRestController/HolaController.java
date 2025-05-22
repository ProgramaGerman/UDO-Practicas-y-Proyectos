package com.example.BackendSpring.HolaRestController;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {

    private String usuario;

    @GetMapping("/Hola")
    public String HolaMundo(){
        return "Hola " + usuario;
    }

    @PostMapping("/usuario")
    public void setUsuario(String usuario){
        this.usuario = usuario;
    }
}
