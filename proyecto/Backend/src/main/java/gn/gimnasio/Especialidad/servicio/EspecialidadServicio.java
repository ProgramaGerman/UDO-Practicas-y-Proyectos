package gn.gimnasio.Especialidad.servicio;

import gn.gimnasio.Especialidad.modelo.Especialidad;
import gn.gimnasio.Especialidad.repositorio.EspecialidadRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadServicio implements IEspecialidadServicio {

    @Autowired
    EspecialidadRepositorio especialidadRepositorio;

    @Override
    public List<Especialidad> obtenerEspecialidad() {
        return especialidadRepositorio.findAll();
    }

    @Override
    public Especialidad registrarEspecialidad(Especialidad especialidad) {
        return especialidadRepositorio.save(especialidad);
    }

    /** Obtiene una lista paginada de especialidades.*/
    @Override
    public Page<Especialidad> listarEspecialidadesPaginados(Pageable pageable) {
        return especialidadRepositorio.findAll((pageable));
    }

}
