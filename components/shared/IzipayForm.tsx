'use client';

import React, { useEffect } from 'react';

interface IzipayFormProps {
  params: { [key: string]: string | number };
  izipayUrl: string;
}

const IzipayForm: React.FC<IzipayFormProps> = ({ params, izipayUrl }) => {
  useEffect(() => {
    // Crear el elemento del formulario
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = izipayUrl;

    // Crear y añadir los inputs ocultos para cada parámetro
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = String(params[key]);
        form.appendChild(hiddenField);
      }
    }

    // Añadir campos estáticos para URLs de redirección y configuración de tema
    const staticFields = {
      vads_url_success: 'https://www.ticketsaso.com/success',
      vads_url_refused: 'https://www.ticketsaso.com/pago-rechazado',
      vads_url_cancel: 'https://www.ticketsaso.com/pago-cancelado',
      vads_theme_config: 'SUCCESS_FOOTER_MSG_RETURN=DESCARGA TU TICKET',
    };

    for (const key in staticFields) {
      if (Object.prototype.hasOwnProperty.call(staticFields, key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = staticFields[key as keyof typeof staticFields];
        form.appendChild(hiddenField);
      }
    }

    // Añadir el formulario al body y enviarlo
    document.body.appendChild(form);
    form.submit();

    // Opcional: Limpieza en caso de que el componente se desmonte
    return () => {
      document.body.removeChild(form);
    };
  }, [params, izipayUrl]);

  // Este componente no renderiza nada visible
  return null;
};

export default IzipayForm;