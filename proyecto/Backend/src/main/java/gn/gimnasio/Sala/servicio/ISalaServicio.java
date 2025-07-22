package gn.gimnasio.Sala.servicio;

import gn.gimnasio.Sala.modelo.Sala;

import java.util.List;

public interface ISalaServicio {

    List<Sala> listarSalas();

    Sala agregarSala(Sala sala);
}
