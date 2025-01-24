package com.urbanfood.order;

import com.urbanfood.product.Product;
import com.urbanfood.product.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository; // Inject ProductRepository

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public Order createOrder(Order order) {
        // Save the order
        Order savedOrder = orderRepository.save(order);

        // Increment the purchase count for each product in the order
        for (String productId : order.getProductIds()) {
            incrementProductPurchaseCount(productId);
        }

        return savedOrder;
    }

    private void incrementProductPurchaseCount(String productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setTimesPurchased(product.getTimesPurchased() + 1); // Increment purchase count
            productRepository.save(product); // Save the updated product
        }
    }
}