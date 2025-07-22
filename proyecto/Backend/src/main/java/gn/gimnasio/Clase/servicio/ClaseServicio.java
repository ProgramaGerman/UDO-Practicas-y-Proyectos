// ClaseServicio es la implementación del servicio para las clases en el gimnasio.
// Refactorizado para usar el patrón Adapter para conversiones DTO.

package gn.gimnasio.Clase.servicio;

import gn.gimnasio.Clase.adapter.ClaseDTOAdapter;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // marcar esta clase como un componente de servicio en Spring.
public class ClaseServicio implements IClaseServicio {

    private static final Logger logger = LoggerFactory.getLogger(ClaseServicio.class);

    @Autowired // Inyeccion de dependencia
    private ClaseRepositorio claseRepositorio;

    @Autowired
    private InstructorRepositorio instructorRepositorio;

    @Autowired
    private SalaRepositorio salaRepositorio;

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;
    
    @Autowired
    private ClaseDTOAdapter claseDTOAdapter;

    /**
     * Método refactorizado para convertir una entidad clase a su DTO correspondiente.
     * Ahora utiliza el adaptador para centralizar la lógica de conversión.
     */
    private ClaseDTO convertirEntidadADTO(Clase clase) {
        try {
            return claseDTOAdapter.entidadADTO(clase);
        } catch (Exception e) {
            logger.error("Error al convertir entidad Clase a DTO. ID: {}, Error: {}", 
                        clase.getId_clase(), e.getMessage(), e);
            throw new RuntimeException("Error en conversión de entidad a DTO", e);
        }
    }

    /**
     * Método para registrar una nueva clase.
     * Mejorado con logging y manejo de errores.
     */
    @Override
    public Clase registrarClase(ClaseRegisterDTO dto) {
        logger.info("Registrando nueva clase: {}", dto.getNombre());
        
        try {
            // Buscar las entidades relacionadas por ID
            Instructor instructor = instructorRepositorio.findById(dto.getId_instructor())
                    .orElseThrow(() -> {
                        logger.error("Instructor no encontrado con ID: {}", dto.getId_instructor());
                        return new EntityNotFoundException("Instructor no encontrado con ID: " + dto.getId_instructor());
                    });

            Categoria categoria = categoriaRepositorio.findById(dto.getId_categoria())
                    .orElseThrow(() -> {
                        logger.error("Categoría no encontrada con ID: {}", dto.getId_categoria());
                        return new EntityNotFoundException("Categoría no encontrada con ID: " + dto.getId_categoria());
                    });

            Sala sala = salaRepositorio.findById(dto.getId_sala())
                    .orElseThrow(() -> {
                        logger.error("Sala no encontrada con ID: {}", dto.getId_sala());
                        return new EntityNotFoundException("Sala no encontrada con ID: " + dto.getId_sala());
                    });

            // Crear la entidad Clase con las relaciones
            Clase nuevaClase = Clase.fromDTO(dto, instructor, categoria, sala);
            Clase claseGuardada = claseRepositorio.save(nuevaClase);
            
            logger.info("Clase registrada exitosamente con ID: {}", claseGuardada.getId_clase());
            return claseGuardada;
            
        } catch (EntityNotFoundException e) {
            throw e; // Re-lanzar excepciones de entidad no encontrada
        } catch (Exception e) {
            logger.error("Error inesperado al registrar clase: {}", e.getMessage(), e);
            throw new RuntimeException("Error al registrar la clase", e);
        }
    }

    @Override
    public Page<ClaseDTO> listarClasesPaginadas(Pageable pageable) {
        logger.info("Listando clases paginadas. Página: {}, Tamaño: {}", 
                   pageable.getPageNumber(), pageable.getPageSize());
        
        try {
            return claseRepositorio.findAll(pageable).map(this::convertirEntidadADTO);
        } catch (Exception e) {
            logger.error("Error al listar clases paginadas: {}", e.getMessage(), e);
            throw new RuntimeException("Error al obtener clases paginadas", e);
        }
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