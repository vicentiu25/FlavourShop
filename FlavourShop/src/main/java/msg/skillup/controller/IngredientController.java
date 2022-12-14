package msg.skillup.controller;

import msg.skillup.dto.IngredientDTO;
import msg.skillup.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class IngredientController {
    @Autowired
    private IngredientService ingredientService;

    @GetMapping("/ingredients/findall")
    public ResponseEntity<List<IngredientDTO>> getAll() {
        return ResponseEntity.ok(ingredientService.getAllIngredients());
    }
}
