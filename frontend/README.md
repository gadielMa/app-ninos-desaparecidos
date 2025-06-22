# App Niños Desaparecidos

Una aplicación móvil para reportar y buscar casos de niños desaparecidos, construida con React Native y Expo.

## 🚀 Características

- **Reporte de casos**: Formulario completo para reportar niños desaparecidos
- **Búsqueda avanzada**: Filtros por estado, ubicación y fecha
- **Mapa interactivo**: Visualización de casos en tiempo real
- **Perfil de usuario**: Estadísticas y configuración personal
- **Notificaciones**: Alertas para casos urgentes
- **Integración con Firebase**: Base de datos en tiempo real

## 📱 Tecnologías

- **React Native** con Expo
- **Firebase** (Firestore, Auth, Storage)
- **React Native Maps** para mapas
- **Expo Image Picker** para fotos
- **Expo Location** para ubicación
- **TypeScript** para tipado

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd app-ninos-desaparecidos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar dependencias de Expo**
   ```bash
   npx expo install firebase react-native-maps expo-image-picker expo-location
   ```

## 🔥 Configuración de Firebase

### 1. Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. Habilita Authentication (opcional)
5. Habilita Storage (opcional)

### 2. Configurar la aplicación

1. En Firebase Console, ve a Configuración del proyecto
2. En la sección "Tus apps", agrega una nueva app web
3. Copia la configuración

### 3. Actualizar configuración

Edita el archivo `lib/firebase.ts` y reemplaza la configuración:

```typescript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

### 4. Configurar reglas de Firestore

En Firebase Console, ve a Firestore Database > Reglas y configura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cases/{caseId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Ejecutar la aplicación

### Desarrollo web
```bash
npm start
# Presiona 'w' para abrir en el navegador
```

### iOS Simulator
```bash
npm start
# Presiona 'i' para abrir en iOS Simulator
```

### Android Emulator
```bash
npm start
# Presiona 'a' para abrir en Android Emulator
```

### Dispositivo físico
1. Instala Expo Go en tu dispositivo
2. Escanea el código QR que aparece en la terminal

## 📁 Estructura del proyecto

```
app-ninos-desaparecidos/
├── app/                    # Pantallas de la aplicación
│   ├── index.tsx          # Pantalla principal
│   ├── search.tsx         # Búsqueda de casos
│   ├── map.tsx            # Mapa de casos
│   ├── profile.tsx        # Perfil de usuario
│   └── report.tsx         # Formulario de reporte
├── lib/                   # Servicios y utilidades
│   ├── firebase.ts        # Configuración de Firebase
│   └── cases.ts           # Servicio de casos
├── assets/                # Imágenes y recursos
└── package.json           # Dependencias
```

## 🔧 Funcionalidades principales

### 1. Pantalla Principal (`app/index.tsx`)
- Dashboard con estadísticas
- Acciones rápidas
- Casos recientes
- Botón de emergencia

### 2. Búsqueda (`app/search.tsx`)
- Barra de búsqueda
- Filtros por estado
- Lista de resultados
- Detalles de casos

### 3. Mapa (`app/map.tsx`)
- Visualización en mapa
- Marcadores por estado
- Información de casos
- Leyenda

### 4. Perfil (`app/profile.tsx`)
- Información del usuario
- Estadísticas personales
- Configuración
- Contacto de emergencia

### 5. Reporte (`app/report.tsx`)
- Formulario completo
- Subida de fotos
- Ubicación automática
- Validación de datos

## 📊 Modelo de datos

### Caso (Case)
```typescript
interface Case {
  id?: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'urgent' | 'resolved';
  reportedBy: string;
  reportedAt: Date;
  lastSeen: Date;
  contactPhone?: string;
  contactEmail?: string;
  images?: string[];
  tags?: string[];
}
```

## 🔐 Permisos requeridos

La aplicación solicita los siguientes permisos:

- **Cámara**: Para tomar fotos de casos
- **Galería**: Para seleccionar fotos existentes
- **Ubicación**: Para obtener ubicación actual
- **Notificaciones**: Para alertas de casos urgentes

## 🚨 Funcionalidades de emergencia

- **Botón de emergencia**: Acceso rápido a líneas de emergencia
- **Casos urgentes**: Priorización automática
- **Notificaciones push**: Alertas inmediatas
- **Contacto de emergencia**: Información de contacto configurable

## 🔄 Próximas mejoras

- [ ] Autenticación de usuarios
- [ ] Notificaciones push
- [ ] Búsqueda avanzada con filtros
- [ ] Integración con APIs de geocodificación
- [ ] Modo offline
- [ ] Análisis y reportes
- [ ] Integración con redes sociales
- [ ] Sistema de recompensas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: soporte@app-ninos-desaparecidos.com
- Teléfono: +52 55 1234 5678

## ⚠️ Importante

Esta aplicación está diseñada para ayudar en casos de niños desaparecidos. En caso de emergencia real, contacta inmediatamente a las autoridades locales.

**Línea de emergencia nacional: 911**
