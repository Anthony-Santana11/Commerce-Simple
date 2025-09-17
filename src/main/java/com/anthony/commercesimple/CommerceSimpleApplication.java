package com.anthony.commercesimple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages="com.anthony.commercesimple")
@EntityScan(basePackages = "com.anthony.commercesimple.Entity")
public class CommerceSimpleApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommerceSimpleApplication.class, args);
    }

}
