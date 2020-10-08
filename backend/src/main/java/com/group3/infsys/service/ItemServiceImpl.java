package com.group3.infsys.service;

import com.group3.infsys.model.Item;
import com.group3.infsys.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    public Optional<Item> getItem(long id) {
        return itemRepository.findById(id);
    }
}
