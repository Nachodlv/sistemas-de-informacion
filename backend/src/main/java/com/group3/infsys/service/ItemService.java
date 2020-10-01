package com.group3.infsys.service;

import com.group3.infsys.model.Item;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface ItemService {

    Item addItem(Item item);

    Optional<Item> getItem(long id);
}
