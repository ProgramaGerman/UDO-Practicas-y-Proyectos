package gn.gimnasio.modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Clase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id_clase;
    String nombre;
    String descripcion;
    @Column(name = "fecha_inicio")
    LocalDate fecha_inicio;
    @Column(name="hora_inicio")
    LocalTime hora_inicio;
    @Column(name = "fecha_final")
    LocalDate fecha_final;
    @Column(name="hora_final")
    LocalTime hora_final;
    Integer duracion;
    Integer capacidad;
    @Enumerated(EnumType.STRING)
    Estado estado = Estado.Disponible;
    Integer id_instructor;
    Integer id_categoria;
    Integer id_sala;
}

