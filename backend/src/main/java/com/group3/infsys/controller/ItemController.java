package com.group3.infsys.controller;

import com.group3.infsys.model.Item;
import com.group3.infsys.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/item")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/add")
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @GetMapping("/{id}")
    public Item getItem(@PathVariable("id") long id) {
        Optional<Item> item = itemService.getItem(id);
        if (item.isPresent()) return item.get();
        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Item Not Found");
    }
}
