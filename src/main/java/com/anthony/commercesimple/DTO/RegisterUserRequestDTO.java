package com.anthony.commercesimple.DTO;

import com.anthony.commercesimple.Enums.Role;

public record RegisterUserRequestDTO (String username, String password, String email, String name, Role role) {
}
