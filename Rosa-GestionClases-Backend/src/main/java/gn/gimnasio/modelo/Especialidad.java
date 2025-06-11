package gn.gimnasio.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Representa la entidad "Especialidad" en el sistema, la cual está asociada a un instructor.
 * 
 * <p>
 * Esta clase es una entidad JPA que mapea la tabla correspondiente en la base de datos.
 * Cada especialidad tiene un identificador único y está relacionada con un instructor específico.
 * </p>
 *
 * <ul>
 *   <li><b>id_especialidad</b>: Identificador único de la especialidad, generado automáticamente.</li>
 *   <li><b>instructor</b>: Referencia al instructor que posee esta especialidad. 
 *       Es una relación muchos-a-uno, lo que significa que varias especialidades pueden estar asociadas a un mismo instructor.
 *       Esta relación es obligatoria (no puede ser nula).</li>
 * </ul>
 *
 * <p>
 * La clase utiliza las anotaciones de Lombok (@Data, @AllArgsConstructor, @NoArgsConstructor) para generar automáticamente
 * los métodos getters, setters, constructores y otros métodos útiles.
 * </p>
 *
 * @author [German Equipo Rosa]
 * @version 1.0
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Especialidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_especialidad;

    private String nombre; // <-- AGREGAR ESTA LÍNEA


    @ManyToOne
    @JoinColumn(name = "id_instructor", nullable = false)
    private Instructor instructor;
}
