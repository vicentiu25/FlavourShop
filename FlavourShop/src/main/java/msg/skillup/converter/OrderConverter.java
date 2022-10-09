package msg.skillup.converter;

import msg.skillup.dto.OrderDTO;
import msg.skillup.model.Order;
import msg.skillup.model.OrderProduct;

public class OrderConverter {
    public static OrderDTO convertFromEntityToDTO(OrderProduct orderProduct) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(orderProduct.getOrder().getIdOrder());
        orderDTO.setAddress(orderProduct.getOrder().getAddress());
        return orderDTO;
    }

    public static Order convertFromDTOToEntity(OrderDTO orderDTO){
       Order order = new Order();
       order.setAddress(orderDTO.getAddress());
       return order;
    }
}

