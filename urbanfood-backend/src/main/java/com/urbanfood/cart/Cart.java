package com.urbanfood.cart;

import com.urbanfood.product.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "cart")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    private String id;
    private Double totalAmount = 0.0; // Ensure this is initialized to 0.0
    private List<Product> products = new ArrayList<>();
    private String userId;
}