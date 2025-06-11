package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Sala;
import gn.gimnasio.repositorio.SalaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaServicio implements ISalaServicio{
    @Autowired
    private SalaRepositorio salaRepositorio;

    @Override
    public List<Sala> listarSalas() {
        return salaRepositorio.findAll();
    }

    @Override
    public Sala agregarSala(Sala sala) {
        return salaRepositorio.save(sala);
    }
}
