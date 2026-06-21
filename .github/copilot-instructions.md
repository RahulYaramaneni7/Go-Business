# Go Business Referral Dashboard - Development Instructions

## Project Overview
A React-based referral dashboard application for Go Business with JWT authentication, protected routes, and API integration for managing referrals.

## Technology Stack
- React 18.2.0
- React Router DOM 6.14.0
- Axios for API calls
- js-cookie for cookie management
- CSS3 for styling

## Key Implementation Details

### Authentication Flow
1. User logs in with email/password at `/login`
2. JWT token received and stored in `jwt_token` cookie
3. Protected routes check for token before rendering
4. Token sent as `Authorization: Bearer {token}` in API requests

### API Endpoints
- Base URL: `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com`
- Login: `POST /api/login`
- Referrals: `GET /api/referrals` (with optional query params: search, sort, id)

### Component Hierarchy
- App.js (routes)
  - LoginPage
  - DashboardPage (protected)
    - Navbar
    - OverviewSection
    - ServiceSummarySection
    - ShareReferralSection
    - ReferralsTable
    - Footer
  - ReferralDetailsPage (protected)
  - NotFoundPage

### Code Style & Conventions
- Functional components with hooks
- One component per file
- CSS modules co-located with components
- Error handling with try-catch
- Accessible HTML with ARIA labels

## Running the Project

```bash
npm install    # Install dependencies
npm start      # Run development server
npm build      # Build for production
npm test       # Run tests
```

## Testing Credentials
- Email: admin@example.com
- Password: admin123

## Important Notes
- The API returns data in different formats; handle both nested and flat structures
- Date formatting: YYYY/MM/DD
- Profit formatting: USD currency with no decimal places
- Search and sort can be combined in a single API call
- Pagination is client-side; API returns full filtered/sorted dataset
- Handle authentication errors gracefully with user-friendly messages
