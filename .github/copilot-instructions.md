# AI Coding Agent Instructions - RedHub

## Project Overview

**RedHub** is a full-stack fintech dashboard application for personal financial management. It comprises:
- **Backend**: FastAPI Python server providing REST APIs for cashback, payments, insurance, and financial data
- **Frontend**: React + TypeScript + Vite with shadcn/ui components for responsive UI

The architecture follows a strict client-server pattern with backend routes exposed at `/api/*` and consumed by frontend services via axios.

## Architecture & Key Patterns

### Backend (FastAPI)
- **Structure**: Modular routing system in `app/routes/` with each feature (cashback, payments, etc.) as separate routers
- **CORS Setup**: Configured in `app/main.py` for localhost:8080 (frontend dev server)
- **Route Registration**: Individual routers imported in `app/routes/api.py` and mounted with prefixes (e.g., `/api/cashback`)
- **Schemas**: Pydantic models in `app/models/schemas.py` define request/response contracts
- **Key Files**:
  - `app/main.py` - FastAPI app initialization and middleware setup
  - `app/routes/api.py` - Router aggregator (include new routers here)
  - `app/routes/cashback.py` - Example feature implementation with GET/POST endpoints
  - `app/models/schemas.py` - Data validation using Pydantic

### Frontend (React + TypeScript)
- **Structure**: Component-driven with pages, components/ui, services, hooks, and utils
- **Styling**: TailwindCSS + shadcn/ui (Pre-built accessible components in `src/components/ui/`)
- **State Management**: React Query (TanStack) for server state + React hooks for local state
- **Routing**: React Router v6 with Layout wrapper providing sidebar navigation
- **Services Layer**: Axios-based API clients (e.g., `src/services/cashbackService.ts`) handle backend communication
- **Key Files**:
  - `src/App.tsx` - Route definitions and QueryClientProvider setup
  - `src/components/Layout.tsx` - Main layout with sidebar/header
  - `src/pages/` - Feature pages (Cashback.tsx, Payments.tsx, etc.)
  - `src/services/` - API client modules

## Development Workflows

### Starting the Application
**Backend** (from `backend/` directory):
```bash
python -m uvicorn app.main:app --reload --port 8000
```
Server runs at `http://localhost:8000`, Swagger docs at `/docs`

**Frontend** (from `frontend/redhub/` directory):
```bash
npm run dev
```
Dev server runs at `http://localhost:5173`

### Adding a New Feature

1. **Backend**: Create new router file in `app/routes/{feature}.py`
2. Add router to `app/routes/api.py`:
   ```python
   from app.routes.{feature} import router as {feature}_router
   router.include_router({feature}_router, prefix="/{feature}")
   ```
3. **Frontend**: Create service in `src/services/{feature}Service.ts` using axios pattern from `cashbackService.ts`
4. Create page in `src/pages/{Feature}.tsx` with data fetching via service
5. Add route in `src/App.tsx` and link in sidebar navigation

### Build & Deployment
- Frontend: `npm run build` (outputs to `dist/`)
- Backend: Already structured for uvicorn deployment

## Project-Specific Conventions

### API Response Format
All endpoints return JSON objects (no array wrapping). Single records and lists both use object format:
```typescript
// From cashbackService - Pattern used throughout
async getCashbackData() {
  const response = await axios.get(`${API_BASE_URL}/cashback`);
  return response.data; // Directly returns object/array
}
```

### Component Conventions
- **shadcn/ui Components**: Pre-installed and imported directly from `@/components/ui/`
  - Use `Button`, `Card`, `Progress`, `Dialog`, etc. for consistent styling
  - All components accept `className` prop for TailwindCSS overrides
- **Icons**: Use `lucide-react` (already imported in pages like Cashback.tsx)
- **Layout**: All pages wrapped in Layout component providing sidebar

### Data Fetching Pattern
Frontend uses React Query for server state:
```tsx
// Typical pattern (see Cashback.tsx)
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetch = async () => {
    try {
      const result = await service.getEndpoint();
      setData(result);
    } finally {
      setLoading(false);
    }
  };
  fetch();
}, []);
```

### Color/Styling System
- **TailwindCSS**: All styling via utility classes
- **Theme**: Uses Sonner (toast notifications) and next-themes for dark mode support
- **Cards**: Gradient backgrounds with `bg-gradient-primary` (see Cashback.tsx)

## Key Integration Points

### Cross-Component Communication
- **Backend → Frontend**: REST APIs through `/api/*` routes
- **Frontend Service Layer**: `cashbackService` pattern connects pages to backend
- **Layout System**: `AppSidebar` provides navigation; all pages wrapped in `Layout` component

### External Dependencies
- **Backend**: FastAPI, Pydantic, Uvicorn (Python 3.x)
- **Frontend**: React 18, TypeScript, TailwindCSS, Radix UI, Recharts (charts), Zod (validation)

## Common Tasks

| Task | Location | Example |
|------|----------|---------|
| Add API endpoint | `app/routes/{feature}.py` | See `app/routes/cashback.py` - use `@router.get()` or `@router.post()` |
| Add frontend page | `src/pages/{Page}.tsx` | See `src/pages/Cashback.tsx` - use `Layout` wrapper |
| Add UI component | `src/components/` | Import from `@/components/ui/` or create custom component |
| Create API client | `src/services/{service}Service.ts` | Follow axios pattern in `cashbackService.ts` |
| Update schema | `app/models/schemas.py` | Define Pydantic `BaseModel` classes for validation |

## Important Notes

- CORS is only configured for `http://localhost:8080` - update in `app/main.py` for different frontend URLs
- API base URL is hardcoded to `http://localhost:8000/api` in services - centralize if needed
- Frontend uses port `5173` (Vite default), backend on `8000`
- Ensure both servers are running for full integration testing
