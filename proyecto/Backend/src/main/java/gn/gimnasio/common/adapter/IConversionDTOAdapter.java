package gn.gimnasio.common.adapter;

/**
 * Adaptador genérico para la conversión entre entidades y DTOs en el sistema de gimnasio.
 * Proporciona métodos estándar para la transformación bidireccional de datos.
 * 
 * @param <E> Tipo de la entidad
 * @param <D> Tipo del DTO
 * @author Sistema Gimnasio
 */
public interface IConversionDTOAdapter<E, D> {
    
    /**
     * Convierte una entidad a su DTO correspondiente.
     * 
     * @param entidad Entidad a convertir
     * @return DTO resultante de la conversión
     * @throws IllegalArgumentException Si la entidad es nula
     */
    D entidadADTO(E entidad);
    
    /**
     * Convierte un DTO a su entidad correspondiente.
     * 
     * @param dto DTO a convertir
     * @return Entidad resultante de la conversión
     * @throws IllegalArgumentException Si el DTO es nulo
     */
    E dtoAEntidad(D dto);
    
    /**
     * Actualiza una entidad existente con los datos de un DTO.
     * 
     * @param entidadExistente Entidad a actualizar
     * @param dto DTO con los nuevos datos
     * @return Entidad actualizada
     * @throws IllegalArgumentException Si algún parámetro es nulo
     */
    E actualizarEntidadDesdeDTO(E entidadExistente, D dto);
}
