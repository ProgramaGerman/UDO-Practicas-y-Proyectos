package gn.gimnasio.Especialidad.servicio;

import gn.gimnasio.Especialidad.modelo.Especialidad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IEspecialidadServicio {

    List<Especialidad> obtenerEspecialidad();

    Especialidad registrarEspecialidad(Especialidad especialidad);

    Page<Especialidad> listarEspecialidadesPaginados(Pageable pageable);

}
