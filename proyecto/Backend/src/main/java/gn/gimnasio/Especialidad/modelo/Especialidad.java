package gn.gimnasio.Especialidad.modelo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import gn.gimnasio.Instructor.modelo.InstructorEspecialidad;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Especialidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id_especialidad;
    String nombre;

    // Relación con la entidad Instructor
    // Esta anotación indica “a Jackson” que esto no debe seguir serializándose
    @OneToMany(mappedBy = "especialidad",fetch = FetchType.LAZY)
    @JsonManagedReference("especialidad_instructor")
    private List<InstructorEspecialidad> instructorEspecialidades;

}
