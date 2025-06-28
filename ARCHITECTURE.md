# Clean Code Architecture - EncontemosPega

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   ├── Navbar.css      # Navigation styles
│   └── index.ts        # Components barrel export
│
├── pages/              # Page components (views)
│   ├── HomePage.tsx    # Home page component
│   ├── HomePage.css    # Home page styles
│   ├── AboutPage.tsx   # About page component
│   ├── AboutPage.css   # About page styles
│   ├── ContactPage.tsx # Contact page component
│   ├── ContactPage.css # Contact page styles
│   └── index.ts        # Pages barrel export
│
├── routes/             # Routing configuration
│   ├── AppRouter.tsx   # Main routing component
│   ├── routeConfig.ts  # Route configuration and utilities
│   └── index.ts        # Routes barrel export
│
├── layouts/            # Layout components
│   ├── MainLayout.tsx  # Main application layout
│   └── MainLayout.css  # Main layout styles
│
├── hooks/              # Custom React hooks
│   └── (future custom hooks)
│
├── utils/              # Utility functions and constants
│   ├── constants.ts    # Application constants
│   └── index.ts        # Utils barrel export
│
├── types/              # TypeScript type definitions
│   └── index.ts        # Type definitions
│
├── App.tsx            # Main App component
├── App.css            # Global app styles
├── main.tsx           # Application entry point
└── index.css          # Global CSS reset and base styles
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Reusable UI components with single responsibilities
- **Pages**: View components that represent complete pages
- **Layouts**: Structural components that wrap pages
- **Routes**: Navigation and routing logic
- **Utils**: Pure functions and constants
- **Types**: TypeScript definitions for type safety

### 2. **Modular Design**
- Each module has a specific purpose and minimal dependencies
- Barrel exports (`index.ts`) for clean imports
- Co-located styles with components

### 3. **Clean Code Practices**
- TypeScript for type safety
- Consistent naming conventions
- Comprehensive component typing
- Clear folder structure

## 🚀 Adding New Pages

### Step 1: Create the Page Component
```typescript
// src/pages/NewPage.tsx
import React from 'react';
import './NewPage.css';

const NewPage: React.FC = () => {
  return (
    <div className="new-page">
      <h1>New Page</h1>
      <p>Your content here</p>
    </div>
  );
};

export default NewPage;
```

### Step 2: Create Page Styles
```css
/* src/pages/NewPage.css */
.new-page {
  padding: 2rem 0;
}
```

### Step 3: Add Route Configuration
```typescript
// src/routes/routeConfig.ts
// Add to the routes array:
{
  path: '/new-page',
  element: NewPage,
  title: 'New Page',
}
```

### Step 4: Update Router
```typescript
// src/routes/AppRouter.tsx
// Add to the Routes:
<Route path="new-page" element={<NewPage />} />
```

### Step 5: Update Navigation (Optional)
```typescript
// src/components/Navbar.tsx
// Add to navItems array:
{ title: 'New Page', path: '/new-page' }
```

## 🔧 Adding New Components

### Step 1: Create Component
```typescript
// src/components/NewComponent.tsx
import React from 'react';
import './NewComponent.css';

interface NewComponentProps {
  title: string;
  children?: React.ReactNode;
}

const NewComponent: React.FC<NewComponentProps> = ({ title, children }) => {
  return (
    <div className="new-component">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default NewComponent;
```

### Step 2: Export Component
```typescript
// src/components/index.ts
export { default as NewComponent } from './NewComponent';
```

## 📋 Best Practices

### 1. **File Naming**
- Use PascalCase for component files: `HomePage.tsx`
- Use camelCase for utility files: `routeConfig.ts`
- Use kebab-case for CSS files: `home-page.css` (or match component name)

### 2. **Component Structure**
- Props interface above component
- Functional components with TypeScript
- Default export at the bottom

### 3. **Import Organization**
```typescript
// External libraries
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Internal components
import { Navbar } from '../components';

// Types
import { RouteConfig } from '../types';

// Styles (last)
import './Component.css';
```

### 4. **TypeScript Usage**
- Define interfaces for all props
- Use proper typing for event handlers
- Leverage type utilities (Pick, Omit, etc.)

## 🎯 Key Features

- ✅ **TypeScript Support**: Full type safety
- ✅ **React Router**: Client-side routing
- ✅ **Modular Architecture**: Easy to extend
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Clean Styling**: Modern CSS with flexbox/grid
- ✅ **Reusable Components**: DRY principle
- ✅ **Barrel Exports**: Clean import statements

## 🛡️ Type Safety

All components, utilities, and configurations are fully typed with TypeScript, providing:
- Compile-time error checking
- IntelliSense support
- Refactoring safety
- Better developer experience

This architecture provides a solid foundation for scaling your React application while maintaining clean, maintainable code. 