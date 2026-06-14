# ImageStudio
Full-stack AI-powered image transformation platform built with React, Node.js, MongoDB, Cloudinary and Replicate.
# How I Built ImageStudio

ImageStudio is a full-stack AI application that I designed and developed end-to-end.

The idea behind the project was to create a platform where users can upload photos, manage a personal gallery, and generate professional AI-enhanced portraits.

I designed the architecture from scratch and implemented both the frontend and backend.

### Frontend

I built the UI using React, Vite, TailwindCSS and React Router.

The application contains:

* Landing page
* Authentication pages
* Protected dashboard
* Image upload flow
* Personal gallery
* AI style selection

### Backend

I implemented a Node.js and Express server responsible for:

* Authentication APIs
* JWT generation and validation
* Image upload endpoints
* AI generation endpoints
* User authorization

### Database

I used MongoDB Atlas to store users and image metadata.

Each image document stores:

* Original image URL
* Generated image URL
* Style
* Prompt
* Status

### Cloud Storage

Images are uploaded to Cloudinary, allowing scalable cloud-based image management.

### AI Pipeline

The system sends image generation requests to external AI models through Replicate.

The generated output is returned and saved back to the user's gallery.

### Security

Passwords are hashed using bcrypt and APIs are protected with JWT authentication.

### Main Challenges

* Designing the application architecture.
* Connecting multiple external services.
* Managing image upload and storage.
* Handling asynchronous AI generation workflows.
* Creating a clean user experience.

### Skills Demonstrated

* Full Stack Development
* React
* Node.js
* Express
* MongoDB
* REST APIs
* JWT Authentication
* Cloud Storage
* AI Integration
* System Design
* Software Architecture
