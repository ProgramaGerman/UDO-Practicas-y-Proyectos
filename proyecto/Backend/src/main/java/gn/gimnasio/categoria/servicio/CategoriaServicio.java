package gn.gimnasio.categoria.servicio;

import gn.gimnasio.categoria.modelo.Categoria;
import gn.gimnasio.categoria.repositorio.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServicio implements ICategoriaServicio{

    @Autowired //Inyeccion de dependencia
    private CategoriaRepositorio categoriaRepositorio;

    @Override
    public List<Categoria> listarCategoria() {
        return categoriaRepositorio.findAll();
    }

    @Override
    public Categoria agregarCategoria(Categoria categoria) {
        return categoriaRepositorio.save(categoria);
    }

    /** Obtiene una lista paginada de categorias.*/
    @Override
    public Page<Categoria> listarCategoriasPaginados(Pageable pageable) {
        return categoriaRepositorio.findAll((pageable));
    }

}
