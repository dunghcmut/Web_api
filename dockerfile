# Use a alpine version of OpenJDK 17 as the base image
FROM openjdk:17-alpine

# Set the working directory in the container
WORKDIR /Web_api/BE_sao_ke

# Copy the application JAR file into the container
COPY BE_sao_ke/target/myproject-0.0.1-SNAPSHOT.jar app.jar

# Copy the CSV file into the container
COPY BE_sao_ke/chuyen_khoan.csv /Web_api/BE_sao_ke/chuyen_khoan.csv

# Copy the static resources (if needed) into the container
COPY BE_sao_ke/src/main/resources/static /Web_api/BE_sao_ke/static

# Expose the port that the application will run on
EXPOSE 8080

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
