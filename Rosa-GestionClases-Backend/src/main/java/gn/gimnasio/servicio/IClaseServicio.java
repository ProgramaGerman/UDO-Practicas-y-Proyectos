package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Clase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IClaseServicio {

    //Metodo para Mostrar Clases
    List<Clase> listarClases();

    Clase agregarClase(Clase clase);

    // Nuevo metodo para lista Instructores Paginados
    Page<Clase> listarClasesPaginadas(Pageable pageable);

    Clase buscarClase(Integer id_clase);

    void eliminarClase(Integer id_clase);
}
