package gn.gimnasio.Clase.modelo;

import gn.gimnasio.Clase.dto.ClaseRegisterDTO;
import gn.gimnasio.Instructor.modelo.Instructor;
import gn.gimnasio.Sala.modelo.Sala;
import gn.gimnasio.categoria.modelo.Categoria;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_instructor")
    private Instructor instructor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sala")
    private Sala sala;

    // Metodo estatico para crear una instancia de clases
    public static Clase fromDTO(ClaseRegisterDTO dto, Instructor instructor, Categoria categoria, Sala sala) {
        Clase clase = new Clase();
        clase.setNombre(dto.getNombre());
        clase.setCapacidad(dto.getCapacidad());
        clase.setDescripcion(dto.getDescripcion());
        clase.setInstructor(instructor);
        clase.setCategoria(categoria);
        clase.setSala(sala);
        return clase;
    }
}
