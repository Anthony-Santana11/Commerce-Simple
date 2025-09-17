package com.anthony.commercesimple.Exceptions;

public class UserNotFound extends RuntimeException {
    public UserNotFound() {
        super("Usuário não encontrado!");
    }
}
