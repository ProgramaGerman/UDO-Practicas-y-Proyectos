//  * Representa a un instructor en el sistema de gimnasio.
//  * Utiliza JPA para la persistencia y Lombok para reducir código.
//dto para manejar una vista básica de los instructores

package gn.gimnasio.Instructor.dto;

import gn.gimnasio.Instructor.modelo.Instructor;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class InstructorBasicDTO {
    private Integer id;
    private String nombre;
    private String apellido;
    private List<String> especialidades;

    // Constructor que convierte un Instructor en InstructorBasicDTO
    public InstructorBasicDTO(Instructor instructor) {
        this.id = instructor.getId_instructor();
        this.nombre = instructor.getNombre();
        this.apellido = instructor.getApellido();
        // Convertimos la colección de entidades Especialidad a List<String> de nombres:
        this.especialidades = (instructor.getInstructorEspecialidades() != null)
                ? instructor.getInstructorEspecialidades()
                        .stream()
                        .map(instructorEspecialidad -> instructorEspecialidad.getEspecialidad().getNombre())
                        .collect(Collectors.toList())//
                : List.of(); // lista vacía si no tiene especialidades
    }
}
