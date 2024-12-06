# Deploy backend only
FROM openjdk:17-slim

# Set the working directory in the container
WORKDIR /Web_api/BE_sao_ke

# Copy the JAR file from the local target directory to the container
COPY BE_sao_ke/target/myproject-0.0.1-SNAPSHOT.jar app.jar

# Copy the CSV file to the container
COPY BE_sao_ke/chuyen_khoan.csv /Web_api/BE_sao_ke/chuyen_khoan.csv

# Expose port 8080
EXPOSE 8080

# Define the entry point
ENTRYPOINT ["java", "-jar", "app.jar"]
