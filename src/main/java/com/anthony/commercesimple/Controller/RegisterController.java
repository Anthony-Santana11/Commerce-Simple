package com.anthony.commercesimple.Controller;


import com.anthony.commercesimple.DTO.RegisterUserRequestDTO;
import com.anthony.commercesimple.UseCases.RegisterUserUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @Autowired
    private RegisterUserUseCase registerUserUseCase;

    @PostMapping("/user")
    public ResponseEntity<Object> register (@RequestBody RegisterUserRequestDTO registerUserRequestDTO) {
        try {
            var response = registerUserUseCase.execute(
                    registerUserRequestDTO.username(),
                    registerUserRequestDTO.email(),
                    registerUserRequestDTO.password(),
                    registerUserRequestDTO.name(),
                    registerUserRequestDTO.role()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());

        }
    }
}
