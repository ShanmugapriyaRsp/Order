package com.cts.order.controller;

import com.cts.order.Service.OrderService;
import com.cts.order.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@CrossOrigin("http://localhost:5173")
public class OrderControllerImpl implements OrderController{
    @Autowired
    private OrderService orderService;

    @Override
    @GetMapping("/getOrders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return new ResponseEntity<>( orderService.getAllOrders(), HttpStatusCode.valueOf(200));
    }

    @Override
    @PostMapping("/saveOrders")
    public ResponseEntity<String> addOrder(Order order) {
        return new ResponseEntity<>(orderService.addOrder(order),HttpStatusCode.valueOf(200));
    }
}
