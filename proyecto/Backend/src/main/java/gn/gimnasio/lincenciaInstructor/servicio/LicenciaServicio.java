package gn.gimnasio.lincenciaInstructor.servicio;

import gn.gimnasio.lincenciaInstructor.modelo.Licencia;
import gn.gimnasio.lincenciaInstructor.repositorio.LicenciaRepositorio;
import gn.gimnasio.Instructor.modelo.Instructor;
import gn.gimnasio.Instructor.Repositorio.InstructorRepositorio;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.Instant;
import java.util.List;

@Service
public class LicenciaServicio {
    private final LicenciaRepositorio licenciaRepo;
    private final InstructorRepositorio instructorRepo;
    private final Path uploadDir = Paths.get("uploads/licencias");

    public LicenciaServicio(LicenciaRepositorio licenciaRepo,
                           InstructorRepositorio instructorRepo) {
        this.licenciaRepo = licenciaRepo;
        this.instructorRepo = instructorRepo;
        try { Files.createDirectories(uploadDir); } catch (IOException ignored) {}
    }

    public Licencia guardar(Integer instructorId, MultipartFile file) throws IOException {
        Instructor instr = instructorRepo.findById(instructorId)
            .orElseThrow(() -> new RuntimeException("Instructor no encontrado"));
        String ext = com.google.common.io.Files.getFileExtension(file.getOriginalFilename());
        String nombre = "licencia-" + instructorId + "-" + Instant.now().toEpochMilli() + "." + ext;
        Path target = uploadDir.resolve(nombre);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        Licencia lic = Licencia.fromFile(instr, nombre, target.toString());
        return licenciaRepo.save(lic);
    }

    public List<Licencia> listarPorInstructor(Integer instructorId) {
        return licenciaRepo.buscarPorInstructorId(instructorId);
    }
}
