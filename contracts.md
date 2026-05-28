# GoldenFX Portfolio - Frontend/Backend Integration Contract

## Current State: Frontend with Mock Data ✅

### Mock Data Location
- `/app/frontend/src/mock.js` - Contains 6 sample animations

### What's Currently Working (Frontend Only)
1. ✅ Hero section with GoldenFX branding
2. ✅ About section with bio
3. ✅ Portfolio gallery with 6 mock animations
4. ✅ Category filtering (All, Walk Cycle, Combat, Emote, Cutscene, Other)
5. ✅ Animation cards with hover effects
6. ✅ Modal lightbox for animation details
7. ✅ Contact section with X/Twitter and Discord
8. ✅ Admin login page UI (mock authentication)
9. ✅ Admin upload form UI (mock file handling)
10. ✅ Black (#000000) + Yellow (#FFE000) color scheme

---

## Backend Implementation Plan

### Technology Stack
- **Frontend**: React (existing)
- **Backend**: FastAPI (existing)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth

### Supabase Configuration
- Project URL: https://qzhxwbtydzwauvawtanj.supabase.co
- Anon Key: (provided)
- Admin Email: alexandru.cadar1@icloud.com
- Admin Password: Alexandru!@#$1234

---

## Database Schema

### Table: `animations`
```sql
CREATE TABLE animations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS) Policies
```sql
-- Enable RLS
ALTER TABLE animations ENABLE ROW LEVEL SECURITY;

-- Public can view all animations
CREATE POLICY "Allow public read access"
ON animations FOR SELECT
TO anon
USING (true);

-- Authenticated users can insert
CREATE POLICY "Allow authenticated insert"
ON animations FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated users can update
CREATE POLICY "Allow authenticated update"
ON animations FOR UPDATE
TO authenticated
USING (true);

-- Authenticated users can delete
CREATE POLICY "Allow authenticated delete"
ON animations FOR DELETE
TO authenticated
USING (true);
```

### Storage Bucket: `animations`
- Bucket name: `animations`
- Public bucket: Yes (for read access)
- Folders: `/videos`, `/thumbnails`

### Storage Policies
```sql
-- Authenticated users can upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'animations');

-- Public can view files
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'animations');

-- Authenticated users can delete
CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'animations');
```

---

## API Endpoints (Backend)

### Public Endpoints (No Auth Required)

#### GET `/api/animations`
- **Purpose**: Fetch all animations for public portfolio
- **Response**: Array of animation objects
- **Frontend Usage**: Home.jsx - Portfolio section

#### GET `/api/animations?category={category}`
- **Purpose**: Filter animations by category
- **Response**: Filtered array of animation objects
- **Frontend Usage**: Home.jsx - Category filter

### Protected Endpoints (Auth Required)

#### POST `/api/auth/login`
- **Purpose**: Admin login via Supabase Auth
- **Request**: `{ email, password }`
- **Response**: `{ access_token, user }`
- **Frontend Usage**: Admin.jsx - Login form

#### POST `/api/animations`
- **Purpose**: Create new animation
- **Request**: `{ title, description, category, video_file, thumbnail_file }`
- **Response**: Created animation object
- **Frontend Usage**: Admin.jsx - Upload form

#### DELETE `/api/animations/{id}`
- **Purpose**: Delete animation
- **Response**: `{ success: true }`
- **Frontend Usage**: Admin.jsx - Delete button

#### POST `/api/upload/video`
- **Purpose**: Upload video file to Supabase Storage
- **Request**: Multipart form data with video file
- **Response**: `{ url: "https://..." }`
- **Frontend Usage**: Admin.jsx - Video upload

#### POST `/api/upload/thumbnail`
- **Purpose**: Upload thumbnail image to Supabase Storage
- **Request**: Multipart form data with image file
- **Response**: `{ url: "https://..." }`
- **Frontend Usage**: Admin.jsx - Thumbnail upload

---

## Frontend Changes Required

### 1. Remove Mock Data Integration
- **File**: `/app/frontend/src/pages/Home.jsx`
- **Change**: Replace `mockAnimations` import with API call to `/api/animations`
- **Method**: Use `axios.get()` with useEffect hook

### 2. Implement API Integration for Admin
- **File**: `/app/frontend/src/pages/Admin.jsx`
- **Changes**:
  - Replace mock login with Supabase Auth API call
  - Replace mock publish with POST to `/api/animations`
  - Add file upload handling to `/api/upload/video` and `/api/upload/thumbnail`
  - Replace mock delete with DELETE to `/api/animations/{id}`

### 3. Add Authentication Context
- **New File**: `/app/frontend/src/context/AuthContext.jsx`
- **Purpose**: Manage auth state (token, user)
- **Usage**: Protect admin routes, add auth header to API requests

### 4. Install Supabase Client (if direct client-side access needed)
- **Package**: `@supabase/supabase-js`
- **Usage**: For auth and real-time features (optional)

---

## Backend Implementation Steps

### Step 1: Setup Supabase Python Client
```bash
pip install supabase
```

### Step 2: Configure Environment Variables
- Add to `/app/backend/.env`:
  - SUPABASE_URL
  - SUPABASE_KEY
  - SUPABASE_SERVICE_ROLE_KEY (for admin operations)

### Step 3: Create Supabase Setup Script
- **File**: `/app/backend/setup_supabase.py`
- **Purpose**: Initialize database tables, RLS policies, storage bucket

### Step 4: Create Backend Routes
- **File**: `/app/backend/routes/animations.py`
  - GET `/api/animations` - Fetch all animations
  - POST `/api/animations` - Create animation (protected)
  - DELETE `/api/animations/{id}` - Delete animation (protected)
  
- **File**: `/app/backend/routes/auth.py`
  - POST `/api/auth/login` - Login via Supabase
  - POST `/api/auth/signup` - Create admin account
  
- **File**: `/app/backend/routes/upload.py`
  - POST `/api/upload/video` - Upload video to Supabase Storage
  - POST `/api/upload/thumbnail` - Upload thumbnail to Supabase Storage

### Step 5: Create Middleware
- **File**: `/app/backend/middleware/auth.py`
- **Purpose**: Verify Supabase JWT tokens for protected routes

### Step 6: Update server.py
- Import and include new routers
- Add auth middleware to protected routes

---

## Testing Plan

### Manual Testing
1. Test public portfolio loads animations from Supabase
2. Test category filtering works
3. Test admin login with provided credentials
4. Test animation upload (video + thumbnail)
5. Test animation deletion
6. Test animation appears on public portfolio after upload

### Automated Testing (via testing agent)
1. Backend API endpoint testing
2. Frontend component testing
3. E2E testing of full upload workflow

---

## Next Steps

1. ✅ Frontend with mock data complete
2. ⏳ Get user approval to proceed with backend
3. ⏳ Implement Supabase integration
4. ⏳ Connect frontend to backend
5. ⏳ Test full workflow
6. ⏳ Deploy and verify
