# Monorepo with NestJS Backend and Vite React Frontend

This monorepo contains two main projects:

1. **nestBackEnd**: A NestJS application.
2. **quokka-frontend**: A Vite React application.

# Docker

Run `docker-compose up`.
Backend is available at http://localhost:3000
Frontend is available at http://localhost:80

# A Few Things that should be added later on

1. **Sanitization** Currently, nest backend directly saves the HTML string that is returned from medium RSS without sanitizing it. This is not a good practice in terms of security. HTML sanitization should be added before saving it to the database.

2. **Testing** There is no testing setup both on the frontend or backend. If this was a real world product, unit/e2e tests should be added.

3. **Caching Mechanism** It would be really nice if the redis or otehr caching tool was setup. Currently, everytime, user refreshes the page, backend makes the call to the medium to get the newest contents, and either save it if there is a newer content. This makes an application a bit slow. If there was some caching setup, it would optimize the current application.
