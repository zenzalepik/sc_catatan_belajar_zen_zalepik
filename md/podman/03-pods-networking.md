# Podman Pods dan Networking

## Apa itu Pod?

Pod adalah **grup satu atau lebih container** yang berbagi resources yang sama (network, storage, dll). Konsep ini diadopsi dari Kubernetes dan memungkinkan container-container untuk berkomunikasi dengan mudah.

## Pod Basics

### Membuat Pod

```bash
# Buat pod sederhana
podman pod create --name my-pod

# Buat pod dengan port mapping
podman pod create --name web-pod -p 8080:80

# Lihat semua pods
podman pod ps

# Inspect pod
podman pod inspect web-pod
```

### Menambahkan Container ke Pod

```bash
# Container pertama (web server)
podman run -d --pod web-pod --name nginx nginx:latest

# Container kedua (sidecar untuk logging)
podman run -d --pod web-pod --name log-collector fluentd:latest

# Container ketiga (monitoring)
podman run -d --pod web-pod --name prometheus prom/prometheus:latest
```

### Pod Commands

```bash
# Start pod (semua container di dalamnya)
podman pod start web-pod

# Stop pod
podman pod stop web-pod

# Restart pod
podman pod restart web-pod

# Remove pod (dengan semua container)
podman pod rm -f web-pod

# Pause/Unpause pod
podman pod pause web-pod
podman pod unpause web-pod
```

### Pod dengan Infrastruktur Container

```bash
# Pod otomatis membuat infra container
podman pod create --name my-pod -p 8080:80

# Container dalam pod bisa berkomunikasi via localhost
podman run -d --pod my-pod --name app my-app:latest
podman run -d --pod my-pod --name db postgres:latest

# App bisa akses DB via localhost:5432
```

## Networking

### Network Types

```bash
# List semua networks
podman network ls

# Inspect network
podman network inspect podman
```

**Network modes:**
- `bridge` - Default network mode
- `host` - Gunakan host network langsung
- `slirp4netns` - Default untuk rootless
- `pasta` - Network mode baru yang lebih efisien
- `none` - No networking

### Custom Networks

```bash
# Buat network baru
podman network create my-network

# Buat network dengan subnet
podman network create \
  --subnet 10.0.0.0/24 \
  --gateway 10.0.0.1 \
  my-network

# Run container dengan network tertentu
podman run -d --network my-network --name web nginx:latest

# Connect container ke network
podman network connect my-network my-container

# Disconnect dari network
podman network disconnect my-network my-container
```

### DNS dalam Pod

```bash
# Container dalam pod bisa resolve nama container
podman run -d --pod my-pod --name backend my-api:latest
podman run -d --pod my-pod --name frontend my-frontend:latest

# Frontend bisa akses backend via:
# http://backend:8000
```

## Port Mapping

### Basic Port Mapping

```bash
# Map port host ke container
podman run -d -p 8080:80 nginx:latest

# Map ke semua ports
podman run -d -p 8080:80 -p 8443:443 nginx:latest

# Map ke specific IP
podman run -d -p 127.0.0.1:8080:80 nginx:latest
```

### Port Ranges

```bash
# Map port range
podman run -d -p 8000-8010:8000-8010 my-app:latest

# Dynamic port mapping
podman run -d -p 80 my-app:latest
# Podman akan assign random port
```

## Storage Sharing

### Volumes dalam Pod

```bash
# Buat shared volume
podman volume create shared-data

# Mount ke multiple containers dalam pod
podman run -d --pod my-pod -v shared-data:/data container1:latest
podman run -d --pod my-pod -v shared-data:/data container2:latest

# Kedua container bisa akses data yang sama
```

### Bind Mounts

```bash
# Share directory dari host
podman run -d --pod web-pod \
  -v ./config:/etc/config:ro \
  -v ./logs:/var/log \
  my-app:latest
```

## Use Cases

### 1. Web Application Stack

```bash
# Buat pod untuk web app
podman pod create --name webapp -p 8080:80 -p 5432:5432

# Database
podman run -d --pod webapp \
  --name db \
  -e POSTGRES_PASSWORD=secret \
  postgres:15

# Application
podman run -d --pod webapp \
  --name app \
  -e DATABASE_URL=postgresql://postgres:secret@localhost:5432/mydb \
  my-python-app:latest

# Nginx reverse proxy
podman run -d --pod webapp \
  --name proxy \
  -v ./nginx.conf:/etc/nginx/nginx.conf:ro \
  nginx:latest
```

### 2. Development Environment

```bash
# Pod untuk development
podman pod create --name dev-env -p 3000:3000 -p 5432:5432 -p 6379:6379

# PostgreSQL
podman run -d --pod dev-env --name db postgres:15

# Redis
podman run -d --pod dev-env --name redis redis:7

# Node.js app
podman run -d --pod dev-env \
  --name app \
  -v ./src:/app/src \
  node:18 npm run dev
```

