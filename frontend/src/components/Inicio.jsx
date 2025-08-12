import { useState } from 'react'

function Inicio() {

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">
           Control de mercadería Digital <i className="bi bi-box"></i>
        </h1>
        <h2 className="mb-3">Bienvenido a nuestro sistema de gestión de mercadería</h2>
        <p className="lead">
          Explora, gestiona y controla tu inventario de productos.
        </p>
        <p>
          Filtra por categoría o marca <i className="bi bi-search"></i> , y accedé a detalles enriquecidos de cada producto.
        </p>
      </div>
    </div>
  );
}

export default Inicio
