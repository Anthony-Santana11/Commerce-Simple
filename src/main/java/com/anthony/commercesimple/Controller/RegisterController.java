package com.anthony.commercesimple.Controller;

import com.anthony.commercesimple.DTO.RegisterUserRequestDTO;
import com.anthony.commercesimple.UseCases.RegisterUserUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/register")
@Tag(name = "Registro", description = "Endpoints para registro de novos usuários")
public class RegisterController {

    @Autowired
    private RegisterUserUseCase registerUserUseCase;

    @Operation(
        summary = "Registrar novo usuário",
        description = "Cria uma nova conta de usuário no sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Usuário registrado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.anthony.commercesimple.DTO.RegisterUserResponseDTO.class),
                examples = @ExampleObject(
                    name = "Sucesso",
                    value = """
                    {
                        "userId": "123e4567-e89b-12d3-a456-426614174000",
                        "username": "usuario123",
                        "email": "usuario@email.com",
                        "createdAt": "2024-01-15T10:30:00",
                        "message": "Usuário usuario123 cadastrado com sucesso!"
                    }
                    """
                )
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dados inválidos ou usuário já existe",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(
                    name = "Erro",
                    value = "Username já existe ou dados inválidos"
                )
            )
        )
    })
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
