FROM maven:3.9-eclipse-temurin-11 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src/main ./src/main
RUN mvn clean package -DskipTests

FROM eclipse-temurin:11-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-cp", "app.jar", "br.com.soap.SoapServer"]