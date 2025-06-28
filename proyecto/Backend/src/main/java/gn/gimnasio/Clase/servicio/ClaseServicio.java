// ClaseServicio es la implementación del servicio para las clases en el gimnasio.

package gn.gimnasio.Clase.servicio;

import gn.gimnasio.Clase.dto.ClaseDTO;
import gn.gimnasio.Clase.dto.ClaseRegisterDTO;
import gn.gimnasio.Clase.modelo.Clase;
import gn.gimnasio.Clase.repositorio.ClaseRepositorio;
import gn.gimnasio.Instructor.Repositorio.InstructorRepositorio;
import gn.gimnasio.Instructor.modelo.Instructor;
import gn.gimnasio.Sala.modelo.Sala;
import gn.gimnasio.Sala.repositorio.SalaRepositorio;
import gn.gimnasio.categoria.modelo.Categoria;
import gn.gimnasio.categoria.repositorio.CategoriaRepositorio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // marcar esta clase como un componente de servicio en Spring.
public class ClaseServicio implements IClaseServicio {

    @Autowired // Inyeccion de dependencia
    private ClaseRepositorio claseRepositorio;

    @Autowired
    private InstructorRepositorio instructorRepositorio;

    @Autowired
    private SalaRepositorio salaRepositorio;

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;

    //Metodo para convertir una entidad clase a su dto correspondiente.
    private ClaseDTO toDTO(Clase c) {
        ClaseDTO dto = new ClaseDTO();
        dto.setId(c.getId_clase());
        dto.setNombre(c.getNombre());
        dto.setCapacidad(c.getCapacidad());
        dto.setInstructor(c.getInstructor().getNombre() + " " + c.getInstructor().getApellido());
        dto.setCategoria(c.getCategoria().getNombre());
        dto.setSala(c.getSala().getNombre());
         dto.setDuracion(c.getDuracion());
        dto.setEstado(c.getEstado().name());
        return dto;
    }

    //Metodo para registrar la clase
    @Override
    public Clase registrarClase(ClaseRegisterDTO dto) {
        // Buscar las entidades relacionadas por ID
        Instructor instructor = instructorRepositorio.findById(dto.getId_instructor())
                .orElseThrow(() -> new EntityNotFoundException("Instructor no encontrado"));

        Categoria categoria = categoriaRepositorio.findById(dto.getId_categoria())
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada"));

        Sala sala = salaRepositorio.findById(dto.getId_sala())
                .orElseThrow(() -> new EntityNotFoundException("Sala no encontrada"));

        // Crear la entidad Clase con las relaciones
        Clase nuevaClase = Clase.fromDTO(dto, instructor, categoria, sala);

        return claseRepositorio.save(nuevaClase);
    }

    @Override
    public Page<ClaseDTO> listarClasesPaginadas(Pageable pageable) {
        return claseRepositorio.findAll(pageable).map(this::toDTO);
    }

    @Override
    public List<Clase> listarClases() {
        return claseRepositorio.findAll();
    }

    @Override
    public Clase agregarClase(Clase clase) {
        return claseRepositorio.save(clase);
    }

    @Override
    public Clase buscarClase(Integer id_clase) {
        Clase clase = claseRepositorio.findById(id_clase).orElse(null);
        return clase;
    }


}