### 3. Monitoring Stack

```bash
# Monitoring pod
podman pod create --name monitoring -p 3000:3000 -p 9090:9090

# Prometheus
podman run -d --pod monitoring \
  --name prometheus \
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml:ro \
  prom/prometheus

# Grafana
podman run -d --pod monitoring \
  --name grafana \
  -v grafana-data:/var/lib/grafana \
  grafana/grafana

# Node Exporter
podman run -d --pod monitoring \
  --name node-exporter \
  prom/node-exporter
```

## Generate Kubernetes YAML

Podman bisa generate Kubernetes manifests:

```bash
# Generate Kubernetes YAML dari pod
podman generate kube web-pod > web-pod.yaml

# Lihat isi YAML
cat web-pod.yaml

# Play Kubernetes YAML dengan Podman
podman play kube web-pod.yaml

# Stop pod dari kube
podman pod stop $(podman pod ps --format="{{.Name}}")
```

Contoh Kubernetes YAML yang di-generate:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
      hostPort: 8080
  - name: app
    image: my-app:latest
    ports:
    - containerPort: 8000
```

## Networking Troubleshooting

### Debug Network

```bash
# Test connectivity antar container
podman exec container1 ping container2

# Test port
podman exec container1 curl http://container2:8000

# Inspect network
podman network inspect my-network
```

### Common Issues

```bash
# Port sudah digunakan
# Cek port yang dipakai
ss -tulpn | grep 8080

# DNS tidak resolve
# Pastikan container dalam pod/network yang sama
podman network connect my-network container1

# Firewall blocking
sudo firewall-cmd --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
```

## Advanced Pod Configuration

### Resource Limits untuk Pod

```bash
# Set resources untuk container dalam pod
podman run -d --pod my-pod \
  --name app \
  --memory="512m" \
  --cpus="1.0" \
  my-app:latest
```

### Health Checks dalam Pod

```bash
podman run -d --pod web-pod \
  --name app \
  --health-cmd="curl -f http://localhost:8000/health || exit 1" \
  --health-interval=30s \
  --health-retries=3 \
  my-app:latest
```

### Restart Policies

```bash
# Auto-restart
podman run -d --pod my-pod \
  --name app \
  --restart=always \
  my-app:latest

# Restart kecuali di-stop manual
podman run -d --pod my-pod \
  --name app \
  --restart=unless-stopped \
  my-app:latest
```

## Podman Compose

Podman mendukung docker-compose files:

```bash
# Install podman-compose
pip3 install podman-compose

# atau
sudo apt install podman-compose
```

Contoh `docker-compose.yml`:

```yaml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Run dengan Podman:

```bash
podman-compose up -d
podman-compose ps
podman-compose down
```

## Best Practices

### 1. Gunakan Pods untuk Related Containers

```bash
# ✅ Good - Related containers dalam pod
podman pod create --name webapp
podman run -d --pod webapp --name app my-app:latest
podman run -d --pod webapp --name db postgres:latest

# ❌ Avoid - Containers terpisah tanpa pod
podman run -d --name app my-app:latest
podman run -d --name db postgres:latest
```

### 2. Named Volumes untuk Persistent Data

```bash
# ✅ Good
podman volume create db-data
podman run -d -v db-data:/var/lib/postgresql/data postgres:latest

# ❌ Avoid - Bind mount untuk database
podman run -d -v ./data:/var/lib/postgresql/data postgres:latest
```

### 3. Resource Limits

```bash
# ✅ Good - Set limits
podman run -d --memory="1g" --cpus="2" my-app:latest

# ❌ Avoid - No limits
podman run -d my-app:latest
```

### 4. Health Checks

```bash
# ✅ Good - Add health checks
podman run -d \
  --health-cmd="curl -f http://localhost/ || exit 1" \
  --health-interval=30s \
  nginx:latest
```

## Command Reference

| Command | Deskripsi |
|---------|-----------|
| `podman pod create` | Buat pod baru |
| `podman pod ps` | List semua pods |
| `podman pod start` | Start pod |
| `podman pod stop` | Stop pod |
| `podman pod rm` | Remove pod |
| `podman network create` | Buat network |
| `podman network ls` | List networks |
| `podman generate kube` | Generate K8s YAML |
| `podman play kube` | Run dari K8s YAML |

## Kesimpulan

Pods dan Networking adalah fitur powerful yang memungkinkan:
- ✅ Grouping related containers
- ✅ Easy inter-container communication
- ✅ Shared resources (network, storage)
- ✅ Kubernetes compatibility
- ✅ Better organization dan management

Dengan memahami pods dan networking, kamu siap untuk production deployments!
