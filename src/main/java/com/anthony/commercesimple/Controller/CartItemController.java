package com.anthony.commercesimple.Controller;


import com.anthony.commercesimple.Entity.CartItemEntity;
import com.anthony.commercesimple.UseCases.CartUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/cart")
public class CartItemController {

    @Autowired
    private CartUseCase cartUseCase;

    @GetMapping("/get-items")
    public ResponseEntity<List<CartItemEntity>> getCart(@RequestParam String userid) {
        UUID userId = UUID.fromString(userid);
        return ResponseEntity.ok(cartUseCase.getCartByUser(userId));
    }

    @PostMapping("/")
    public ResponseEntity<CartItemEntity> addtoCart(@RequestParam String userid, @RequestBody CartItemEntity item) {
        UUID userId = UUID.fromString(userid);
        return ResponseEntity.ok(cartUseCase.addItemToCart(userId, item.getProduct(), item.getQuantity(), item.getName()));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestParam String userid) {
        UUID userId = UUID.fromString(userid);
        cartUseCase.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable UUID itemId) {
        cartUseCase.removeItem(itemId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{itemId}/quantity")
    public ResponseEntity<CartItemEntity> updateQuantity(@PathVariable UUID itemId, @RequestParam int quantity) {
        CartItemEntity updatedItem = cartUseCase.updateQuantity(itemId, quantity);
        if (updatedItem == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(updatedItem);
    }


}
