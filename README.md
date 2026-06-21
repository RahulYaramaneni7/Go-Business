# Go Business Referral Dashboard

A modern, responsive web-based referral management system built with React. Users can track referrals, earnings, and partner activity through a secure, authenticated dashboard.

## Features

- **User Authentication**: Secure login with JWT token-based authentication
- **Mock API**: Built-in test data for development and deployment without external API dependency
- **Protected Routes**: Access control with automatic redirect to login for unauthorized users
- **Referral Dashboard**: Overview of metrics, service summary, and comprehensive referrals table
- **Search & Filter**: Search referrals by name or service
- **Sort & Pagination**: Sort by date and paginate results (10 items per page)
- **Share Functionality**: Copy referral links and codes to clipboard
- **Referral Details**: View detailed information for individual referrals
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Frontend Framework**: React 18.2.0
- **Routing**: React Router DOM 6.14.0
- **HTTP Client**: Axios 1.4.0
- **Cookie Management**: js-cookie 3.0.5
- **Build Tool**: Create React App / react-scripts 5.0.1

## Project Structure

```
Go_Business/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.js
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── OverviewSection.js
│   │   ├── ServiceSummarySection.js
│   │   ├── ShareReferralSection.js
│   │   └── ReferralsTable.js
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   ├── ReferralDetailsPage.js
│   │   └── NotFoundPage.js
│   ├── styles/
│   │   ├── LoginPage.css
│   │   ├── Navbar.css
│   │   ├── Footer.css
│   │   ├── DashboardPage.css
│   │   ├── OverviewSection.css
│   │   ├── ServiceSummarySection.css
│   │   ├── ShareReferralSection.css
│   │   ├── ReferralsTable.css
│   │   ├── ReferralDetailsPage.css
│   │   └── NotFoundPage.css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Creates an optimized production build in the `build` directory.

## Authentication

### Test Credentials
- **Email**: admin@example.com
- **Password**: admin123

### How Authentication Works

1. User submits email and password on the login page
2. POST request sent to `/api/login` endpoint
3. JWT token returned in response and stored in `jwt_token` cookie
4. Token included in subsequent API requests as `Authorization: Bearer {token}`
5. Token automatically cleared on logout

## API Integration

### Login Endpoint
```
POST https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/login
Body: { "email": "...", "password": "..." }
Response: { "data": { "token": "..." } }
```

### Referrals Endpoint
```
GET https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals
Query Parameters:
  - search (optional): Search by name or service
  - q (optional): Alternative to search parameter
  - sort (optional): 'asc' or 'desc', defaults to 'desc'
  - id (optional): Fetch single referral by ID

Headers: Authorization: Bearer {jwt_token}
Response: { "success": true, "data": { "metrics": [...], "serviceSummary": {...}, "referral": {...}, "referrals": [...] } }
```

## Route Structure

| Route | Type | Purpose |
|-------|------|---------|
| `/login` | Public | User authentication |
| `/` | Protected | Referral dashboard home |
| `/referral/:id` | Protected | Individual referral details |
| `*` | Public | 404 Not Found page |

## Key Features

### Dashboard Page
- **Overview Metrics**: Display KPIs from the API
- **Service Summary**: Table with service details
- **Share Referral**: Copy links and codes to clipboard
- **Referrals Table**: Searchable, sortable, paginated table with 10 items per page

### Protected Routes
All dashboard content is protected and requires a valid JWT token. Unauthorized users are redirected to `/login`.

### Responsive Design
- Mobile-optimized layouts
- Touch-friendly buttons and inputs
- Flexible grid systems for various screen sizes

## Development Notes

### Code Organization
- Components are organized by feature
- Styles are modularized with corresponding CSS files
- Each page component manages its own state and API calls

### Accessibility Features
- Semantic HTML (forms, labels, landmarks)
- ARIA labels for navigation and regions
- Keyboard navigation support
- Screen reader friendly error messages

### Error Handling
- Login errors display user-friendly messages
- API failures show status codes and error messages
- 404 page for non-existent routes and referrals

## Deployment

### Deploy to Vercel

1. **Connect Repository**
   ```bash
   vercel link
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard

4. **Production Build**
   Vercel automatically builds and deploys the `build` directory

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User profile management
- Referral analytics and charts
- Email notifications
- Multi-language support
- Dark mode theme
- Export referral data

## Support

For issues or questions, please refer to the project documentation or contact support.

---

**Version**: 1.0.0  
**Last Updated**: June 2026
