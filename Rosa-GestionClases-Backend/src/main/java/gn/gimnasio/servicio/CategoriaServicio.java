package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Categoria;
import gn.gimnasio.repositorio.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
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

}
