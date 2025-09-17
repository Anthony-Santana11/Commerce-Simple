package com.anthony.commercesimple.Controller;

import com.anthony.commercesimple.Entity.ProductEntity;
import com.anthony.commercesimple.UseCases.ProductsUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Produtos (Público)", description = "Endpoints públicos para consulta de produtos")
public class PublicProductsController {

    @Autowired
    private ProductsUseCase productsUseCase;

    @Operation(
        summary = "Listar todos os produtos",
        description = "Retorna lista de todos os produtos disponíveis (acesso público)"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Lista de produtos retornada com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductEntity[].class),
                examples = @ExampleObject(
                    name = "Sucesso",
                    value = """
                    [
                        {
                            "productId": "123e4567-e89b-12d3-a456-426614174000",
                            "name": "Smartphone XYZ",
                            "price": 1299.99,
                            "description": "Smartphone com tela de 6.1 polegadas e câmera de 48MP",
                            "imageURL": "https://example.com/smartphone.jpg"
                        },
                        {
                            "productId": "456e7890-e89b-12d3-a456-426614174001",
                            "name": "Notebook ABC",
                            "price": 2499.99,
                            "description": "Notebook com processador Intel i7 e 16GB RAM",
                            "imageURL": "https://example.com/notebook.jpg"
                        }
                    ]
                    """
                )
            )
        )
    })
    @GetMapping("/")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        return ResponseEntity.ok(productsUseCase.getAllProducts());
    }

    @Operation(
        summary = "Buscar produto por ID",
        description = "Retorna um produto específico pelo seu ID (acesso público)"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Produto encontrado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductEntity.class),
                examples = @ExampleObject(
                    name = "Sucesso",
                    value = """
                    {
                        "productId": "123e4567-e89b-12d3-a456-426614174000",
                        "name": "Smartphone XYZ",
                        "price": 1299.99,
                        "description": "Smartphone com tela de 6.1 polegadas e câmera de 48MP",
                        "imageURL": "https://example.com/smartphone.jpg"
                    }
                    """
                )
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "ID inválido",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Produto não encontrado",
            content = @Content(mediaType = "application/json")
        )
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProductById(
        @Parameter(description = "ID único do produto", example = "123e4567-e89b-12d3-a456-426614174000")
        @PathVariable String id) {
        try {
            ProductEntity product = productsUseCase.getProductById(id);
            if (product != null) {
                return ResponseEntity.ok(product);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
