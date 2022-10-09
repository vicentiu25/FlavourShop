package msg.skillup.service;

import msg.skillup.converter.IngredientConverter;
import msg.skillup.dto.IngredientDTO;
import msg.skillup.model.Ingredient;
import msg.skillup.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class IngredientService {
    @Autowired
    private IngredientRepository ingredientRepository;

    public List<IngredientDTO> getAllIngredients() {
        List<Ingredient> ingredients = ingredientRepository.findAll();
        return IngredientConverter.convertEntitiesToDTOs(ingredients);
    }
}
