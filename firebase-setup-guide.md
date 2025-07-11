# 🔧 Guía Completa: Configuración Firebase + GitHub Actions

## 🚀 **Información del Proyecto**
- **Project ID**: `alesky-gym-rosa`
- **Project Name**: AleskyGym Rosa Frontend
- **URL Live**: https://alesky-gym-rosa.web.app
- **Firebase Console**: https://console.firebase.google.com/project/alesky-gym-rosa

## 🔐 **Secretos necesarios en GitHub**

### 1. FIREBASE_SERVICE_ACCOUNT_ALESKY_GYM_ROSA
**Descripción**: Cuenta de servicio para despliegue automático

**Cómo obtenerlo:**
```bash
# Método 1: Usando Firebase CLI (Recomendado)
firebase init hosting:github

# Método 2: Manual desde Firebase Console
# 1. Ve a Firebase Console → Project Settings → Service Accounts
# 2. Click "Generate new private key"
# 3. Descarga el archivo JSON
```

**Estructura del JSON:**
```json
{
  "type": "service_account",
  "project_id": "alesky-gym-rosa",
  "private_key_id": "AQUÍ_VA_EL_KEY_ID",
  "private_key": "-----BEGIN PRIVATE KEY-----\nAQUÍ_VA_LA_CLAVE_PRIVADA\n-----END PRIVATE KEY-----\n",
  "client_email": "github-action-971483975@alesky-gym-rosa.iam.gserviceaccount.com",
  "client_id": "AQUÍ_VA_EL_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/github-action-971483975%40alesky-gym-rosa.iam.gserviceaccount.com"
}
```

### 2. GITHUB_TOKEN
**Descripción**: Token automático (no requiere configuración manual)
**Valor**: Se genera automáticamente por GitHub

## 📝 **Configuración en GitHub Repository**

### **Paso 1: Acceder a Secrets**
1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"

### **Paso 2: Agregar Secret**
- **Name**: `FIREBASE_SERVICE_ACCOUNT_ALESKY_GYM_ROSA`
- **Value**: Pega todo el contenido del archivo JSON de service account

## 🛠️ **Comandos para obtener/verificar configuración**

### **Verificar proyecto actual:**
```bash
firebase projects:list
firebase use --list
```

### **Verificar configuración de hosting:**
```bash
firebase hosting:sites:list
firebase hosting:channel:list
```

### **Obtener información del service account:**
```bash
firebase projects:addfirebase alesky-gym-rosa
firebase use alesky-gym-rosa
firebase serve --only hosting
```

### **Regenerar service account (si es necesario):**
```bash
# 1. Eliminar actual
firebase projects:list
firebase use alesky-gym-rosa

# 2. Regenerar
firebase init hosting:github
# Seguir las instrucciones en pantalla
```

## 📁 **Archivos de configuración actuales**

### **firebase.json**
```json
{
  "hosting": {
    "public": "Rosa-GestionClases-Frontend/dist/angular/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### **.firebaserc**
```json
{
  "projects": {
    "default": "alesky-gym-rosa"
  }
}
```

## 🔄 **Workflows de GitHub Actions**

### **1. firebase-hosting-merge.yml** (Despliegue automático)
```yaml
name: Deploy to Firebase Hosting on merge
on:
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          cd Rosa-GestionClases-Frontend
          npm ci --legacy-peer-deps
          npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_ALESKY_GYM_ROSA }}
          channelId: live
          projectId: alesky-gym-rosa
```

### **2. firebase-hosting-pull-request.yml** (Preview en PRs)
```yaml
name: Deploy to Firebase Hosting on PR
on: pull_request
permissions:
  checks: write
  contents: read
  pull-requests: write
jobs:
  build_and_preview:
    if: ${{ github.event.pull_request.head.repo.full_name == github.repository }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          cd Rosa-GestionClases-Frontend
          npm ci --legacy-peer-deps
          npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_ALESKY_GYM_ROSA }}
          projectId: alesky-gym-rosa
```

## 🔍 **Verificar configuración actual**

### **Comandos de verificación:**
```bash
# 1. Verificar que Firebase CLI está instalado
firebase --version

# 2. Verificar login
firebase login:list

# 3. Verificar proyecto actual
firebase use --list

# 4. Verificar configuración de hosting
firebase hosting:sites:list

# 5. Test local
firebase serve --only hosting
```

### **Verificar en GitHub:**
1. Ve a tu repositorio
2. Settings → Secrets and variables → Actions
3. Verifica que existe: `FIREBASE_SERVICE_ACCOUNT_ALESKY_GYM_ROSA`
4. Ve a Actions → ejecuta un workflow manualmente para probar

## 🚨 **Troubleshooting común**

### **Error: "Permission denied"**
```bash
# Solución: Regenerar service account
firebase init hosting:github
```

### **Error: "Project not found"**
```bash
# Solución: Verificar project ID
firebase projects:list
firebase use alesky-gym-rosa
```

### **Error: "Build failed"**
```bash
# Solución: Verificar path de build
# Asegurarse que el path en firebase.json sea correcto:
# "public": "Rosa-GestionClases-Frontend/dist/angular/browser"
```

## 📊 **Monitoreo y logs**

### **GitHub Actions:**
- Repository → Actions tab
- Ver workflows ejecutándose
- Revisar logs detallados

### **Firebase Console:**
- https://console.firebase.google.com/project/alesky-gym-rosa/hosting
- Ver historial de despliegues
- Métricas de uso
- Logs de errores

## 🎯 **Checklist de configuración**

- [ ] Service account configurado en GitHub Secrets
- [ ] Workflows funcionando correctamente
- [ ] Project ID correcto en todos los archivos
- [ ] Path de build correcto en firebase.json
- [ ] Permisos correctos en Firebase Console
- [ ] Tests de despliegue exitosos

---

**¡Con esta configuración tu proyecto debería funcionar perfectamente!** 🚀
