package gn.gimnasio.Instructor.Servicio;

import gn.gimnasio.Instructor.dto.*;
import gn.gimnasio.Instructor.dto.InstructorBasicDTO;
import gn.gimnasio.Instructor.modelo.Instructor;
import gn.gimnasio.Instructor.Repositorio.InstructorRepositorio;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para la gestión de instructores en el gimnasio.
 * Proporciona métodos para listar, agregar y paginar instructores.
 */

@Service
public class InstructorServicio implements IInstructorServicio {

    private final InstructorRepositorio instructorRepositorio;

    /** Inyección de dependencias del repositorio de instructores. */
    @Autowired
    public InstructorServicio(InstructorRepositorio instructorRepositorio) {
        this.instructorRepositorio = instructorRepositorio;
    }

    @Override
    public List<Instructor> obtenerEspecialidad() {
        return instructorRepositorio.findAll();
    }


    /** Guarda un nuevo instructor en la base de datos. */
    @Override
    public Instructor agregarInstructor(Instructor instructor) {
        return instructorRepositorio.save(instructor);
    }

    /** Obtiene una lista paginada de instructores. */
    @Override
    public Page<Instructor> listarInstructoresPaginados(Pageable pageable) {
        return instructorRepositorio.findAll((pageable));
    }


    @Override
    public List<InstructorBasicDTO> listarInstructorBasico() {
        return instructorRepositorio.findAll()
                .stream()
                .map(i -> {
                    // Convertir cada Instructor en InstructorBasicDTO
                    InstructorBasicDTO dto = new InstructorBasicDTO(i);
                    return dto;
                })
                .toList();
    }


    @Override
    public Page<NuevoInstructorDTO> obtenerInstructoresPaginados(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Instructor> instructoresPage = instructorRepositorio.findAllWithEspecialidades(pageable);

        // Convertir a DTO
        List<NuevoInstructorDTO> dtos = instructoresPage.getContent()
                .stream()
                .map(NuevoInstructorDTO::new)
                .collect(Collectors.toList());

        return new PageImpl<>(dtos, pageable, instructoresPage.getTotalElements());
    }

    @Override
    @Transactional
    public Instructor editarInstructor(Integer id, EditarInstructorDTO dto) {
        Instructor instructor = instructorRepositorio.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instructor no encontrado"));

        instructor.actualizarDesdeDTO(dto);
        return instructorRepositorio.save(instructor);
    }
}
