package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Especialidad;
import java.util.List;

public interface IEspecialidadRepositorio {

    List<Especialidad> obtenerEspecialidad();

    Especialidad registrarEspecialidad(Especialidad especialidad);
}
