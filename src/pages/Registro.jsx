import React, { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Registro() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido: ''
  });
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const { registro } = useAuth();
  const navigate = useNavigate();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    const newErrors = {};

    // Validar que los campos no estén vacíos
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const resultado = await registro(
        formData.email,
        formData.password,
        formData.nombre,
        formData.apellido
      );

      if (resultado.success) {
        setTipoMensaje('success');
        setMensaje('Registro exitoso. Puedes iniciar sesión ahora.');
        setTimeout(() => {
          navigate('/ingresar');
        }, 2000);
      } else {
        setTipoMensaje('danger');
        setMensaje(resultado.mensaje);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '520px' }}>
      <h1 className="h3 text-center mb-4">Registrarse</h1>
      {mensaje && (
        <Alert variant={tipoMensaje} className="my-3">
          {mensaje}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Correo *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre *</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            isInvalid={!!errors.nombre}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido *</Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Tu apellido"
            isInvalid={!!errors.apellido}
          />
          <Form.Control.Feedback type="invalid">
            {errors.apellido}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña *</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Al menos 6 caracteres"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirmar Contraseña *</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirma tu contraseña"
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="d-grid">
          <Button type="submit" variant="primary" size="lg">
            Registrarse
          </Button>
        </div>

        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <Link to="/ingresar">Inicia sesión aquí</Link>
        </p>
      </Form>
    </Container>
  );
}

export default Registro;
