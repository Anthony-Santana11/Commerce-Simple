package com.anthony.commercesimple.Exceptions;

public class UserAlredyExists extends RuntimeException {
    public UserAlredyExists() {
        super("Usuário já existe!");

    }
}
