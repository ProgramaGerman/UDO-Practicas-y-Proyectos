package gn.gimnasio.categoria.servicio;

import gn.gimnasio.categoria.modelo.Categoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICategoriaServicio {
    // Mostrar categorias
    List<Categoria> listarCategoria();

    Categoria agregarCategoria(Categoria categoria);

    // Nuevo metodo para lista Categorias Paginados
    Page<Categoria> listarCategoriasPaginados(Pageable pageable);
}