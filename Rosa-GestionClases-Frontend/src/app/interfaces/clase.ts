export class Clase {
    id_clase!: number;
    nombre!: string;
    descripcion!: string; // Descripción de la clase
    fecha_inicio?: string; // Fecha de inicio (Formato 'YYYY-MM-DD', opcional)
    hora_inicio?: string; // Hora de inicio (Formato 'HH:mm:ss', opcional)
    fecha_final?: string; // Fecha de finalización (Formato 'YYYY-MM-DD', opcional)
    hora_final?: string; // Hora de finalización (Formato 'HH:mm:ss', opcional)
    duracion?: number; // Duración en minutos (opcional)
    capacidad!: number; // Capacidad máxima de participantes
    estado?: 'Disponible' | 'Llena' | 'Cancelada'; // Estado de la clase (tipo literal)
    id_instructor!: number; // ID del instructor asignado
    id_categoria!: number; // ID de la categoría de la clase
    id_sala!: number; // ID de la sala donde se llevará a cabo

}
