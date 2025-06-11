package gn.gimnasio.repositorio;

import gn.gimnasio.modelo.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio para la entidad Instructor.
 * Extiende JpaRepository para proporcionar métodos CRUD de forma automática.
 */
public interface InstructorRepositorio extends JpaRepository<Instructor,Integer>{ }


