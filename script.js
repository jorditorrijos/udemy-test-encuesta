document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('survey-form');
    const modal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('close-modal');

    // Configuración Segura: Solo la URL del Webhook (Proxy Seguro)
    const N8N_WEBHOOK_URL = 'https://jordi-pruebas.app.n8n.cloud/webhook/b4df8b6e-611c-4f18-bc7c-489410772471';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = new FormData(form);

        // Mapeo de datos para envío centralizado
        const surveyData = {
            "IDEstudiante": formData.get('id_estudiante'),
            "NivelSatisfaccion": parseInt(formData.get('nivel_satisfaccion')),
            "ClaridadContenido": parseInt(formData.get('claridad_contenido')),
            "AplicabilidadPractica": parseInt(formData.get('aplicabilidad_practica')),
            "ComentariosAdicionales": formData.get('comentarios_adicionales'),
            "Timestamp": new Date().toISOString() // Añadimos marca de tiempo para mayor control
        };

        // UI Feedback
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Enviando...</span>';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        try {
            console.log('Enviando datos de forma segura al servidor...');

            // Realizamos una única petición al "Secure Bridge" (n8n)
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(surveyData)
            });

            if (!response.ok) {
                throw new Error('El servidor respondió con un error al procesar tu encuesta.');
            }

            console.log('Respuesta del servidor OK');

            // Éxito
            modal.classList.add('active');
            form.reset();

        } catch (error) {
            console.error('Error de Seguridad/Comunicación:', error.message || error);
            alert(`No se pudo enviar la encuesta de forma segura. Detalles: ${error.message || 'Error de conexión'}`);
        } finally {
            // Restaurar botón (UX)
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        }
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Interacción suave para los radio buttons
    const labels = document.querySelectorAll('.rating-group label');
    labels.forEach(label => {
        label.addEventListener('click', function () {
            const group = this.parentElement;
            const groupLabels = group.querySelectorAll('label');
            groupLabels.forEach(l => l.style.transform = 'scale(1)');
            this.style.transform = 'scale(1.1)';
        });
    });
});
