# Pengenalan Podman

## Apa itu Podman?

Podman (Pod Manager) adalah **container engine** open-source yang dikembangkan oleh Red Hat. Podman adalah alternatif dari Docker yang daemonless dan rootless, memberikan keamanan dan fleksibilitas lebih baik.

## Fitur Utama

- 🔒 **Rootless containers** - Tidak memerlukan hak akses root
- 🚫 **Daemonless** - Tidak ada daemon yang berjalan di background
- 🐳 **Docker-compatible** - CLI yang mirip dengan Docker
- 📦 **Pod support** - Dapat mengelola pods seperti Kubernetes
- 🔐 **Security-first** - Security profiles dan user namespaces

## Instalasi

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install podman
```

### Fedora/RHEL

```bash
sudo dnf install podman
```

### macOS

```bash
brew install podman
podman machine init
podman machine start
```

### Windows

```bash
# Menggunakan WSL2
wsl --install
# Kemudian install Podman di WSL2
```

## Verifikasi Instalasi

```bash
podman --version
podman info
```

## Podman vs Docker

| Fitur | Podman | Docker |
|-------|--------|--------|
| Daemon | ❌ Daemonless | ✅ Daemon required |
| Root | ✅ Rootless | ⚠️ Requires root |
| Pods | ✅ Native support | ❌ Requires Docker Compose |
| Systemd | ✅ Native integration | ⚠️ Limited |
| Socket | ❌ No socket | ✅ Docker socket |

## Perintah Dasar

```bash
# Pull image
podman pull nginx:latest

# List images
podman images

# Run container
podman run -d --name my-nginx -p 8080:80 nginx:latest

# List running containers
podman ps

# List all containers
podman ps -a

# Stop container
podman stop my-nginx

# Remove container
podman rm my-nginx

# Remove image
podman rmi nginx:latest
```

## Alias Docker ke Podman

Jika sudah terbiasa dengan Docker, bisa membuat alias:

```bash
# Tambahkan ke ~/.bashrc atau ~/.zshrc
alias docker=podman
alias docker-compose="podman compose"
```

## Memulai

1. Install Podman sesuai OS kamu
2. Verifikasi instalasi dengan `podman --version`
3. Pull image pertama: `podman pull hello-world`
4. Run container: `podman run hello-world`
5. Mulai eksplorasi containerization!
