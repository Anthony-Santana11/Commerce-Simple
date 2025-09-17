package com.anthony.commercesimple.Controller;

import com.anthony.commercesimple.DTO.AuthUserRequestDTO;
import com.anthony.commercesimple.UseCases.AuthUserUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthUserUseCase authUserUseCase;

    @PostMapping("/user")
    public ResponseEntity<Object> auth (@RequestBody AuthUserRequestDTO authUserRequestDTO) {
        try {
            var response = authUserUseCase.execute(authUserRequestDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

}
