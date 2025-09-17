package com.anthony.commercesimple.Entity;

import com.anthony.commercesimple.Enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "users")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID UserId;
    @NotBlank
    private String name;
    @Length(min = 3, max = 10,  message = "Username deve ter no mínimo 3 caracteres e no máximo 10")
    private String username;
    @Email
    private String email;
    @Length(min = 6, max = 400,  message = "Senha deve ter no mínimo 6 caracteres e no máximo 12")
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    @CreationTimestamp
    private LocalDateTime createdAt;
}
