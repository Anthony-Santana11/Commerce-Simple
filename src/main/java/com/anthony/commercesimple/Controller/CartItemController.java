package com.anthony.commercesimple.Controller;

import com.anthony.commercesimple.Entity.CartItemEntity;
import com.anthony.commercesimple.UseCases.CartUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/cart")
@Tag(name = "Carrinho", description = "Endpoints para gerenciamento do carrinho de compras")
@SecurityRequirement(name = "Bearer Authentication")
public class CartItemController {

    @Autowired
    private CartUseCase cartUseCase;

    @Operation(
        summary = "Listar itens do carrinho",
        description = "Retorna todos os itens do carrinho de um usuário específico"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Itens do carrinho retornados com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = CartItemEntity[].class),
                examples = @ExampleObject(
                    name = "Sucesso",
                    value = """
                    [
                        {
                            "cartItemId": "123e4567-e89b-12d3-a456-426614174000",
                            "userid": {
                                "userId": "456e7890-e89b-12d3-a456-426614174001"
                            },
                            "product": {
                                "productId": "789e0123-e89b-12d3-a456-426614174002",
                                "name": "Smartphone XYZ",
                                "price": 1299.99,
                                "description": "Smartphone com tela de 6.1 polegadas",
                                "imageURL": "https://example.com/smartphone.jpg"
                            },
                            "quantity": 2,
                            "name": "Smartphone XYZ"
                        }
                    ]
                    """
                )
            )
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Token de autenticação inválido",
            content = @Content(mediaType = "application/json")
        )
    })
    @GetMapping("/get-items")
    public ResponseEntity<List<CartItemEntity>> getCart(
        @Parameter(description = "ID do usuário", example = "123e4567-e89b-12d3-a456-426614174000")
        @RequestParam String userid) {
        UUID userId = UUID.fromString(userid);
        return ResponseEntity.ok(cartUseCase.getCartByUser(userId));
    }

    @Operation(
        summary = "Adicionar item ao carrinho",
        description = "Adiciona um novo item ao carrinho do usuário"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Item adicionado ao carrinho com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = CartItemEntity.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dados inválidos",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Token de autenticação inválido",
            content = @Content(mediaType = "application/json")
        )
    })
    @PostMapping("/")
    public ResponseEntity<CartItemEntity> addtoCart(
        @Parameter(description = "ID do usuário", example = "123e4567-e89b-12d3-a456-426614174000")
        @RequestParam String userid, 
        @RequestBody CartItemEntity item) {
        UUID userId = UUID.fromString(userid);
        return ResponseEntity.ok(cartUseCase.addItemToCart(userId, item.getProduct(), item.getQuantity(), item.getName()));
    }

    @Operation(
        summary = "Limpar carrinho",
        description = "Remove todos os itens do carrinho do usuário"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Carrinho limpo com sucesso"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Token de autenticação inválido",
            content = @Content(mediaType = "application/json")
        )
    })
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(
        @Parameter(description = "ID do usuário", example = "123e4567-e89b-12d3-a456-426614174000")
        @RequestParam String userid) {
        UUID userId = UUID.fromString(userid);
        cartUseCase.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Remover item do carrinho",
        description = "Remove um item específico do carrinho pelo ID do item"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Item removido com sucesso"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Item não encontrado",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Token de autenticação inválido",
            content = @Content(mediaType = "application/json")
        )
    })
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeItem(
        @Parameter(description = "ID do item do carrinho", example = "123e4567-e89b-12d3-a456-426614174000")
        @PathVariable UUID itemId) {
        cartUseCase.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Atualizar quantidade do item",
        description = "Atualiza a quantidade de um item específico no carrinho"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Quantidade atualizada com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = CartItemEntity.class)
            )
        ),
        @ApiResponse(
            responseCode = "204",
            description = "Item removido (quantidade = 0)",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Item não encontrado",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Quantidade inválida",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Token de autenticação inválido",
            content = @Content(mediaType = "application/json")
        )
    })
    @PutMapping("/{itemId}/quantity")
    public ResponseEntity<CartItemEntity> updateQuantity(
        @Parameter(description = "ID do item do carrinho", example = "123e4567-e89b-12d3-a456-426614174000")
        @PathVariable UUID itemId, 
        @Parameter(description = "Nova quantidade do item", example = "3")
        @RequestParam int quantity) {
        CartItemEntity updatedItem = cartUseCase.updateQuantity(itemId, quantity);
        if (updatedItem == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(updatedItem);
    }

}
