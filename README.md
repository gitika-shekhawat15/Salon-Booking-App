# Salon Service Booking Application

A full-stack salon booking application where customers can browse salon services and book an appointment. An admin can log in to manage bookings and update their status.

This project was built as a technical assessment to demonstrate frontend development, REST APIs, MongoDB integration, authentication, validation, authorization, and basic booking conflict handling.

## Features

### Customer Side

- Salon landing page
- View available salon services
- View service details including price and duration
- Book an appointment
- Enter customer name, phone, email, date, time, and optional notes
- Server-side form validation
- Prevent duplicate bookings for the same date and time
- Show booking confirmation with booking ID

### Admin Side

- Separate admin login
- JWT-based authentication
- Protected admin APIs
- Admin-only authorization
- View all bookings
- View complete booking details
- Update booking status
- Logout

Supported booking statuses:

- Pending
- Confirmed
- Completed
- Cancelled

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- JSON Web Token (JWT)
- bcryptjs
- express-validator

## Project Structure

```text
Salon Booking App/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── serviceController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Booking.js
│   │   └── Service.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── serviceRoutes.js
│   ├── seed/
│   │   └── seed.js
│   ├── validations/
│   │   ├── authValidation.js
│   │   └── bookingValidation.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## How the Application Works

The frontend communicates with the Express backend through REST APIs.

### Customer Flow

```text
Landing Page
      ↓
Services
      ↓
Service Details
      ↓
Booking Form
      ↓
Booking API
      ↓
Booking Confirmation
```

Customers can select a service, view its price and duration, enter their details, choose a date and time, and submit the booking.

### Admin Flow

```text
Admin Login
      ↓
JWT Authentication
      ↓
Admin Dashboard
      ↓
View Bookings
      ↓
View Booking Details
      ↓
Update Booking Status
```

The admin dashboard communicates with protected backend APIs using the JWT received during login.

## Database Design

The application uses MongoDB with Mongoose.

### Admin Collection

Stores admin authentication information.

Fields:

- `email`
- `password`
- `createdAt`
- `updatedAt`

The password is stored as a bcrypt hash rather than plaintext.

### Service Collection

Stores the salon services available to customers.

Fields:

- `name`
- `description`
- `price`
- `duration`
- `isActive`
- `createdAt`
- `updatedAt`

### Booking Collection

Stores customer appointment information.

Fields:

- `customerName`
- `phone`
- `email`
- `service`
- `date`
- `time`
- `notes`
- `status`
- `createdAt`
- `updatedAt`

The `service` field references the Service collection using a MongoDB ObjectId.

The booking status is restricted to:

```text
Pending
Confirmed
Completed
Cancelled
```

## API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Admin login |

### Services

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/services` | Public | Get all active services |
| GET | `/api/services/:id` | Public | Get service details |

