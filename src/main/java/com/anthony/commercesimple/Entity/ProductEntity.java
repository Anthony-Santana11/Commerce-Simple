package com.anthony.commercesimple.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.util.UUID;

@Entity(name = "products")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Schema(description = "Entidade que representa um produto no catálogo")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Schema(description = "ID único do produto", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID productId;
    
    @NotBlank
    @Schema(description = "Nome do produto", example = "Smartphone XYZ", required = true)
    private String name;
    
    @NotNull
    @Schema(description = "Preço do produto em reais", example = "1299.99", required = true)
    private BigDecimal price;
    
    @Length (min = 5, max = 200, message = "A descrição deve ter no mínimo 5 caracteres e no máximo 200")
    @Schema(description = "Descrição detalhada do produto (5-200 caracteres)", example = "Smartphone com tela de 6.1 polegadas e câmera de 48MP", required = true)
    private String description;
    
    @Schema(description = "URL da imagem do produto", example = "https://example.com/smartphone.jpg")
    private String imageURL;

}
