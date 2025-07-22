package gn.gimnasio.Instructor.controlador;

import gn.gimnasio.Instructor.dto.EditarInstructorDTO;
import gn.gimnasio.Instructor.dto.InstructorBasicDTO;
import gn.gimnasio.Instructor.dto.InstructorPostDTO;
import gn.gimnasio.Instructor.dto.NuevoInstructorDTO;
import gn.gimnasio.Instructor.modelo.Instructor;
import gn.gimnasio.lincenciaInstructor.dto.LicenciaDTO;
import gn.gimnasio.lincenciaInstructor.modelo.Licencia;
import gn.gimnasio.lincenciaInstructor.servicio.LicenciaServicio;
import gn.gimnasio.Instructor.Servicio.IInstructorServicio;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/gimnasio-app/instructores")
@CrossOrigin("http://localhost:4200")
public class InstructorControlador {

    @Autowired
    private IInstructorServicio instructorServicio;

    
    @Autowired
    private LicenciaServicio licenciaServicio;

    private static final Logger logger = LoggerFactory.getLogger(InstructorControlador.class);

    @GetMapping("/paginado")
    public ResponseEntity<Page<Instructor>> listarPaginado(Pageable pageable) {
        return ResponseEntity.ok(instructorServicio.listarInstructoresPaginados(pageable));
    }

    @GetMapping("/simple")
    public ResponseEntity<List<InstructorBasicDTO>> listarSimple() {
        return ResponseEntity.ok(instructorServicio.listarInstructorBasico());
    }

    @GetMapping("/Nuevo")
    public ResponseEntity<Page<NuevoInstructorDTO>> getInstructoresPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<NuevoInstructorDTO> result = instructorServicio.obtenerInstructoresPaginados(page, size);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/registrar")
    public ResponseEntity<Instructor> RegistrarInstructor(@RequestBody InstructorPostDTO instructorPostDTO) {
        logger.info("DTO recibido: {}", instructorPostDTO);

        Instructor instruc = new Instructor(instructorPostDTO);
        Instructor instructorGuardado = instructorServicio.agregarInstructor(instruc);

        return ResponseEntity.status(HttpStatus.CREATED).body(instructorGuardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instructor> actualizarInstructor(
            @PathVariable Integer id,
            @Valid @RequestBody EditarInstructorDTO dto) {

        Instructor actualizado = instructorServicio.editarInstructor(id, dto);
        return ResponseEntity.ok(actualizado);
    }

     //  endpoint para crear instructor + licencia en un solo llamado
    @PostMapping(value = "/registrar-con-licencia", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registrarConLicencia(
            @RequestPart("datos") @Valid InstructorPostDTO dto,
            @RequestPart("licencia") MultipartFile licenciaFile) throws IOException {

        Instructor nuevo = new Instructor(dto);
        Instructor guardado = instructorServicio.agregarInstructor(nuevo);

        // Guardar la licencia con el ID recién generado
        Licencia lic = licenciaServicio.guardar(
            guardado.getId_instructor(),  
            licenciaFile
        );

        LicenciaDTO licenciaDto = new LicenciaDTO(
            lic.getId(),
            guardado.getId_instructor(),
            lic.getFilename(),
            lic.getFilepath(),
            lic.getUploadedAt()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                    "instructor", guardado,
                    "licencia", licenciaDto
                ));
    }

}
