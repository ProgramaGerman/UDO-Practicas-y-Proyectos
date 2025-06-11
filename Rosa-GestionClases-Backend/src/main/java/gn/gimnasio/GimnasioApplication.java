package gn.gimnasio;

import gn.gimnasio.modelo.Clase;
import gn.gimnasio.modelo.Estado;
import gn.gimnasio.modelo.Instructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@SpringBootApplication
public class GimnasioApplication {

	public static void main(String[] args) {
		SpringApplication.run(GimnasioApplication.class, args);

		Instructor instructor = new Instructor();

		instructor.setNombre("Gilberto");
		instructor.setApellido("Velasquez");
		instructor.setTelefono("04129890131");
		instructor.setCedula("12345678");
		instructor.setCorreo("gilberto123rafael@gmail.com");
		System.out.println(instructor);
	}
}
