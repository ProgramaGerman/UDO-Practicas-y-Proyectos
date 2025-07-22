package gn.gimnasio.Clase.controlador;

import gn.gimnasio.Clase.dto.ClaseDTO;
import gn.gimnasio.Clase.dto.ClaseRegisterDTO;
import gn.gimnasio.Clase.modelo.Clase;
import gn.gimnasio.Clase.servicio.IClaseServicio;
  import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gimnasio-app/clases")
@CrossOrigin("http://localhost:4200")
public class ClaseControlador {

    private static final Logger logger = LoggerFactory.getLogger(ClaseControlador.class);

    @Autowired
    private IClaseServicio claseServicio;

    // obtener datos pageable de la claseDTO
    @GetMapping
    public ResponseEntity<Page<ClaseDTO>> listar(Pageable pageable) {
        // Automatismo paginado: resuelve page, size, sort...
        Page<ClaseDTO> page = claseServicio.listarClasesPaginadas(pageable);
        return ResponseEntity.ok(page);
    }

    @PostMapping("/crear")
    public ResponseEntity<Clase> crearClase(@RequestBody ClaseRegisterDTO dto) {
        Clase claseCreada = claseServicio.registrarClase(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(claseCreada);
    }
}
