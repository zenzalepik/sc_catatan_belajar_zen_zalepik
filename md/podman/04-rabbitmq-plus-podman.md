

# 🐰 Setting Podman RabbitMQ Federation (Gate In & Gate Out)

Panduan lengkap setup RabbitMQ Federation menggunakan Podman dengan macvlan network.

---

### 🔧 Langkah-langkah

#### 1. Bersihkan container & network lama
```bash
podman rm -f rabbitmq1 rabbitmq2
podman network rm -f net-rabbit1 net-rabbit2 net-rabbit-lan 2>/dev/null
```

#### 2. Buat network macvlan
Gunakan interface `wlp3s0`:
```bash
podman network create \
  --driver macvlan \
  --subnet 192.168.43.0/24 \
  --gateway 192.168.43.1 \
  --ip-range 192.168.43.96/28 \
  -o parent=wlp3s0 \
  net-rabbit-lan
```
> Rentang IP `192.168.43.96/28` akan memberi container alamat antara `192.168.43.97`–`192.168.43.110`.

#### 3. Jalankan RabbitMQ
Gunakan image `rabbitmq:3-management` agar web panel aktif otomatis. **Tidak perlu port mapping** karena IP container unik.
```bash
podman run -d --name rabbitmq1 --replace --network net-rabbit-lan rabbitmq:3-management
podman run -d --name rabbitmq2 --replace --network net-rabbit-lan rabbitmq:3-management
```

#### 4. Cek IP container
```bash
podman inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rabbitmq1
podman inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rabbitmq2
```
Contoh hasil:
- rabbitmq1 → `192.168.43.97`
- rabbitmq2 → `192.168.43.98`

#### 5. Akses RabbitMQ
Karena IP berbeda, port bisa sama:
- Web panel RabbitMQ1 → `http://192.168.43.97:15672`
- Web panel RabbitMQ2 → `http://192.168.43.98:15672`
- AMQP tetap di `192.168.43.97:5672` dan `192.168.43.98:5672`

**Login default:** `guest` / `guest`

---

#### 6. Enable Federation Plugin
```bash
# Enable plugin di kedua container
podman exec rabbitmq1 rabbitmq-plugins enable rabbitmq_federation rabbitmq_federation_management
podman exec rabbitmq2 rabbitmq-plugins enable rabbitmq_federation rabbitmq_federation_management

# Verifikasi plugin sudah aktif
podman exec rabbitmq1 rabbitmq-plugins list | grep federation
podman exec rabbitmq2 rabbitmq-plugins list | grep federation
```
> Harus muncul: `[E*] rabbitmq_federation` dan `[E*] rabbitmq_federation_management`

#### 7. Restart RabbitMQ
```bash
podman restart rabbitmq1 rabbitmq2
sleep 10  # Tunggu sampai siap

# Verifikasi sudah running
podman ps | grep rabbitmq
```

#### 8. Setup Federation Upstream (Bi-directional)
```bash
# RabbitMQ1 → RabbitMQ2
podman exec rabbitmq1 rabbitmqctl set_parameter federation-upstream rmq2 \
  '{"uri":"amqp://guest:guest@192.168.43.98:5672","ack-mode":"on-confirm"}'

# RabbitMQ2 → RabbitMQ1
podman exec rabbitmq2 rabbitmqctl set_parameter federation-upstream rmq1 \
  '{"uri":"amqp://guest:guest@192.168.43.97:5672","ack-mode":"on-confirm"}'
```

#### 9. Setup Federation Policy
```bash
# Policy di RabbitMQ1
podman exec rabbitmq1 rabbitmqctl set_policy federate "parking_sync_queue" \
  '{"federation-upstream-set":"all"}' --apply-to queues

# Policy di RabbitMQ2
podman exec rabbitmq2 rabbitmqctl set_policy federate "parking_sync_queue" \
  '{"federation-upstream-set":"all"}' --apply-to queues
```

