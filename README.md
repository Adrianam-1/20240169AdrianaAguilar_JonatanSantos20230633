# Evaluación de Aplicaciones Móviles

## Integrantes

* Adriana Camila Aguilar Montoya — Carnet: 20240169
* Jonatan Santos — Carnet: 20230633

---

## Descripción del proyecto

Aplicación móvil desarrollada con React Native y Expo, orientada a la autenticación y gestión de información personal de usuarios mediante Firebase Authentication y Cloud Firestore.

La aplicación permite a los usuarios:

* Crear una cuenta.
* Iniciar sesión.
* Cerrar sesión.
* Visualizar su información personal.
* Actualizar sus datos.
* Mantener su información almacenada en Cloud Firestore.
* Gestionar su sesión mediante Firebase Authentication.

La aplicación cuenta con una interfaz personalizada inspirada en la temática de Minions, utilizando una identidad visual basada principalmente en colores amarillos, azules y tonos neutros.

---

## Objetivo general

Desarrollar una aplicación móvil utilizando React Native con Expo, integrando Firebase Authentication y Cloud Firestore para gestionar la autenticación y la información personal de los usuarios.

## Objetivos específicos

* Implementar autenticación mediante correo electrónico y contraseña.
* Permitir el registro de nuevos usuarios mediante Firebase Authentication.
* Almacenar información adicional de los usuarios en Cloud Firestore.
* Permitir consultar y actualizar los datos personales.
* Implementar componentes reutilizables.
* Crear una navegación funcional entre las diferentes pantallas.
* Desarrollar una interfaz original y consistente.
* Utilizar variables de entorno para la configuración de Firebase.
* Aplicar buenas prácticas de desarrollo y organización del código.

---

## Tecnologías utilizadas

| Tecnología              | Uso                               |
| ----------------------- | --------------------------------- |
| React Native            | Desarrollo de la aplicación móvil |
| Expo                    | Entorno de desarrollo             |
| JavaScript              | Lenguaje de programación          |
| Firebase Authentication | Autenticación de usuarios         |
| Cloud Firestore         | Almacenamiento de información     |
| React Navigation        | Navegación entre pantallas        |
| Variables de entorno    | Gestión de configuración          |

---

## Dependencias

Las principales dependencias utilizadas en el proyecto son:

* expo
* react
* react-native
* firebase
* @react-navigation/native
* @react-navigation/native-stack

Las versiones específicas de cada dependencia se encuentran definidas en el archivo `package.json`.

---

## Pantallas principales

### Login

Permite a los usuarios iniciar sesión utilizando su correo electrónico y contraseña.

La pantalla incluye:

* Campo de correo electrónico.
* Campo de contraseña.
* Mostrar u ocultar contraseña.
* Botón de inicio de sesión.
* Acceso al registro.
* Recuperación de contraseña.
* Validación de campos.
* Manejo de errores.
* Indicador de carga.

### Registro

Permite crear una nueva cuenta mediante Firebase Authentication y almacenar la información adicional del usuario en Cloud Firestore.

Los datos solicitados son:

* Nombre completo.
* Fecha de nacimiento.
* Carnet institucional.
* URL de imagen.
* Correo electrónico.
* Contraseña.
* Confirmación de contraseña.

### Dashboard / Perfil

Permite al usuario visualizar y actualizar su información personal.

Los datos mostrados son:

* Nombre completo.
* Fecha de nacimiento.
* Carnet institucional.
* URL de imagen.

También permite:

* Editar información.
* Guardar cambios.
* Cerrar sesión.

---

## Firebase

El proyecto utiliza Firebase como plataforma para la autenticación y almacenamiento de información.

### Firebase Authentication

Firebase Authentication se utiliza para gestionar:

* Registro de usuarios.
* Inicio de sesión.
* Cierre de sesión.
* Identificación de usuarios mediante UID.
* Gestión de sesiones.

### Cloud Firestore

Cloud Firestore se utiliza para almacenar la información adicional de cada usuario.

Los campos principales almacenados son:

```text
Nombre completo
Fecha de nacimiento
Carnet institucional
URL de imagen
```

Cada usuario se relaciona con su cuenta mediante el UID generado por Firebase Authentication.

---

## Configuración mediante variables de entorno

La configuración de Firebase se administra mediante variables de entorno para evitar colocar directamente las credenciales dentro del código fuente.

El proyecto utiliza un archivo:

