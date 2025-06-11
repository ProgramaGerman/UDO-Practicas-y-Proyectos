package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Especialidad;
import gn.gimnasio.modelo.Categoria;
import gn.gimnasio.repositorio.EspecialidadRepositorio;
import gn.gimnasio.repositorio.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gn.gimnasio.modelo.Instructor;
import gn.gimnasio.repositorio.InstructorRepositorio;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EspecialidadServicio implements IEspecialidadRepositorio{

    @Autowired
    EspecialidadRepositorio especialidadRepositorio;

    @Autowired
    InstructorRepositorio instructorRepositorio;

    @Autowired
    CategoriaRepositorio categoriaRepositorio;

    @Transactional
    public void registrarEspecialidadesDeInstructor(Integer idInstructor, List<Integer> categoriaIds) {
        // Método actualizado para manejar categorías como especialidades
        Instructor instructor = instructorRepositorio.findById(idInstructor)
            .orElseThrow(() -> new RuntimeException("Instructor no encontrado con ID: " + idInstructor));
        
        for (Integer idCategoria : categoriaIds) {
            // Buscar la categoría para obtener su nombre
            Categoria categoria = categoriaRepositorio.findById(idCategoria)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + idCategoria));
            
            // Crear nueva especialidad basada en la categoría
            Especialidad especialidad = new Especialidad();
            especialidad.setNombre(categoria.getNombre());
            especialidad.setInstructor(instructor);
            
            // Guardar la especialidad en la tabla instructor_especialidades
            especialidadRepositorio.save(especialidad);
        }
    }

    @Override
    public List<Especialidad> obtenerEspecialidad() {
        return especialidadRepositorio.findAll();
    }

    @Override
    public Especialidad registrarEspecialidad(Especialidad especialidad) {
        return especialidadRepositorio.save(especialidad);
    }
}
