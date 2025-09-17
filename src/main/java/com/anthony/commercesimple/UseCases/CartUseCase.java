package com.anthony.commercesimple.UseCases;


import com.anthony.commercesimple.Entity.CartItemEntity;
import com.anthony.commercesimple.Entity.ProductEntity;
import com.anthony.commercesimple.Entity.UserEntity;
import com.anthony.commercesimple.Repository.CartRepository;
import com.anthony.commercesimple.Repository.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartUseCase {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private AuthUserRepository userRepository;


    public List<CartItemEntity> getCartByUser(UUID userId) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return cartRepository.findByUserid(user);
    }

    public CartItemEntity addItemToCart(UUID userId, ProductEntity product, int quantity, String name) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
        Optional<CartItemEntity> existing = cartRepository.findByUseridAndProduct_ProductId(user, product.getProductId());
        if (existing.isPresent()) {
            CartItemEntity item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartRepository.save(item);
        } else {
            CartItemEntity item = new CartItemEntity();
            item.setUserid(user);
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setName(name);
            return cartRepository.save(item);
        }
    }

    public void removeItem (UUID cartItemId){
        cartRepository.deleteById(cartItemId);
    }

    public void clearCart(UUID userId) {
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        List<CartItemEntity> items = cartRepository.findByUserid(user);
        cartRepository.deleteAll(items);
    }

    public CartItemEntity updateQuantity(UUID cartItemId, int newQuantity) {
        CartItemEntity item = cartRepository.findById(cartItemId)
            .orElseThrow(() -> new RuntimeException("Item do carrinho não encontrado"));
        
        if (newQuantity <= 0) {
            cartRepository.deleteById(cartItemId);
            return null;
        }
        
        item.setQuantity(newQuantity);
        return cartRepository.save(item);
    }


}
