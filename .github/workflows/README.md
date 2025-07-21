# Pipeline CI/CD - Rosa Frontend

Este pipeline automatiza el proceso de integración continua y despliegue continuo para el frontend Angular del proyecto Rosa-GestionClases-Frontend.

## 🚀 Características del Pipeline

### Triggers
- **Push**: Se ejecuta cuando se hace push a las ramas `main`, `Rosa-Frontend`, o `Rosa-GestionClases-Frontend`
- **Pull Request**: Se ejecuta cuando se crea un PR hacia estas ramas
- **Path Filter**: Solo se ejecuta si hay cambios en la carpeta `Rosa-GestionClases-Frontend/**`

### Jobs

#### 1. **frontend-ci-cd**
- **SO**: Windows Server 2022 (windows-latest)
- **Shell**: PowerShell (pwsh)
- **Node.js**: 20.x con cache de npm
- **Directorio de trabajo**: `./Rosa-GestionClases-Frontend`

**Pasos:**
1. ✅ Checkout del repositorio
2. ⚙️ Setup de Node.js con cache de npm
3. 📦 Instalación de dependencias con PowerShell try-catch
4. 🔍 Linting del código (ESLint)
5. 🏗️ Build de la aplicación con optimización de memoria
6. 🧪 Ejecución de tests unitarios con coverage
7. 📊 Upload de reportes de coverage
8. 📁 Archivado de artefactos de build
9. 🔒 Auditoría de seguridad (npm audit)
10. 📋 Resumen del pipeline

#### 2. **deploy-vercel**
- **Dependencia**: Requiere éxito del job `frontend-ci-cd`
- **Condición**: Solo en ramas `main` o `Rosa-Frontend`
- **Node.js**: 20.x
- **Plataforma**: Vercel

**Pasos:**
1. ✅ Checkout del repositorio
2. ⚙️ Setup de Node.js
3. 📦 Instalación de Vercel CLI
4. 🧹 Limpieza e instalación de dependencias
5. 🔄 Pull de configuración de Vercel
6. 🏗️ Build con Vercel
7. 🚀 Despliegue a producción en Vercel
8. 📢 Notificación de despliegue con URL
9. 💬 Comentario en PR con URL de preview
## 📋 Requisitos Previos

Para que el pipeline funcione correctamente, asegúrate de que:

1. **Scripts en package.json**: Los siguientes scripts deben estar disponibles:
   - `test`: Tests unitarios
   - `build`: Build de la aplicación
   - `lint`: Linting del código
   - `e2e`: Tests end-to-end (opcional)

2. **Dependencias**: El proyecto debe tener configurado:
   - Karma para tests unitarios
   - Chrome Headless para tests en CI
   - Coverage reports en formato lcov

## 👍 Configuración Específica de Windows

Este pipeline está optimizado para ejecutarse en **Windows Server 2022** con las siguientes características:

### Shell y Comandos
- **Shell**: PowerShell (pwsh)
- **Manejo de errores**: Try-catch blocks de PowerShell
- **Comandos**: `Write-Host` para logging

### Optimizaciones
- **Memoria**: `NODE_OPTIONS: --max-old-space-size=4096` para builds grandes
- **Artefactos**: Nombres específicos para Windows (`*-windows`)
- **Compatibilidad**: Manejo de dependencias legacy

### Ventajas de Windows
- Consistencia con entornos de desarrollo Windows
- Mejor manejo de paths con espacios
- Soporte nativo para aplicaciones .NET si es necesario
- Compatibilidad con herramientas de Microsoft

## 🔧 Configuración Personalizada

### Variables de Entorno
Si necesitas agregar variables de entorno, puedes configurarlas en:
```yaml
env:
  NODE_ENV: production
  API_URL: ${{ secrets.API_URL }}
```

### Secretos de GitHub
Para configurar secretos sensibles:
1. Ve a Settings → Secrets and variables → Actions
2. Agrega los secretos necesarios:

#### Secretos requeridos para Vercel:
- `VERCEL_TOKEN`: Token de acceso a Vercel
- `VERCEL_ORG_ID`: ID de tu organización en Vercel
- `VERCEL_PROJECT_ID`: ID del proyecto en Vercel

#### Cómo obtener los secretos:
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Hacer login
vercel login

# 3. Inicializar proyecto
vercel

# 4. Obtener IDs del archivo .vercel/project.json
cat .vercel/project.json

# 5. Crear token en https://vercel.com/account/tokens
```
### Modificar el Pipeline
- **Cambiar versiones de Node.js**: Modifica la matriz en `strategy.matrix.node-version`
- **Agregar más pasos**: Inserta nuevos steps en el job correspondiente
- **Cambiar condiciones de deploy**: Modifica la condición `if` en el job deploy

## 📊 Monitoreo

### Artefactos
- Los builds se guardan como artefactos por 30 días
- Disponibles en la pestaña "Actions" del repositorio

### Coverage
- Los reportes de coverage se suben a Codecov
- Disponibles con el flag `frontend` y nombre `rosa-frontend-coverage`

## 🐛 Troubleshooting

### Errores Comunes
1. **Falla en tests**: Verifica que los tests pasen localmente
2. **Falla en build**: Revisa las dependencias y configuración de Angular
3. **Falla en lint**: Ejecuta `npm run lint` localmente para corregir errores

### Logs
- Los logs detallados están disponibles en la pestaña "Actions"
- Cada paso muestra su output completo para debugging

## 🔄 Actualizaciones

Para actualizar el pipeline:
1. Modifica el archivo `.github/workflows/rosa-frontend-ci-cd.yml`
2. Haz commit y push
3. El pipeline se actualizará automáticamente

---

**Nota**: Este pipeline está optimizado para el proyecto Rosa-GestionClases-Frontend y puede requerir ajustes según las necesidades específicas del proyecto.
