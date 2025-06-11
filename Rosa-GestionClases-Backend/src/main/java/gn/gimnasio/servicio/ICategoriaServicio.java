package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Categoria;

import java.util.List;

public interface ICategoriaServicio {
    //Mostrar categorias
    List<Categoria> listarCategoria();

    Categoria agregarCategoria(Categoria categoria);
}
