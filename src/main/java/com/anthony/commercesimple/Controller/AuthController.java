package com.anthony.commercesimple.Controller;

import com.anthony.commercesimple.DTO.AuthUserRequestDTO;
import com.anthony.commercesimple.UseCases.AuthUserUseCase;
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
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Endpoints para autenticação de usuários")
public class AuthController {

    @Autowired
    private AuthUserUseCase authUserUseCase;

    @Operation(
        summary = "Autenticar usuário",
        description = "Realiza login do usuário e retorna token JWT para autenticação"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login realizado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.anthony.commercesimple.DTO.AuthUserResponseDTO.class),
                examples = @ExampleObject(
                    name = "Sucesso",
                    value = """
                    {
                        "acess_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "expires_in": "3600000",
                        "username": "usuario123",
                        "role": "USER",
                        "userId": "123e4567-e89b-12d3-a456-426614174000"
                    }
                    """
                )
            )
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Credenciais inválidas",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(
                    name = "Erro",
                    value = "Usuário ou senha inválidos"
                )
            )
        )
    })
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
