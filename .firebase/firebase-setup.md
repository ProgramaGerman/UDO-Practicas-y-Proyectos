# Firebase Hosting Setup

## 1. Instalación de Firebase CLI
```bash
npm install -g firebase-tools
```

## 2. Login a Firebase
```bash
firebase login
```

## 3. Inicialización del proyecto
```bash
firebase init hosting
```

## 4. Configuración básica:
- ¿Cuál es tu carpeta de build público? → `Rosa-GestionClases-Frontend/dist/angular`
- ¿Configurar como SPA? → Yes
- ¿Sobrescribir index.html? → No

## 5. Configuración de múltiples sitios (opcional)
```bash
firebase hosting:sites:create alesky-gym-rosa
```
