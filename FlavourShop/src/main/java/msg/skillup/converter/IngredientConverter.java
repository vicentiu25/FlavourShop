package msg.skillup.converter;

import msg.skillup.dto.IngredientDTO;
import msg.skillup.model.Ingredient;

import java.util.List;
import java.util.stream.Collectors;

public class IngredientConverter {

    public static IngredientDTO convertFromEntityToDTO(Ingredient ingredient) {
        IngredientDTO ingredientDTO = new IngredientDTO();
        ingredientDTO.setIdIngredient(ingredient.getIdIngredient());
        ingredientDTO.setNameIngredient(ingredient.getNameIngredient());
        ingredientDTO.setPriceIngredient(ingredient.getPriceIngredient());
        return ingredientDTO;
    }

    public static List<IngredientDTO> convertEntitiesToDTOs(List<Ingredient> ingredients) {
        return ingredients.stream().map(IngredientConverter::convertFromEntityToDTO).collect(Collectors.toList());
    }
}
