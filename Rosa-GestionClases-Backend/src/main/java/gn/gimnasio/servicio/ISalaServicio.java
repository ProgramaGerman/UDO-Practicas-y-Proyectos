package gn.gimnasio.servicio;

import gn.gimnasio.modelo.Sala;

import java.util.List;

public interface ISalaServicio {

    List<Sala> listarSalas();

    Sala agregarSala(Sala sala);
}
