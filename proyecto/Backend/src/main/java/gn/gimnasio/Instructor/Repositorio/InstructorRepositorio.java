package gn.gimnasio.Instructor.Repositorio;

import gn.gimnasio.Instructor.modelo.Instructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Repositorio para la entidad Instructor.
 * Extiende JpaRepository para proporcionar métodos CRUD de forma automática.
 */
public interface InstructorRepositorio extends JpaRepository<Instructor,Integer>{

//    // Consulta personalizada para cargar relaciones
//    @Query("SELECT i FROM Instructor i " +
//            "LEFT JOIN FETCH i.instructorEspecialidades ie " +
//            "LEFT JOIN FETCH ie.especialidad")
//    Page<Instructor> findAllWithEspecialidades(Pageable pageable);

    @Query(
            value = "SELECT DISTINCT i FROM Instructor i LEFT JOIN FETCH i.instructorEspecialidades",
            countQuery = "SELECT COUNT(DISTINCT i) FROM Instructor i"
    )
    Page<Instructor> findAllWithEspecialidades(Pageable pageable);
}


