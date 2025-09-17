package com.anthony.commercesimple.DTO;

import java.time.LocalDateTime;
import java.util.UUID;

public record RegisterUserResponseDTO (UUID userId, String username, String email , LocalDateTime createdAt , String message ) {
    @Override
    public String message() {
        var message = "Usuário " + username + " cadastrado com sucesso!";
        return message;
    }
}
