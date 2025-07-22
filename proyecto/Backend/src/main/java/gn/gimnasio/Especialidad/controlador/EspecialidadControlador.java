package gn.gimnasio.Especialidad.controlador;

import gn.gimnasio.Especialidad.dto.EspecialidadDTO;
import gn.gimnasio.Especialidad.modelo.Especialidad;
import gn.gimnasio.Especialidad.servicio.EspecialidadServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gimnasio-app/especialidades")
@CrossOrigin("http://localhost:4200")
public class EspecialidadControlador {

    @Autowired
    private EspecialidadServicio especialidadServicio;

    private static final Logger logger = LoggerFactory.getLogger(EspecialidadControlador.class);

    // Lista de todas las especialidades
    @GetMapping
    public List<Especialidad> listar() {
        return especialidadServicio.obtenerEspecialidad();
    }

    //Registra especialidad
    @PostMapping
    public ResponseEntity<Especialidad> crear(@RequestBody EspecialidadDTO especialidadDTO) {
        logger.info("DTO recibido: {}", especialidadDTO);

        // Convertir DTO a Entidad
        Especialidad especialidad = new Especialidad();
        especialidad.setNombre(especialidadDTO.getNombre());

        // Guardar en base de datos
        Especialidad especialidadGuardada = especialidadServicio.registrarEspecialidad(especialidad);

        return ResponseEntity.status(HttpStatus.CREATED).body(especialidadGuardada);
    }

    //Obtener especialidades paginadas
    @GetMapping("/Paginados")
    public ResponseEntity<Page<Especialidad>> listarEspecialidadesPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDirection) {

        // Configurar ordenamiento
        Sort.Direction direction = Sort.Direction.ASC;
        if(sortDirection != null && sortDirection.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(direction, sortBy != null ? sortBy : "nombre")
        );
        return ResponseEntity.ok(especialidadServicio.listarEspecialidadesPaginados(pageable));
    }
}
