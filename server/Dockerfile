FROM amazoncorretto:17
WORKDIR /app
COPY ./build/libs/*.jar app.jar
# COPY ./credentials.json credentials.json
EXPOSE 8000
CMD ["java", "-jar", "app.jar"]