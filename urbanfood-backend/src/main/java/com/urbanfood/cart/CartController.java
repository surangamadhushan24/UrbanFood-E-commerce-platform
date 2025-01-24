package com.urbanfood.cart;

import com.urbanfood.product.Product;
import com.urbanfood.user.JwtService;
import com.urbanfood.user.User;
import com.urbanfood.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public CartController(CartService cartService, JwtService jwtService, UserRepository userRepository) {
        this.cartService = cartService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("api/v1/cart")
    public ResponseEntity<Cart> createCart(@RequestHeader("Authorization") String token, @RequestBody Product product) {
        try {
            // Find the user from the token
            User user = findCartCustomerId(token)
                    .orElseThrow(() -> new RuntimeException("User not found for token: " + token));

            // Get the user ID
            String userId = user.getId(); // Assuming User has a method like getId()

            // Create the cart with the user ID
            Cart cart = cartService.createCart(product, userId);
            return ResponseEntity.ok(cart); // Return the updated cart
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/api/v1/cart")
    public ResponseEntity<Cart> getCart(@RequestHeader("Authorization") String token) {
        try {
            User user = findCartCustomerId(token)
                    .orElseThrow(() -> new RuntimeException("User not found for token: " + token));

            String userId = user.getId();
            Cart cart = cartService.getCartByUserId(userId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("api/v1/cart/count")
    public ResponseEntity<Integer> getCartCount(@RequestHeader("Authorization") String token) {
        try {
            // Find the user from the token
            User user = findCartCustomerId(token)
                    .orElseThrow(() -> new RuntimeException("User not found for token: " + token));

            // Get the user ID
            String userId = user.getId();

            // Get the cart item count for the user
            int count = cartService.cartItemCount(userId);
            return ResponseEntity.ok(count);
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private Optional<User> findCartCustomerId(String token) {
        try {
            // Remove "Bearer " prefix if present and trim whitespace
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7).trim();
            } else {
                token = token.trim();
            }

            // Extract username from token
            String userName = jwtService.extractUsername(token);
            if (userName == null) {
                System.out.println("Token is invalid or does not contain a username");
                return Optional.empty();
            }

            // Find the user in the repository
            return userRepository.findByEmail(userName);
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Error extracting user from token: " + e.getMessage());
            return Optional.empty();
        }
    }

    @DeleteMapping("api/v1/cart/remove/{productId}")
    public ResponseEntity<Cart> removeFromCart(
            @RequestHeader("Authorization") String token,
            @PathVariable String productId
    ) {
        try {
            // Find the user from the token
            User user = findCartCustomerId(token)
                    .orElseThrow(() -> new RuntimeException("User not found for token: " + token));

            // Get the user ID
            String userId = user.getId();

            // Remove the product from the cart
            Cart cart = cartService.removeFromCart(userId, productId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("api/v1/cart/clear")
    public ResponseEntity<Void> clearCart(@RequestHeader("Authorization") String token) {
        try {
            // Find the user from the token
            User user = findCartCustomerId(token)
                    .orElseThrow(() -> new RuntimeException("User not found for token: " + token));

            // Get the user ID
            String userId = user.getId();

            // Clear the cart
            cartService.clearCart(userId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}