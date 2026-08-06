package com.ngo.impact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NgoImpactApplication {
    public static void main(String[] args) {
        SpringApplication.run(NgoImpactApplication.class, args);
        System.out.println("=================================================");
        System.out.println("NGO Impact Backend Server Started on Port 8080");
        System.out.println("=================================================");
    }
}
