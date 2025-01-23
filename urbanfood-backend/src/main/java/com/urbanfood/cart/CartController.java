package com.urbanfood.cart;

import com.urbanfood.product.Product;
import com.urbanfood.user.JwtService;
import com.urbanfood.user.User;
import com.urbanfood.user.UserRepository;
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
    ResponseEntity<Cart> createCart( @RequestHeader("Authorization") String token,@RequestBody Product product) {


        Optional<User> userId = findCartCustomerId(token);
        cartService.createCart(product, String.valueOf(userId));
        return ResponseEntity.ok().build();

    }

     @GetMapping("api/v1/cart/count")
     ResponseEntity<Integer> getCartCount(@RequestHeader("Authorization") String token) {
         Optional<User> userId = findCartCustomerId(token);
         int count = cartService.cartItemCount(String.valueOf(userId));
         return ResponseEntity.ok(count);
        }

//        public Optional<User> findCartCustomerId(String token){
//            String userName = jwtService.extractUsername(token);
//            return userRepository.findById(userName);
//
//        }

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
            return userRepository.findById(userName);
        } catch (Exception e) {
            // Log the exception for debugging
            System.out.println("Error extracting user from token: " + e.getMessage());
            return Optional.empty();
        }
    }



}