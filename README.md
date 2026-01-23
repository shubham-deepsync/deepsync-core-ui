# DeepSync Core UI

A modern React + TypeScript application for the Deep Sync data matching platform.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit:
```
http://localhost:3000
```

## 📁 Project Structure

```
deepsync-core-ui/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Sidebar, Header, Layout)
│   │   ├── common/          # Reusable components (Modal, etc.)
│   │   └── charts/         # Chart components (for future use)
│   ├── pages/
│   │   ├── Overview/       # Overview/Dashboard page
│   │   ├── RunMatchReport/ # Run Match Report page
│   │   ├── Connections/    # Connections management page
│   │   └── Intelligence/   # Match Report Intelligence page
│   ├── hooks/              # Custom React hooks (for future API integration)
│   ├── services/           # API services (for future use)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions and constants
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # Application entry point
│   └── styles.css          # Global styles
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Features

- ✅ **Overview Page** - Dashboard with KPI cards and job list
- ✅ **Run Match Report** - File upload and data import
- ✅ **Connections** - Manage data source connections (S3, Snowflake, SFTP, Databricks)
- ✅ **Intelligence** - Analytics dashboard with tabs (Clean Data, Identity Analysis, Enrich Data, Full Report)
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **TypeScript** - Full type safety
- ✅ **React Router** - Client-side routing

## 📝 Current Status

- **Static Data**: All pages use mock/static data from `utils/constants.ts`
- **No API Integration**: API calls will be added later
- **Fully Functional UI**: All pages are converted and working

## 🔄 Next Steps (API Integration)

When ready to integrate APIs:

1. Install React Query:
```bash
npm install @tanstack/react-query axios
```

2. Set up API client in `services/apiClient.ts`
3. Create API services in `services/api/`
4. Create custom hooks in `hooks/` using React Query
5. Replace static data with API calls

See `TECH_STACK.md` and `MIGRATION_GUIDE.md` in the parent `ui/` folder for detailed instructions.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Dependencies

- React 18.2.0
- React Router DOM 6.20.0
- Recharts 2.10.3 (for charts)
- TypeScript 5.2.2
- Vite 5.0.8

## 🎨 Styling

All styles are in `src/styles.css` using CSS variables for theming. The design matches the original HTML/CSS implementation.

## 📄 Pages

- `/` - Overview (Dashboard)
- `/run` - Run Match Report
- `/connections` - Data Source Connections
- `/intelligence` - Match Report Intelligence

## 🔧 Development

The app uses:
- **Vite** for fast development and building
- **TypeScript** for type safety
- **React Router** for navigation
- **CSS Variables** for theming

All components are functional and ready for API integration!
