package gn.gimnasio.modelo;

import jakarta.persistence.*;
import lombok.*;
/**
 * Representa a un instructor en el sistema de gimnasio.
 * Utiliza JPA para la persistencia y Lombok para reducir código.
 */
@Entity
@Data // Genera automáticamente métodos como toString, equals, y hashCode
@NoArgsConstructor // Constructor sin argumentos requerido por JPA
@AllArgsConstructor // Constructor con todos los atributos
public class Instructor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id_instructor;
    String nombre;
    String apellido;
    String telefono;
    String correo;
    String cedula;
}
