# 🌌 Encuesta de Satisfacción Antigravity

Una aplicación web moderna y segura diseñada para recopilar feedback de estudiantes, integrada con **n8n** y **Stackby**.

![Preview](https://raw.githubusercontent.com/jorditorrijos/udemy-test-encuesta/main/preview.png) *(Nota: Sube una captura si quieres que se vea aquí)*

## 🚀 Características
- **Diseño Premium**: Estética cósmica con efectos de glassmorphism y animaciones fluidas.
- **Seguridad**: Arquitectura de "Puente Seguro" que oculta las claves de API mediante un proxy en n8n.
- **Automatización**: 
    - Envío automático de datos a **Stackby**.
    - Notificaciones por correo electrónico vía **Gmail**.

## 🛠️ Tecnologías
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Backend/Workflow**: n8n.
- **Base de Datos**: Stackby.

## 🔒 Configuración de Seguridad
Este proyecto no expone credenciales en el cliente. Para que funcione:
1. Configura un Webhook en **n8n**.
2. Los datos llegan al Webhook con los campos: `IDEstudiante`, `NivelSatisfaccion`, `ClaridadContenido`, `AplicabilidadPractica`, `ComentariosAdicionales`.
3. n8n procesa la inserción en Stackby usando sus propias credenciales seguras.

## 📦 Instalación
Simplemente clona el repositorio y abre `index.html` en tu navegador.
```bash
git clone https://github.com/jorditorrijos/udemy-test-encuesta.git
```