#### 10. Verifikasi Federation
```bash
# Cek upstream terdaftar
podman exec rabbitmq1 rabbitmqctl list_parameters
podman exec rabbitmq2 rabbitmqctl list_parameters

# Cek policy
podman exec rabbitmq1 rabbitmqctl list_policies
podman exec rabbitmq2 rabbitmqctl list_policies

# Cek status federation
podman exec rabbitmq1 rabbitmq-diagnostics check_if_node_is_quorum_critical
podman exec rabbitmq2 rabbitmq-diagnostics check_if_node_is_quorum_critical
```

---

### 🔧 Konfigurasi Aplikasi (Gate In & Gate Out)

#### 11. Update `.env` Gate In
File: `/run/media/zain/9AACA20EACA1E4CB/Users/Zain/Documents/EvoParking/gate_in/.env`

```ini
# PC Identity
PC_NAME=gate_in
PC_IP=192.168.43.52

# RabbitMQ Federation Peers (IP Podman)
RABBITMQ_PEERS=192.168.43.97:5672,192.168.43.98:5672

# Credentials (SAMA dengan Podman default)
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
RABBITMQ_VHOST=/

# Auto-discovery (FALSE karena pakai manual peers)
AUTO_DISCOVERY_ENABLED=False
```

#### 12. Update `.env` Gate Out
File: `/run/media/zain/9AACA20EACA1E4CB/Users/Zain/Documents/EvoParking/gate_in/parking_exit_system_/.env`

```ini
# PC Identity
PC_NAME=gate_out
PC_IP=192.168.43.50

# RabbitMQ Federation Peers (IP Podman - SAMA dengan Gate In)
RABBITMQ_PEERS=192.168.43.97:5672,192.168.43.98:5672

# Credentials (SAMA dengan Gate In)
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
RABBITMQ_VHOST=/

# Auto-discovery (FALSE karena pakai manual peers)
AUTO_DISCOVERY_ENABLED=False
```

---

### 🚀 Jalankan Aplikasi

#### 13. Start Gate In
```bash
cd /run/media/zain/9AACA20EACA1E4CB/Users/Zain/Documents/EvoParking/gate_in
python3 main.py
```

#### 14. Start Gate Out (Terminal Baru)
```bash
cd /run/media/zain/9AACA20EACA1E4CB/Users/Zain/Documents/EvoParking/gate_in/parking_exit_system_
python3 main.py
```

---

### ✅ Verifikasi Akhir

#### Cek RabbitMQ Management UI
- Buka: `http://192.168.43.97:15672`
- Login: `guest` / `guest`
- Menu: **Admin → Federation** → Harus terlihat upstream `rmq2`
- Menu: **Queues** → `parking_sync_queue` → Harus ada "Federation status"

#### Cek Log Aplikasi
```
✅ Loaded 2 peers from RABBITMQ_PEERS env var
✅ Connected to peer: rabbitmq_192_168_43_97 at 192.168.43.97:5672
✅ Connected to peer: rabbitmq_192_168_43_98 at 192.168.43.98:5672
🐰 Total peers configured: 2 nodes
```

---

### 🛑 Stop Podman
```bash
podman stop rabbitmq1 rabbitmq2
```

### 🔄 Restart Podman
```bash
podman start rabbitmq1 rabbitmq2
```

---

### 📌 Catatan Penting

- **macvlan**: Container muncul langsung di jaringan WiFi. Perangkat lain bisa akses via IP.
- **Host access**: Laptop/host biasanya **tidak bisa ping** ke IP macvlan. Buat sub-interface jika perlu.
- **Federation**: Harus setup manual. **Tidak ada auto-discovery** untuk RabbitMQ Federation.
- **Credentials**: `guest/guest` hanya work dari jaringan yang sama (macvlan = OK).
- **Vhost**: Gunakan `/` (default) untuk semua PC.

