package gn.gimnasio.Instructor.Servicio;

import gn.gimnasio.Instructor.dto.EditarInstructorDTO;
import gn.gimnasio.Instructor.dto.InstructorBasicDTO;
import gn.gimnasio.Instructor.dto.NuevoInstructorDTO;
import gn.gimnasio.Instructor.modelo.Instructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IInstructorServicio {


    List<Instructor> obtenerEspecialidad();

    //Metodo para agregar un instructor necesario para el formulario
    Instructor agregarInstructor(Instructor instructor);

    // Nuevo metodo para lista Instructores Paginados
    Page<Instructor> listarInstructoresPaginados(Pageable pageable);

    // Para poblar el <select>: solo id y nombre
    List<InstructorBasicDTO> listarInstructorBasico();

    // Editar un instructor
    Instructor editarInstructor(Integer id, EditarInstructorDTO dto);


    Page<NuevoInstructorDTO> obtenerInstructoresPaginados(int page, int size);
}
