package com.anthony.commercesimple.Exceptions;

public class ProductAlredyExistsException extends RuntimeException {
    public ProductAlredyExistsException() {
        super("Produto já existe!");
    }
}
