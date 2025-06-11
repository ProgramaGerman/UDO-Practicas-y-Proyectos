package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Instructor;
import gn.gimnasio.repositorio.InstructorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/** Servicio para la gestión de instructores en el gimnasio.
 * Proporciona métodos para listar, agregar y paginar instructores.*/

@Service
public class InstructorServicio implements IInstructorServicio{

    private final InstructorRepositorio instructorRepositorio;

    /**Inyección de dependencias del repositorio de instructores.*/
    @Autowired
    public InstructorServicio(InstructorRepositorio instructorRepositorio) {
        this.instructorRepositorio = instructorRepositorio;
    }

    /** Obtiene una lista con todos los instructores registrados.*/
    @Override
    public List<Instructor> listarInstructor() {
        return instructorRepositorio.findAll();
    }

    /** Guarda un nuevo instructor en la base de datos.*/
    @Override
    public Instructor agregarInstructor(Instructor instructor) {
      return instructorRepositorio.save(instructor);
    }

    /** Obtiene una lista paginada de instructores.*/
    @Override
    public Page<Instructor> listarInstructoresPaginados(Pageable pageable) {
        return instructorRepositorio.findAll((pageable));
    }
}
