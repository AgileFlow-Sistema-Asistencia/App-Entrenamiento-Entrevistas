# AgileFlow - App de Entrenamiento para Entrevistas

## 📋 Descripción del Proyecto

AgileFlow es una aplicación full-stack diseñada para el entrenamiento y preparación de entrevistas técnicas. La aplicación utiliza una arquitectura moderna con GraphQL, TypeScript, y tecnologías de vanguardia tanto en el backend como en el frontend.

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

#### Backend
- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Framework GraphQL**: Apollo Server Express + TypeGraphQL
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: TypeGraphQL decorators
- **Herramientas de Desarrollo**: ESLint, Prettier, ts-node-dev

#### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Cliente GraphQL**: Apollo Client
- **UI Framework**: Tailwind CSS + Radix UI
- **Gestión de Estado**: Zustand
- **Autenticación**: Auth0
- **Pagos**: Stripe
- **Iconos**: Lucide React

## 📁 Estructura del Proyecto

```
AgileFlow/
├── backend/                 # API GraphQL
│   ├── src/
│   │   ├── config/         # Configuración de BD
│   │   ├── middlewares/    # Middleware de autenticación
│   │   ├── modules/        # Módulos de dominio
│   │   │   ├── auth/       # Tipos de autenticación
│   │   │   └── user/       # Gestión de usuarios
│   │   ├── types/          # Tipos compartidos
│   │   ├── schema/         # Esquemas GraphQL
│   │   ├── utils/          # Utilidades
│   │   └── server.ts       # Punto de entrada
│   ├── package.json
│   └── tsconfig.json
└── frontend/               # Aplicación Next.js
    ├── app/               # App Router (Next.js 13+)
    ├── components/        # Componentes reutilizables
    ├── graphql/          # Queries y mutations
    ├── hooks/            # Custom hooks
    ├── lib/              # Utilidades
    ├── store/            # Estado global (Zustand)
    ├── styles/           # Estilos globales
    └── public/           # Archivos estáticos
```

## 🔧 Backend - Arquitectura GraphQL

### Características Principales

1. **TypeGraphQL**: Utiliza decoradores para definir esquemas GraphQL de forma type-safe
2. **Arquitectura Modular**: Cada dominio (user, auth) tiene su propio módulo
3. **Autenticación JWT**: Sistema de tokens con roles (admin/user)
4. **Autorización**: Control de acceso basado en roles usando `@Authorized`
5. **Validación**: Validación automática de inputs usando TypeGraphQL

### Módulos Principales

#### Módulo User
- **Resolver**: `UserResolver` - Maneja queries y mutations de usuarios
- **Service**: `UserService` - Lógica de negocio
- **Model**: `UserModel` - Esquema de Mongoose
- **Types**: `UserType` - Tipos GraphQL
- **Inputs**: `CreateUserInput`, `LoginInput` - Validación de entrada

#### Funcionalidades Implementadas
- ✅ Registro de usuarios con hash de contraseñas
- ✅ Login con JWT
- ✅ Consulta de perfil autenticado
- ✅ Listado de usuarios (solo admin)
- ✅ Autorización basada en roles

### Configuración de Base de Datos
```typescript
// Conexión MongoDB
export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('👌 MONGODB Connected!');
}
```

## 🎨 Frontend - Arquitectura Next.js

### Características Principales

1. **App Router**: Utiliza el nuevo sistema de rutas de Next.js 13+
2. **Apollo Client**: Cliente GraphQL para comunicación con el backend
3. **Tailwind CSS**: Framework de utilidades CSS
4. **Radix UI**: Componentes accesibles y personalizables
5. **TypeScript**: Type safety en todo el frontend

### Dependencias Clave
- `@apollo/client`: Cliente GraphQL
- `@auth0/nextjs-auth0`: Autenticación
- `@stripe/stripe-js`: Procesamiento de pagos
- `zustand`: Gestión de estado
- `tailwindcss`: Estilos
- `lucide-react`: Iconografía

## 🚀 Configuración y Desarrollo

### Variables de Entorno

#### Backend (.env)
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/agileflow
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET=your_stripe_secret_key
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

### Comandos de Desarrollo

#### Backend
```bash
cd backend
pnpm install
pnpm dev          # Desarrollo con hot reload
pnpm build        # Compilar TypeScript
pnpm start        # Producción
```

#### Frontend
```bash
cd frontend
pnpm install
pnpm dev          # Desarrollo con Turbopack
pnpm build        # Build de producción
pnpm start        # Servidor de producción
```

## 🔐 Sistema de Autenticación

### Backend (JWT)
- Registro y login con hash de contraseñas (bcrypt)
- Tokens JWT con expiración de 7 días
- Middleware de autenticación para Express
- AuthChecker para GraphQL con control de roles

### Frontend (Auth0)
- Autenticación OAuth con Auth0
- Integración con Apollo Client
- Protección de rutas
- Gestión de sesiones

## 📊 Flujo de Datos

1. **Cliente** → Apollo Client → **GraphQL API**
2. **GraphQL** → TypeGraphQL Resolvers → **Services**
3. **Services** → Mongoose → **MongoDB**
4. **Respuesta** ← GraphQL Schema ← **Database**

## 🛡️ Seguridad

- **Autenticación**: JWT tokens con expiración
- **Autorización**: Control de acceso basado en roles
- **Validación**: Input validation con TypeGraphQL
- **Hash de contraseñas**: bcrypt para almacenamiento seguro
- **CORS**: Configuración de dominios permitidos

## 📈 Próximas Funcionalidades

- [ ] Sistema de entrevistas técnicas
- [ ] Grabación y análisis de respuestas
- [ ] Dashboard de progreso
- [ ] Sistema de pagos con Stripe
- [ ] Notificaciones en tiempo real
- [ ] Integración con calendarios

## 🔧 Herramientas de Desarrollo

- **Linting**: ESLint con configuraciones personalizadas
- **Formatting**: Prettier para código consistente
- **Type Checking**: TypeScript estricto
- **Hot Reload**: ts-node-dev (backend) y Turbopack (frontend)
- **Git Hooks**: Husky + lint-staged

## 📝 Convenciones de Código

- **Naming**: camelCase para variables, PascalCase para clases
- **Imports**: Absolute imports con path mapping
- **Components**: Functional components con TypeScript
- **GraphQL**: Descriptive naming para queries y mutations
- **Database**: Mongoose schemas con TypeScript interfaces

Esta arquitectura proporciona una base sólida, escalable y mantenible para el desarrollo de la aplicación AgileFlow.
        