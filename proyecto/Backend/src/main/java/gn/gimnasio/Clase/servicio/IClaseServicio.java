//claseServicio es la interfaz que define los métodos para manejar las clases en el gimnasio.
// ClaseServicio es la implementación del servicio para las clases en el gimnasio.

package gn.gimnasio.Clase.servicio;
import gn.gimnasio.Clase.dto.ClaseDTO;
import gn.gimnasio.Clase.dto.ClaseRegisterDTO;
import gn.gimnasio.Clase.modelo.Clase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IClaseServicio {

    // Metodo para Mostrar Clases
    List<Clase> listarClases();

    //agregar una clase
    Clase agregarClase(Clase clase);

    // Nuevo metodo para lista clases Paginadas
    Page<ClaseDTO> listarClasesPaginadas(Pageable pageable);

    Clase registrarClase(ClaseRegisterDTO dto);

    //Buscar una clase
    Clase buscarClase(Integer id_clase);

}