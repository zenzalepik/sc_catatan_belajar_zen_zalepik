# Manajemen Container

## Overview

Manajemen container adalah keterampilan fundamental dalam menggunakan Podman. Chapter ini akan membahas cara mengelola container secara efektif.

## Running Containers

### Basic Run

```bash
# Run container sederhana
podman run nginx:latest

# Run detached mode (background)
podman run -d nginx:latest

# Run dengan nama
podman run -d --name web-server nginx:latest

# Run dengan port mapping
podman run -d --name web-server -p 8080:80 nginx:latest
```

### Environment Variables

```bash
# Set environment variable
podman run -d --name my-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgres:latest

# Load dari file
podman run --env-file .env my-app:latest
```

### Volume Mounting

```bash
# Mount directory lokal
podman run -d --name web-server \
  -v ./html:/usr/share/nginx/html \
  -p 8080:80 \
  nginx:latest

# Mount dengan read-only
podman run -d --name web-server \
  -v ./html:/usr/share/nginx/html:ro \
  nginx:latest

# Named volumes
podman volume create my-data
podman run -d -v my-data:/data my-app:latest
```

## Container Lifecycle

### Start & Stop

```bash
# Stop container
podman stop web-server

# Start container yang sudah stop
podman start web-server

# Restart container
podman restart web-server

# Pause/Unpause
podman pause web-server
podman unpause web-server
```

### Remove Containers

```bash
# Remove container yang sudah stop
podman rm web-server

# Force remove container yang masih running
podman rm -f web-server

# Remove semua stopped containers
podman container prune
```

## Inspecting & Logs

### Container Info

```bash
# List running containers
podman ps

# List semua containers
podman ps -a

# Detail container
podman inspect web-server

# Lihat specific field
podman inspect --format='{{.State.Status}}' web-server
```

### Logs

```bash
# Lihat logs
podman logs web-server

# Follow logs (real-time)
podman logs -f web-server

# Lihat 100 baris terakhir
podman logs --tail 100 web-server

# Dengan timestamp
podman logs -t web-server
```

### Exec Commands

```bash
# Exec ke dalam container
podman exec -it web-server /bin/bash

# Run command spesifik
podman exec web-server ls -la /usr/share/nginx/html

# Dengan user tertentu
podman exec -u root web-server apt update
```

## Image Management

### Working with Images

```bash
# Pull image
podman pull ubuntu:22.04

# List semua images
podman images

# Remove image
podman rmi ubuntu:22.04

# Remove dangling images
podman image prune

# Save image ke file
podman save -o nginx.tar nginx:latest

# Load image dari file
podman load -i nginx.tar
```

### Building Images

```bash
# Build dari Dockerfile
podman build -t my-app:1.0 .

# Build dengan specific Dockerfile
podman build -f Dockerfile.prod -t my-app:prod .

# Build tanpa cache
podman build --no-cache -t my-app:latest .
```

Contoh Dockerfile sederhana:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "app.py"]
```

## Resource Management

### Resource Limits

```bash
# Limit memory
podman run -d --memory="512m" my-app:latest

# Limit CPU
podman run -d --cpus="1.5" my-app:latest

# Limit both
podman run -d \
  --memory="512m" \
  --cpus="1.5" \
  my-app:latest
```

### Statistics

```bash
# Lihat resource usage
podman stats

# Lihat semua containers
podman stats -a

# One-time snapshot
podman stats --no-stream
```

## Export & Import

```bash
# Export container filesystem
podman export web-server -o web-server.tar

# Import sebagai image
podman import web-server.tar my-web-server:latest

# Commit container ke image
podman commit web-server my-web-server:v1.0
```

## Tips & Best Practices

### 1. Gunakan --rm untuk Temporary Containers

```bash
# Auto-remove setelah exit
podman run --rm ubuntu:22.04 echo "Hello"
```

### 2. Health Checks

```bash
podman run -d --name web-server \
  --health-cmd="curl -f http://localhost/ || exit 1" \
  --health-interval=30s \
  --health-retries=3 \
  nginx:latest

# Check health status
podman inspect --format='{{.State.Health.Status}}' web-server
```

### 3. Cleanup Otomatis

```bash
# Hapus semua stopped containers
podman container prune

# Hapus semua unused images
podman image prune -a

# Hapus semua unused volumes
podman volume prune
```

### 4. Generate Systemd Service

```bash
# Generate systemd unit file
podman generate systemd --new --name web-server > container-web-server.service

# Enable & start
systemctl --user enable container-web-server.service
systemctl --user start container-web-server.service
```

## Command Reference

| Command | Deskripsi |
|---------|-----------|
| `podman run` | Run container baru |
| `podman start` | Start container yang sudah ada |
| `podman stop` | Stop container |
| `podman restart` | Restart container |
| `podman rm` | Remove container |
| `podman ps` | List containers |
| `podman logs` | View container logs |
| `podman exec` | Exec command di container |
| `podman inspect` | Inspect container detail |
| `podman stats` | View resource usage |

## Praktik Lanjutan

Selanjutnya kita akan mempelajari tentang Pods dan Networking untuk orchestration yang lebih kompleks!
