package com.urbanfood.cart;

import com.urbanfood.product.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart createCart(Product product, String userId) {
        Optional<Cart> cartOptional = cartRepository.findByUserId(userId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();

            // Check if the product already exists in the cart
            boolean productExists = cart.getProducts().stream()
                    .anyMatch(p -> p.getId().equals(product.getId()));

            if (!productExists) {
                cart.getProducts().add(product); // Add the product if it doesn't exist
                cart.setTotalAmount(cart.getTotalAmount() + product.getPrice()); // Update the total amount
                return cartRepository.save(cart); // Save the updated cart
            } else {
                throw new RuntimeException("Product already exists in the cart!");
            }
        } else {
            // If the cart does not exist, create a new one
            Cart cart = new Cart();
            cart.setUserId(userId);
            cart.getProducts().add(product); // Add the product
            cart.setTotalAmount(product.getPrice()); // Set the total amount
            return cartRepository.save(cart); // Save the new cart
        }
    }

    public Cart getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));
    }

    public int cartItemCount(String userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        return cart != null ? cart.getProducts().size() : 0;
    }

    public Cart removeFromCart(String userId, String productId) {
        // Find the cart for the given user ID
        Optional<Cart> cartOptional = cartRepository.findByUserId(userId);

        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();

            // Find the product to remove
            Optional<Product> productToRemove = cart.getProducts().stream()
                    .filter(p -> p.getId().equals(productId))
                    .findFirst();

            if (productToRemove.isPresent()) {
                // Remove the product and update the total amount
                cart.getProducts().remove(productToRemove.get());
                cart.setTotalAmount(cart.getTotalAmount() - productToRemove.get().getPrice());
                return cartRepository.save(cart); // Save the updated cart
            } else {
                throw new RuntimeException("Product not found in the cart!");
            }
        } else {
            throw new RuntimeException("Cart not found for user ID: " + userId);
        }
    }

    public void clearCart(String userId) {
        Optional<Cart> cartOptional = cartRepository.findByUserId(userId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            cart.getProducts().clear(); // Clear the products list
            cart.setTotalAmount(0.0); // Reset the total amount
            cartRepository.save(cart); // Save the updated cart
        } else {
            throw new RuntimeException("Cart not found for user ID: " + userId);
        }
    }
}