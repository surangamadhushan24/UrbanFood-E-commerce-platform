package com.urbanfood.cart;

import com.urbanfood.product.Product;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

   public void createCart(Product product, String userId) {

       Optional<Cart> cartOptional = cartRepository.findByUserId(userId);
       if(cartOptional.isPresent()) {
           Cart cart = cartOptional.get();
           cart.getProducts().add(product);
           cart.setTotalAmount(cart.getTotalAmount() + product.getPrice());
           cartRepository.save(cart);
        }
        else{
           Cart cart = new Cart();
           cart.setUserId(userId);
           cart.getProducts().add(product);
           cart.setTotalAmount(product.getPrice());
           cartRepository.save(cart);
        }


   }

   public int cartItemCount(String userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        return cart != null ? cart.getProducts().size() : 0;
   }


}
