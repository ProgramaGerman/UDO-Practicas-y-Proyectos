package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Instructor;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface IInstructorServicio {

    //Mostrar Instructores
    List<Instructor> listarInstructor();

    Instructor agregarInstructor(Instructor instructor);

    // Nuevo metodo para lista Instructores Paginados
    Page<Instructor> listarInstructoresPaginados(Pageable pageable);
}
