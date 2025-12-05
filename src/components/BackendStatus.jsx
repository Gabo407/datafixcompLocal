import React, { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

const BackendStatus = () => {
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/productos/test');
                if (response.ok) {
                    const data = await response.json();
                    setStatus('success');
                    setMessage(data.mensaje);
                } else {
                    setStatus('error');
                }
            } catch (error) {
                setStatus('error');
            }
        };

        checkConnection();
    }, []);

    if (status === 'loading') {
        return (
            <Alert variant="info" className="d-flex align-items-center">
                <Spinner animation="border" size="sm" className="me-2" />
                Verificando conexión con el backend...
            </Alert>
        );
    }

    if (status === 'success') {
        return (
            <Alert variant="success">
                ✅ Conectado al backend: {message}
            </Alert>
        );
    }

    return (
        <Alert variant="danger">
            ❌ Error: no se pudo conectar al backend.
        </Alert>
    );
};

export default BackendStatus;
