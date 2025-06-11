package gn.gimnasio.repositorio;

import gn.gimnasio.modelo.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepositorio extends JpaRepository<Categoria,Integer> { }
