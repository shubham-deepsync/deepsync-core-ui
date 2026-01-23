# Quick Setup Guide

## Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd deepsync-core-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## What's Included

✅ All pages converted to React components:
- Overview (Dashboard)
- Run Match Report
- Connections
- Intelligence (with tabs)

✅ All static data preserved:
- Jobs list
- KPI data
- Connections list
- All metrics and charts

✅ Full functionality:
- Navigation
- Search and filtering
- File upload (UI ready)
- Modal dialogs
- Tab switching
- Job selection

## Next Steps

When you're ready to integrate APIs:

1. Install React Query:
   ```bash
   npm install @tanstack/react-query axios
   ```

2. Replace static data in `utils/constants.ts` with API calls
3. Create API services in `services/api/`
4. Create custom hooks in `hooks/`

See the main `TECH_STACK.md` for detailed API integration examples.
