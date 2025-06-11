package gn.gimnasio.dto;

import java.util.List;

public class InstructorEspecialidadDTO {
    private Integer idInstructor;
    private List<Integer> categorias; // IDs de categorías

    // Getters y Setters
    public Integer getIdInstructor() {
        return idInstructor;
    }

    public void setIdInstructor(Integer idInstructor) {
        this.idInstructor = idInstructor;
    }

    public List<Integer> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Integer> categorias) {
        this.categorias = categorias;
    }

    // Método para compatibilidad con el controlador que espera especialidades
    public List<Integer> getEspecialidades() {
        return this.categorias;
    }

    public void setEspecialidades(List<Integer> especialidades) {
        this.categorias = especialidades;
    }
}
