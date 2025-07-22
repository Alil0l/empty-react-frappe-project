# Farha

A modern React web application built with Vite, featuring real-time capabilities, internationalization, and Frappe framework integration.

## 🚀 Features

- **Modern React Architecture** - Built with React 19 and Vite for optimal performance
- **Real-time Communication** - WebSocket integration using Socket.io for live notifications
- **Internationalization** - Built-in support for Arabic and English languages
- **Authentication System** - User authentication with protected routes
- **Material Design** - Beautiful UI components using Material-UI
- **Responsive Design** - Mobile-first design with TailwindCSS
- **Google Maps Integration** - Location services and mapping capabilities
- **Frappe Integration** - Backend integration with Frappe framework
- **State Management** - Context API for global state management
- **Data Fetching** - React Query for efficient API calls and caching

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks and features
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Material-UI** - React component library
- **React Router DOM** - Client-side routing
- **React Query** - Data fetching and caching
- **React i18next** - Internationalization framework

### Backend Integration
- **Frappe React SDK** - Frappe framework integration
- **Axios** - HTTP client for API calls
- **Socket.io Client** - Real-time communication

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd farha
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🎮 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🏗️ Project Structure

```
farha/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable UI components
│   │   ├── Helpers/       # Utility components (Spinner, etc.)
│   │   ├── Layout/        # Layout components
│   │   └── Navbar/        # Navigation components
│   ├── contexts/          # React Context providers
│   │   ├── AppContext.jsx # Global app state
│   │   └── UserContext.jsx# User authentication state
│   ├── i18n/              # Internationalization
│   │   ├── config.js      # i18next configuration
│   │   └── locales/       # Translation files
│   │       ├── ar.json    # Arabic translations
│   │       └── en.json    # English translations
│   ├── views/             # Page components
│   │   ├── Home.jsx       # Home page
│   │   └── Login.jsx      # Login page
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   ├── NavigationGuard.jsx# Route protection
│   └── socket.js          # WebSocket configuration
├── tailwind.config.js     # TailwindCSS configuration
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🔐 Authentication

The app features a complete authentication system with:

- **Protected Routes** - Automatic redirection for unauthenticated users
- **User Context** - Global user state management
- **Cookie-based Authentication** - Session persistence
- **Navigation Guards** - Route-level protection

## 🌐 Internationalization

Farha supports multiple languages:

- **Arabic** (Default) - RTL layout support
- **English** - LTR layout support
- **Dynamic Language Switching** - Runtime language changes
- **Fallback System** - Graceful handling of missing translations

To add new languages:
1. Create a new JSON file in `src/i18n/locales/`
2. Update the i18n configuration in `src/i18n/config.js`
3. Add translation keys to your new locale file

## 🔄 Real-time Features

The application includes real-time capabilities:

- **Socket.io Integration** - Live communication with backend
- **User Notifications** - Real-time notification system
- **Auto-reconnection** - Handles connection drops gracefully

## 🎨 Styling

The app uses a combination of:

- **TailwindCSS** - Utility classes for rapid development
- **Material-UI** - Pre-built accessible components
- **Custom CSS** - Component-specific styles when needed

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates an optimized build in the `../kiswat_farah/public/farha/` directory.

### Environment Configuration

The app is configured to work with:
- **Base URL**: `/farha/`
- **Development Port**: `8080`
- **Proxy Configuration**: Automatic backend API routing

## 🔧 Configuration

### Vite Configuration
- **Base Path**: `/farha/`
- **Dev Server**: Port 8080, accessible on all network interfaces
- **Proxy**: Automatic routing to Frappe backend
- **Build Output**: `../kiswat_farah/public/farha/`

### Frappe Integration
The app integrates with Frappe framework through:
- **frappe-react-sdk** for API calls
- **Proxy configuration** for development
- **Cookie-based authentication** with Frappe sessions

## 📱 Google Maps

The app includes Google Maps integration for:
- Location services
- Interactive maps
- Geolocation features

Make sure to configure your Google Maps API key in your environment.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and not licensed for public use.

## 🐛 Issues & Support

For issues and support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React and modern web technologies**
