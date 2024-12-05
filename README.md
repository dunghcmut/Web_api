# Hướng dẫn triển khai ứng dụng

## Frontend (FE)

### Môi trường yêu cầu:
- **Node.js**: Phiên bản tương thích với project (kiểm tra trong file `package.json`).

### Các bước triển khai:
1. **Clone mã nguồn**:
   - Clone mã nguồn frontend từ repository bằng cách sử dụng lệnh:
     ```bash
     git clone <link_to_frontend_repository>
     ```

2. **Cài đặt dependencies**:
   - Chạy lệnh sau để cài đặt các thư viện cần thiết:
     ```bash
     npm install
     ```

3. **Cấu hình**:
   - Kiểm tra và chỉnh sửa các cấu hình trong project nếu cần (ví dụ: cấu hình API endpoint hoặc môi trường).

4. **Build ứng dụng**:
   - Chạy lệnh sau để build ứng dụng:
     ```bash
     npm run build
     ```

5. **Triển khai**:
   - Deploy ứng dụng frontend đã build lên local host bằng cách chạy lệnh:
     ```bash
     npm start
     ```

   - Ứng dụng sẽ được chạy trên `http://localhost:3000` (hoặc cổng khác nếu có cấu hình khác).

---

## Backend (BE)

### Môi trường yêu cầu:
- **Java 17** trở lên.

### Các bước triển khai:
1. **Clone mã nguồn**:
   - Clone mã nguồn backend từ repository bằng cách sử dụng lệnh:
     ```bash
     git clone https://github.com/dunghcmut/Web_api.git
     ```

2. **Chạy ứng dụng**:
   - Di chuyển vào thư mục BE_sao_ke chạy file JAR bằng lệnh:
     ```bash
     java -jar '/BE_sao_ke/target/myproject-0.0.1-SNAPSHOT.jar'
     ```

   - Ứng dụng backend sẽ được chạy và sẵn sàng để nhận yêu cầu từ frontend.

