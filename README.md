
### Yêu cầu

- Docker (Vui lòng cài đặt Docker nếu chưa có: [Cài đặt Docker](https://docs.docker.com/get-docker/))
- Docker Compose (Nếu sử dụng Docker Compose)

## Hướng dẫn chạy Dockerfile

### Bước 1: Clone repository
Trước tiên, bạn cần clone repository về máy tính của mình:
```bash
git clone https://github.com/dunghcmut/Web_api.git
cd Web_api
```

### Bước 2: Xây dựng Docker image
Xây dựng Docker image từ Dockerfile bằng lệnh sau:
```bash
docker build -t your-image-name .
```
Ở đây, `your-image-name` là tên bạn muốn đặt cho image của mình.

### Bước 3: Chạy container
Sau khi xây dựng thành công image, bạn có thể chạy container bằng lệnh:
```bash
docker run -d -p 8080:8080 your-image-name
```
Lệnh trên sẽ chạy container trong chế độ nền (`-d`) và ánh xạ cổng 8080 của container với cổng 8080 trên máy của bạn.

### Bước 4: Kiểm tra ứng dụng
Mở trình duyệt và truy cập `http://localhost:8080` để kiểm tra ứng dụng đang chạy trong container.

## Thêm thông tin

- Nếu bạn muốn dừng container, sử dụng lệnh:
  ```bash
  docker stop your-container-id
  ```

- Để xóa container, sử dụng:
  ```bash
  docker rm your-container-id
  ```

- Để xóa image, sử dụng:
  ```bash
  docker rmi your-image-name
  ```

## Các thông tin khác

- Để kiểm tra các container đang chạy:
  ```bash
  docker ps
  ```

- Để kiểm tra các image đã tạo:
  ```bash
  docker images
  ```

```
