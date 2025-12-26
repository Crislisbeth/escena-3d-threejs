# 🎨 Escultura Digital Abstracta - Three.js

## 📋 Descripción del Proyecto

Esta escena 3D presenta un **tótem geométrico abstracto** compuesto por cinco figuras primitivas (cubo, esfera, cono, toro y octaedro) que rotan de manera independiente mientras toda la composición gira sobre su eje. El octaedro orbita alrededor de la estructura central creando un efecto planetario dinámico y visualmente inmersivo.

La composición busca explorar las posibilidades de renderizado 3D en el navegador, creando una experiencia visual que combina movimiento, luz y profundidad espacial.

## 🎭 Materiales Utilizados

He utilizado principalmente **`MeshStandardMaterial`** con diferentes configuraciones de `metalness` y `roughness` para lograr acabados variados:

- **Cubo central**: Material metálico brillante (metalness: 0.7) con tono azul cian
- **Esfera superior**: Material semi-mate (roughness: 0.4) con color naranja cálido
- **Cono inferior**: Material metálico moderado (metalness: 0.5) en tono púrpura
- **Toro orbital**: Material altamente metálico (metalness: 0.8) de color dorado
- **Octaedro flotante**: Usa **`MeshPhongMaterial`** para un efecto especular más pronunciado con alto shininess (100) en tono verde

Todos los materiales incluyen propiedades **emissive** que les dan un brillo interno sutil, creando un efecto de luminiscencia que mejora la percepción de profundidad y volumen.

## 💡 Sistema de Iluminación

El esquema de iluminación combina múltiples fuentes de luz para crear una atmósfera dinámica y dramática:

1. **Luz Ambiental** (`AmbientLight`): Luz base de tono azul oscuro (0x404060) con intensidad baja (0.4) que evita la oscuridad total y proporciona iluminación general suave

2. **Luz Direccional** (`DirectionalLight`): Fuente principal de luz blanca (intensidad 0.8) posicionada en (5, 10, 5) que proyecta sombras definidas sobre el plano base, creando profundidad espacial

3. **Luces Puntuales Dinámicas**:
   - **Luz cálida**: Color naranja (0xff6b35) que orbita la escena horizontalmente
   - **Luz fría**: Color azul cian (0x4fc3f7) que orbita en dirección opuesta

Estas luces puntuales se mueven constantemente, creando variaciones en cómo se iluminan las geometrías y generando una experiencia visual inmersiva y cambiante que nunca se repite exactamente.

## 🚀 Características Técnicas

- ✅ Cámara perspectiva con FOV personalizado (65°)
- ✅ Sistema de sombras activado (PCFSoftShadowMap)
- ✅ 5 geometrías diferentes con materiales que reaccionan a la luz
- ✅ Animación continua usando `requestAnimationFrame`
- ✅ Rotaciones independientes en múltiples ejes
- ✅ Movimiento orbital del octaedro
- ✅ Iluminación dinámica con luces en movimiento
- ✅ Diseño completamente responsive
- ✅ Niebla atmosférica para profundidad visual

## 📁 Estructura del Proyecto