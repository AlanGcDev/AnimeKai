// app/support/form.jsx

"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export default function SupportForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para mostrar carga

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");
    setLoading(true); // Inicia la carga

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setError("Error al enviar el formulario. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false); // Detiene la carga
    }
  };

  return (
    <div className="support-contact">
      <h1>Formulario de Soporte</h1>
      <div className="support-contact-log">
        {error && (
          <p className="support-contact-error">
            {error} <Icon className="icon" icon="jam:triangle-danger-f" />
          </p>
        )}
        {success && (
          <p className="support-contact-success">
            ¡Mensaje enviado con éxito! <Icon icon="ep:success-filled" />
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Correo Electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Tema:
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mensaje:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
