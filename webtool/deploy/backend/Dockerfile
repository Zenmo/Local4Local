# Dockerfile for production environment

FROM docker.io/library/gradle:8.13-jdk21 AS builder

COPY . /home/gradle
RUN gradle backend:shadowJar

FROM amazoncorretto:21-al2023-headless

COPY --from=builder /home/gradle/backend/build/libs/backend.jar /app/backend.jar

EXPOSE 9000

CMD ["java", "-jar", "/app/backend.jar"]
