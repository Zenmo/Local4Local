# Create a container image which serves a static site

# Build stage 1
FROM docker.io/library/gradle:8.13-jdk21 AS gradle

COPY gradle /home/gradle/gradle
WORKDIR /home/gradle/gradle

RUN --mount=type=cache,target=/home/gradle/.gradle/caches gradle jsBrowserProductionLibraryDistribution

# Build stage 2
FROM docker.io/library/node:25.1.0 AS nodejs

WORKDIR /app/frontend

# minimal layer so we can cache node_modules
COPY frontend/package.json frontend/package-lock.json /app/frontend/
RUN npm install

COPY --from=gradle /home/gradle/gradle/build/js/packages/local4local-common /app/gradle/build/js/packages/local4local-common

ARG VITE_BACKEND_URL=https://local4local-backend.zenmo.com
ARG VITE_ANYLOGIC_CALLBACK_URL=https://local4local-backend.zenmo.com

# Build static site
COPY frontend /app/frontend
RUN ls -ahl
RUN npm run build

# Final image
FROM docker.io/pierrezemb/gostatic:latest

COPY --from=nodejs /app/frontend/dist /srv/http

EXPOSE 8080

CMD ["-log-level", "debug", "-fallback", "index.html", "-port", "8080"]