### Bookings

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/bookings` | Public | Create a booking |
| GET | `/api/bookings` | Admin | Get all bookings |
| GET | `/api/bookings/:id` | Admin | Get booking details |
| PATCH | `/api/bookings/:id/status` | Admin | Update booking status |

Protected booking endpoints require:

```text
Authorization: Bearer <token>
```

## Authentication and Authorization

Admin authentication is implemented using JWT.

When the admin logs in, the backend:

1. Finds the admin using the provided email.
2. Compares the password with the stored bcrypt hash.
3. Creates a JWT when the credentials are valid.
4. Adds the admin ID, email, and role to the token.

The frontend stores the returned JWT and sends it with protected API requests using the `Authorization` header.

The backend uses two middleware functions:

- `protect` verifies the JWT.
- `adminOnly` checks that the authenticated user has the `admin` role.

This ensures that admin booking APIs are protected at the backend level and cannot be accessed simply by navigating to an admin page in the frontend.

## Validation

Server-side validation is implemented using `express-validator`.

The booking API validates:

- Customer name
- Phone number
- Email
- Service ID
- Appointment date
- Appointment time
- Optional notes

Additional validation rules include:

- Customer name must be between 2 and 50 characters.
- Phone number must be a valid 10-digit Indian mobile number.
- Email must have a valid email format.
- Service ID must be a valid MongoDB ObjectId.
- Appointment date cannot be in the past.
- Time must use `HH:MM` format.
- Notes cannot exceed 500 characters.

Invalid requests return a `400 Bad Request` response with validation errors.

## Booking Conflict Handling

The application prevents two bookings from using the same appointment date and time.

Before creating a booking, the backend checks whether the selected date and time already exists.

The database also has a unique index on:

```text
date + time
```

If the slot is already booked, the API returns a conflict response and the new booking is not created.

For this assessment, one date and time represents one available salon booking slot regardless of the selected service.

For example:

```text
20/09/2026 at 17:30
```

If this slot is already booked, another customer cannot create a booking for the same date and time.

## Technical Decisions

### React + Vite

React was used to build both the customer-facing pages and admin interface. Vite provides a lightweight development setup and fast development server.

### React Router

React Router is used for navigation between the landing page, services, service details, booking page, confirmation page, and admin pages.

### Tailwind CSS

Tailwind CSS is used to create the responsive user interface without maintaining a large separate stylesheet.

### Express.js

Express was used to build the REST API. Controllers, routes, middleware, models, and validation logic are separated to keep the backend organized.

### MongoDB + Mongoose

MongoDB stores services, bookings, and admin information. Mongoose provides schemas, model validation, ObjectId references, and database operations.

### JWT Authentication

JWT was chosen for admin authentication because the application requires token-based authentication for protected admin APIs.

### Separate Frontend and Backend

The frontend communicates with the backend through REST APIs. The frontend does not directly access MongoDB, keeping database operations and business logic on the server.

## Challenges

One of the main challenges was connecting the booking form with the backend while ensuring that invalid customer information could not create a booking.

Another challenge was protecting the admin booking APIs. JWT verification and an admin-only middleware were added so that booking management endpoints require valid admin authorization.

Handling duplicate appointment slots was also an important part of the implementation. The backend checks the selected date and time, while the database unique index provides an additional safeguard against duplicate bookings.

## Setup Instructions

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/gitika-shekhawat15/Salon-Booking-App.git
cd Salon-Booking-App
```

### 2. Setup Backend

Open a terminal inside the `backend` folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

Use the following structure:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/salonBooking
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@salon.com
ADMIN_PASSWORD=your_admin_password
```

Do not commit the `.env` file to GitHub.

Run the seed script to create the initial services and admin account:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal and move to the frontend folder:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Vite will display the frontend URL in the terminal, usually:

```text
http://localhost:5173
```

## Admin Demo Credentials

For local assessment/demo use:

```text
Email: admin@salon.com
Password: Admin@123
```

These credentials are configured through environment variables and should not be committed as secrets.

## Security Notes

- The actual `.env` file is excluded from Git.
- `.env.example` is included to document the required environment variables.
- Admin passwords are stored using bcrypt hashing.
- JWT is used for admin authentication.
- Admin APIs are protected by backend middleware.
- Admin authorization is checked on the backend.
- Server-side validation is applied to incoming booking and authentication data.
- No database credentials or JWT secrets are committed to the repository.

## Future Improvements

Possible improvements for a production version include:

- Customer booking history
- More advanced availability based on service duration
- Staff/resource-based scheduling
- Email or SMS booking notifications
- Online payment integration
- Admin search and filtering
- Automated unit and API tests
- Production deployment with a cloud database

## GitHub Repository

[Salon Booking App - GitHub](https://github.com/gitika-shekhawat15/Salon-Booking-App)

## Final Application Flow

### Customer

```text
Landing Page
    ↓
Services
    ↓
Service Details
    ↓
Booking
    ↓
Confirmation
```

### Admin

```text
Admin Login
    ↓
Dashboard
    ↓
View Bookings
    ↓
View Booking Details
    ↓
Update Status
```