package com.cts.order.Service;

import com.cts.order.model.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
public interface OrderService {
    public List<Order> getAllOrders() ;

    public String addOrder(Order order) ;
}
