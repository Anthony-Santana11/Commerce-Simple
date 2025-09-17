package com.anthony.commercesimple.Controller;

import com.anthony.commercesimple.Entity.ProductEntity;
import com.anthony.commercesimple.UseCases.ProductsUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@Tag(name = "Produtos (Admin)", description = "Endpoints administrativos para gerenciamento de produtos")
@SecurityRequirement(name = "Bearer Authentication")
public class ProductsController {

    @Autowired
    private ProductsUseCase productsUseCase;

    @Operation(
        summary = "Criar produto",
        description = "Cria um novo produto no catálogo (apenas administradores)"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Produto criado com sucesso",
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
            description = "Dados inválidos ou produto já existe",
            content = @Content(
                mediaType = "application/json",
                examples = @ExampleObject(
                    name = "Erro",
                    value = "Nome do produto já existe ou dados inválidos"
                )
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Acesso negado - apenas administradores",
            content = @Content(mediaType = "application/json")
        )
    })
    @PostMapping("/create")
    public ResponseEntity<ProductEntity>createProduct(@Valid @RequestBody ProductEntity product) {
        return ResponseEntity.ok(productsUseCase.creatProduct(product.getName(), product.getDescription(), product.getPrice(), product.getImageURL()));
    }

    @Operation(
        summary = "Listar todos os produtos",
        description = "Retorna lista de todos os produtos cadastrados (apenas administradores)"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Lista de produtos retornada com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductEntity[].class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Acesso negado - apenas administradores",
            content = @Content(mediaType = "application/json")
        )
    })
    @GetMapping("/getAll")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        return ResponseEntity.ok(productsUseCase.getAllProducts());
    }

    @Operation(
        summary = "Deletar produto",
        description = "Remove um produto do catálogo (apenas administradores)"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Produto deletado com sucesso"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Produto não encontrado",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Acesso negado - apenas administradores",
            content = @Content(mediaType = "application/json")
        )
    })
    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteProduct(@RequestBody ProductEntity product) {
        productsUseCase.RemoveProduct(product);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Atualizar produto",
        description = "Atualiza informações de um produto existente (apenas administradores)"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Produto atualizado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductEntity.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Produto não encontrado",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dados inválidos",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Acesso negado - apenas administradores",
            content = @Content(mediaType = "application/json")
        )
    })
    @PutMapping("/update")
    public ResponseEntity<ProductEntity> updateProduct(@RequestBody ProductEntity product) {
        return ResponseEntity.ok(productsUseCase.updateProduct(product));
    }

}