```text
.env
```

y proporciona un archivo de referencia:

```text
.env.example
```

Ejemplo de configuración:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

El archivo `.env` debe contener los valores correspondientes al proyecto de Firebase.

El archivo `.env.example` solamente funciona como referencia y no debe contener credenciales reales.

---

## Identidad visual

La aplicación utiliza una identidad visual inspirada en la temática de Minions.

El diseño busca combinar una apariencia divertida con una interfaz moderna, limpia, funcional y original.

### Paleta de colores

| Color              | Código hexadecimal | Uso                                  |
| ------------------ | ------------------ | ------------------------------------ |
| Amarillo principal | `#FFD91A`          | Elementos principales y destacados   |
| Azul               | `#2D7DD2`          | Elementos secundarios e interactivos |
| Blanco             | `#FFFFFF`          | Fondos, tarjetas e inputs            |
| Gris oscuro        | `#1F2937`          | Textos principales                   |
| Azul oscuro        | `#1E3A5F`          | Encabezados y elementos destacados   |
| Gris claro         | `#F3F4F6`          | Fondos secundarios                   |

### Uso de la paleta

El amarillo principal se utiliza como elemento representativo de la identidad visual.

El azul funciona como color secundario para botones, navegación y elementos interactivos.

El blanco se utiliza principalmente en tarjetas, formularios y superficies.

Los tonos oscuros se utilizan para garantizar una correcta legibilidad del contenido.

---

## Componentes reutilizables

La aplicación utiliza componentes personalizados y reutilizables para mantener una estructura modular.

Entre los componentes se incluyen elementos para:

* Campos de entrada.
* Botones.
* Tarjetas de información.
* Encabezados.
* Indicadores de carga.
* Mensajes de error.
* Elementos del perfil.

El uso de componentes reutilizables permite reducir código duplicado y mantener una interfaz consistente entre las diferentes pantallas.

---

## Estructura general del proyecto

```text
Proyecto/
│
├── assets/
│
├── components/
│   ├── CustomInput/
│   ├── CustomButton/
│   ├── ProfileCard/
│   └── ...
│
├── screens/
│   ├── Login/
│   ├── Register/
│   └── Dashboard/
│
├── navigation/
│
├── firebase/
│
├── services/
│
├── .env
├── .env.example
├── app.json
├── package.json
└── README.md
```

La estructura puede variar dependiendo de la organización final del proyecto.

---

## Flujo de la aplicación

```text
Splash Screen
      |
      v
    Login
      |
      +------------------+
      |                  |
      v                  v
   Registro        Recuperación
      |
      v
Firebase Authentication
      |
      v
   Dashboard
      |
      +----------------------+
      |                      |
      v                      v
 Actualizar datos         Cerrar sesión
      |                      |
      v                      v
Cloud Firestore            Login
```

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Adrianam-1/AdrianaAguilar20240169_JonatanSantos20230633.git
```

Ingresar a la carpeta del proyecto:

```bash
cd AdrianaAguilar20240169_JonatanSantos20230633
```

Instalar las dependencias:

```bash
npm install
```

Crear el archivo `.env` en la raíz del proyecto y agregar las variables correspondientes a Firebase.

---

## Ejecución

Para iniciar la aplicación utilizando Expo:

```bash
npx expo start
```

La aplicación puede ejecutarse mediante:

* Expo Go.
* Emulador Android.
* Emulador iOS.
* Dispositivo físico compatible.

---

## Características principales

* Autenticación mediante Firebase.
* Registro de usuarios.
* Inicio de sesión.
* Cierre de sesión.
* Recuperación de contraseña.
* Gestión de perfiles.
* Actualización de información personal.
* Almacenamiento mediante Cloud Firestore.
* Componentes reutilizables.
* Variables de entorno.
* Diseño personalizado inspirado en Minions.
* Splash Screen personalizado.
* Icono personalizado.
* Interfaz adaptable a diferentes tamaños de pantalla.
* Manejo de errores y estados de carga.

---

## Autores

### Adriana Camila Aguilar Montoya

Carnet institucional: 20240169

### Jonatan Santos

Carnet institucional: 20230633

---

## Proyecto académico

Proyecto desarrollado como parte de la evaluación de Aplicaciones Móviles, utilizando React Native, Expo, Firebase Authentication y Cloud Firestore.

---

## Licencia

Proyecto desarrollado con fines académicos.
