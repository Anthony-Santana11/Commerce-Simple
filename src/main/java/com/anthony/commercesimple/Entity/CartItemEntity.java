package com.anthony.commercesimple.Entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import java.util.UUID;

@Entity(name = "cart_items")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CartItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID cartItemId;
    @ManyToOne
    private UserEntity userid;
    @ManyToOne(fetch = FetchType.LAZY)
    private ProductEntity product;
    @NotNull
    @Positive
    private int quantity;
    @NotBlank
    private String name;

}
