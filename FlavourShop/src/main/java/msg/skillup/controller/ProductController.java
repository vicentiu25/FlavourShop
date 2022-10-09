package msg.skillup.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import msg.skillup.converter.ProductConverter;
import msg.skillup.dto.OrderDTO;
import msg.skillup.dto.ProductDTO;
import msg.skillup.model.Product;
import msg.skillup.repository.ProductRepository;
import msg.skillup.service.ProductService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import javax.validation.Valid;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.SQLException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/products/findall")
    public ResponseEntity<List<ProductDTO>> getAll() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/products/{name}")
    public ResponseEntity<List<ProductDTO>> getProduct(@PathVariable String name) throws SQLException {
        return ResponseEntity.ok(productService.getProduct(name));
    }


    @GetMapping(value = "/image/{id}")
    public ResponseEntity<byte[]> getProductImage(@PathVariable Long id) throws SQLException {
        byte[] product = productService.getImage(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(product);
    }

    @PostMapping(value = "/product/save", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> uploadImage(@RequestPart("product") String product, @RequestPart("file") MultipartFile file) {
        if (file.getOriginalFilename() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            Gson gson = new Gson();
            ProductDTO productFromJson = gson.fromJson(product, ProductDTO.class);

            byte[] bytes = file.getBytes();
            Blob blob = new SerialBlob(bytes);
            productService.saveProductImage(ProductConverter.convertFromDTOtoEntity(productFromJson), blob);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/product/delete/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.delete(id);
    }


}