package com.cts.order.controller;


import com.cts.order.model.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


public interface OrderController {

    public ResponseEntity<List<Order>> getAllOrders();

    public ResponseEntity<String> addOrder(@RequestBody Order order) ;
}
