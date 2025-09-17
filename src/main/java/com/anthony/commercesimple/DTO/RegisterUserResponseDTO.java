package com.anthony.commercesimple.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;

@Schema(description = "DTO para resposta de registro de usuário")
public record RegisterUserResponseDTO (
    @Schema(description = "ID único do usuário", example = "123e4567-e89b-12d3-a456-426614174000")
    UUID userId, 
    
    @Schema(description = "Nome de usuário", example = "usuario123")
    String username, 
    
    @Schema(description = "Email do usuário", example = "usuario@email.com")
    String email, 
    
    @Schema(description = "Data e hora de criação da conta", example = "2024-01-15T10:30:00")
    LocalDateTime createdAt, 
    
    @Schema(description = "Mensagem de confirmação", example = "Usuário usuario123 cadastrado com sucesso!")
    String message
) {
    @Override
    public String message() {
        var message = "Usuário " + username + " cadastrado com sucesso!";
        return message;
    }
}
