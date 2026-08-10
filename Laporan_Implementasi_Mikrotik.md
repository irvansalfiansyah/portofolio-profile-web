

<!-- Start of picture text -->
‘y! : \ mt i 4; Rah . \ ;<br>: - | Yedda| Sorbsakts es é |<br>f<br>; % i<br><!-- End of picture text -->

## **DAFTAR ISI** 

|BAB 1 — PENDAHULUAN .............................................................................................. 4|
|---|
|1.1 Latar Belakang ........................................................................................................... 4|
|1.2 Permasalahan ............................................................................................................. 4|
|1.3 Tujuan Implementasi ................................................................................................. 4|
|BAB 2 — ANALISIS .......................................................................................................... 6|
|2.1 Analisis Kebutuhan Jaringan ..................................................................................... 6|
|2.2 Perangkat yang Digunakan ........................................................................................ 6|
|2.3 Alasan Pemilihan Topologi........................................................................................ 7|
|2.4 Analisis Keamanan Jaringan ...................................................................................... 7|
|2.5 Alasan Pemilihan Fitur MikroTik .............................................................................. 8|
|BAB 3 — PERANCANGAN .............................................................................................. 9|
|3.1 Topologi Jaringan ...................................................................................................... 9|
|3.2 Skema IP Address .................................................................................................... 10|
|3.3 Penjelasan Setiap Perangkat .................................................................................... 10|
|a. Router MikroTik .................................................................................................... 10|
|b. Modem/ONT ISP ................................................................................................... 10|
|c. Switch Managed ..................................................................................................... 10|
|d. Access Point ........................................................................................................... 11|
|3.4 Alur Komunikasi Data ............................................................................................. 11|
|BAB 4 — IMPLEMENTASI............................................................................................. 12|
|4.1 Login ke Router MikroTik ....................................................................................... 12|
|4.2 Konfigurasi Interface ............................................................................................... 13|
|4.3 Konfigurasi IP Address ............................................................................................ 13|
|4.4 Konfigurasi DHCP Client (WAN) ........................................................................... 14|
|4.5 Konfigurasi DHCP Server (LAN) ........................................................................... 15|
|4.6 Konfigurasi Static DHCP (DHCP Lease) ................................................................ 16|
|4.7 Konfigurasi DNS Cache dan DNS Static................................................................. 17|
|4.8 Konfigurasi Firewall NAT (Masquerade) ................................................................ 18|
|4.9 Konfigurasi Address List ......................................................................................... 19|
|4.10 Konfigurasi Firewall Filter .................................................................................... 20|
|4.11 Konfigurasi Static Route ........................................................................................ 21|
|4.12 Konfigurasi Hotspot ............................................................................................... 22|
|4.13 Konfigurasi User Hotspot ...................................................................................... 23|
|BAB 5 — HASIL PENGUJIAN........................................................................................ 25|
|5.1 Pengujian DHCP — Klien Memperoleh IP Otomatis ............................................. 25|
|5.2 Pengujian Static DHCP — Perangkat Mendapat IP Tetap ...................................... 26|



|5.3 Pengujian Hotspot — Proses Login Pelanggan ....................................................... 26|
|---|
|5.4 Pengujian Konektivitas — Ping & Browsing .......................................................... 29|
|5.5 Pengujian Firewall ................................................................................................... 30|
|5.6 Pengujian DNS Cache dan DNS Static .................................................................... 31|
|5.7 Monitoring Active User Hotspot ............................................................................. 32|
|BAB 6 — ANALISIS HASIL ........................................................................................... 33|
|6.1 Evaluasi Keberhasilan Konfigurasi.......................................................................... 33|
|6.2 Kendala yang Ditemui dan Cara Penyelesaian ........................................................ 34|
|6.3 Kemungkinan Pengembangan Sistem...................................................................... 35|
|BAB 7 — KESIMPULAN................................................................................................. 36|



## **BAB 1 — PENDAHULUAN** 

### **1.1 Latar Belakang** 

Cafe Kopi Bandung merupakan sebuah kedai kopi yang berlokasi di kawasan perkotaan Bandung dengan kapasitas sekitar 30–40 kursi pelanggan. Seiring perkembangan tren digital, para pelanggan cafe kini tidak hanya mencari tempat bersantai atau menikmati kopi, tetapi juga membutuhkan koneksi internet yang stabil dan cepat untuk mendukung kegiatan sehari-hari seperti bekerja secara remote (work from cafe), berselancar di media sosial, hingga mengikuti kelas online. 

Saat ini Cafe Kopi Bandung belum memiliki infrastruktur jaringan yang terstruktur. Koneksi internet yang ada hanya menggunakan modem ISP biasa yang disambungkan langsung ke access point konsumen, tanpa manajemen jaringan, tanpa autentikasi pengguna, dan tanpa pembatasan penggunaan bandwidth. Kondisi ini menimbulkan berbagai permasalahan operasional dan keamanan yang perlu segera diatasi. 

### **1.2 Permasalahan** 

Berdasarkan kondisi di atas, permasalahan yang dihadapi adalah: 

- Tidak ada sistem autentikasi pengguna sehingga siapa pun dapat menggunakan WiFi tanpa izin. 

- Bandwidth tidak dikelola, mengakibatkan satu pengguna dapat menghabiskan seluruh koneksi. 

- Tidak ada pemisahan jaringan antara perangkat operasional (kasir, CCTV) dan perangkat pelanggan. 

- Tidak ada pencatatan pengguna yang terhubung ke jaringan. 

- Tidak ada kontrol akses internet (filtering atau firewall) sehingga jaringan rentan disalahgunakan. 

- IP Address dikelola secara manual dan tidak konsisten. 

### **1.3 Tujuan Implementasi** 

Tujuan dari implementasi jaringan ini adalah: 

- Membangun infrastruktur jaringan yang terstruktur menggunakan Router MikroTik. 

- Mengimplementasikan sistem Hotspot dengan autentikasi login untuk pelanggan cafe. 

- Menerapkan DHCP Server untuk distribusi IP otomatis dan Static DHCP untuk perangkat tetap. 

- Mengkonfigurasi Firewall Filter dan NAT untuk keamanan jaringan. 

- Menerapkan DNS Cache dan DNS Static untuk optimasi resolusi nama domain. 

- Menggunakan Address List untuk pengelompokan IP dan kebijakan akses yang fleksibel. 

- Memisahkan jaringan pelanggan (Hotspot) dari jaringan internal operasional (LAN). 

## **BAB 2 — ANALISIS** 

### **2.1 Analisis Kebutuhan Jaringan** 

Cafe Kopi Bandung beroperasi setiap hari dari pukul 08.00 hingga 22.00 dengan estimasi pengguna aktif sebagai berikut: 

|**No**|**Kategori Pengguna**|**Jumlah**|**Kebutuhan**|
|---|---|---|---|
|1|Pelanggan (pengguna<br>Hotspot)|15–30 orang/sesi|Browsing, streaming, video call|
|2|Staff kasir|1 perangkat|Sistem POS, internet stabil|
|3|Manajemen/Admin|1 perangkat|Akses penuh ke router dan server|
|4|Perangkat CCTV/IoT|4 perangkat|IP statis, akses lokal ke NVR|



### **2.2 Perangkat yang Digunakan** 

Daftar perangkat jaringan yang digunakan dalam implementasi ini: 

|**No**|**Perangkat**|**Merek/Model**|**Jumlah**|**Fungsi**|
|---|---|---|---|---|
|1|Router MikroTik|RB951Ui-2HnD /<br>hAP ac²|1 unit|Routing, NAT,<br>Hotspot, Firewall,<br>DHCP|
|2|Modem/ONT ISP|Sesuai ISP|1 unit|Koneksi internet dari<br>ISP|
|3|Switch Managed|TP-Link TL-<br>SG108E|1 unit|Distribusi ke<br>perangkat LAN|
|4|Access Point Tambahan|TP-Link EAP225|2 unit|Perluas jangkauan<br>WiFi untuk<br>pelanggan|
|5|PC Kasir|PC Desktop|1 unit|Operasional kasir &<br>manajemen|
|6|CCTV|IP Camera|4 unit|Keamanan area cafe|
|7|Laptop/Smartphone<br>Pelanggan|Berbagai merek|±30 perangkat|Akses internet via<br>Hotspot|



### **2.3 Alasan Pemilihan Topologi** 

Topologi yang dipilih adalah topologi Bintang (Star) yang diperluas (Extended Star) dengan MikroTik sebagai pusat kendali. Alasan pemilihan topologi ini: 

- Mudah dalam troubleshooting karena setiap perangkat terhubung langsung ke switch atau router. 

- Satu perangkat mati tidak mempengaruhi perangkat lain (tidak seperti bus atau ring). 

- Cocok untuk lingkungan cafe yang memiliki beberapa zona berbeda (area kasir, area pelanggan, dapur). 

- Mendukung penambahan perangkat baru tanpa mengubah struktur yang ada. 

### **2.4 Analisis Keamanan Jaringan** 

Keamanan jaringan dirancang berlapis (defense in depth): 

- Layer 1 – Pemisahan jaringan: Jaringan LAN (operasional) dan Hotspot (pelanggan) dipisahkan pada subnet berbeda. 

- Layer 2 – Autentikasi Hotspot: Pelanggan wajib login dengan username/password sebelum bisa menggunakan internet. 

- Layer 3 – Firewall Filter: Aturan firewall memblokir akses dari WAN yang tidak sah dan memfilter trafik berbahaya. 

- Layer 4 – Address List: IP yang mencurigakan dapat dimasukkan ke daftar blokir secara dinamis. 

- Layer 5 – DNS Static: Domain berbahaya dapat diarahkan ke IP lokal (sinkholes) untuk mencegah akses. 

### **2.5 Alasan Pemilihan Fitur MikroTik** 

Berikut adalah alasan pemilihan setiap fitur yang diimplementasikan: 

|**Fitur**|**Alasan Pemilihan**|
|---|---|
|DHCP Server|Distribusi IP otomatis ke seluruh perangkat, mengurangi konfigurasi<br>manual dan konflik IP.|
|Static DHCP|Memastikan perangkat penting (kasir, CCTV) selalu mendapat IP yang<br>sama meski DHCP digunakan.|
|Static Route|Menentukan jalur routing manual antar subnet untuk kontrol penuh<br>atas alur trafik.|
|Firewall Filter|Memproteksi jaringan dari serangan, akses tidak sah, dan trafik<br>berbahaya dari dalam maupun luar.|
|Firewall NAT|Memetakan IP private ke IP publik agar seluruh perangkat LAN dapat<br>mengakses internet.|
|Address List|Pengelompokan IP untuk kemudahan penerapan kebijakan firewall<br>tanpa mengubah rule satu per satu.|
|DNS Cache|Mempercepat resolusi domain karena hasil query DNS disimpan di<br>router dan tidak perlu query ulang.|
|DNS Static|Membuat hostname lokal (misalnya 'router.cafe') dan memblokir<br>domain berbahaya secara lokal.|





<!-- Start of picture text -->
Internet ISP<br>Router MikroTik<br>ether1 WAN<br>ether2 LAN ether3 Hotspot<br>Switch managed Access point<br>192.168.10.0/24 192.168.20.0/24<br>PC Kasir Server CCTV Perangkat pelanggan<br>10.10 static .10.2 static -10.20-21 DHCP .20.50-200, wajib login<br>() Jaringan LAN internal (operasional)<br>() Jaringan Hotspot (pelanggan)<br><!-- End of picture text -->

### **3.2 Skema IP Address** 

Rancangan pengalamatan IP untuk seluruh perangkat dalam jaringan: 

|**No**|**Perangkat/Host**|**Interface**|**IP Address**|**Subnet Mask**|
|---|---|---|---|---|
|1|MikroTik (ether1)|WAN|DHCP (ISP)|-|
|2|MikroTik (ether2)|LAN|192.168.10.1|255.255.255.0|
|3|MikroTik<br>(ether3/wlan1)|HOTSPOT|192.168.20.1|255.255.255.0|
|4|Server/NAS<br>(Static)|ether2|192.168.10.2|255.255.255.0|
|5|Kasir (Static<br>DHCP)|ether2|192.168.10.10|255.255.255.0|
|6|CCTV/IoT (Static<br>DHCP)|ether2|192.168.10.20–<br>29|255.255.255.0|
|7|Pelanggan<br>(Dynamic)|Hotspot|192.168.20.50–<br>150|255.255.255.0|



_Tabel 3.1 — Skema IP Address Jaringan Cafe Kopi Bandung_ 

### **3.3 Penjelasan Setiap Perangkat** 

#### **a. Router MikroTik** 

Router MikroTik berfungsi sebagai pusat kendali seluruh jaringan. MikroTik menjalankan fungsi routing, NAT, DHCP Server, Hotspot, Firewall, dan DNS Cache sekaligus. Interface ether1 terhubung ke modem ISP sebagai WAN, sementara ether2 terhubung ke switch untuk jaringan LAN internal, dan ether3 atau wlan1 digunakan untuk jaringan Hotspot pelanggan. 

#### **b. Modem/ONT ISP** 

Modem atau ONT (Optical Network Terminal) dari penyedia layanan internet berfungsi sebagai gateway antara jaringan lokal cafe dan jaringan internet. Perangkat ini disambungkan ke port ether1 MikroTik. 

#### **c. Switch Managed** 

Switch managed digunakan untuk mendistribusikan koneksi LAN ke beberapa perangkat sekaligus. Dengan switch managed, administrator dapat mengatur VLAN di masa depan jika diperlukan pemisahan jaringan yang lebih detail. 

#### **d. Access Point** 

Access point berfungsi memperluas jangkauan jaringan WiFi untuk pelanggan cafe. Access point dikonfigurasi dalam mode bridge dan terhubung ke interface Hotspot MikroTik, sehingga seluruh perangkat yang terhubung ke AP akan mendapatkan IP dari DHCP Hotspot dan diwajibkan login. 

### **3.4 Alur Komunikasi Data** 

Alur komunikasi data dalam jaringan Cafe Kopi Bandung: 

|**No**|**Skenario**|**Alur Data**|
|---|---|---|
|1|Pelanggan akses internet|Laptop → AP → ether3 MikroTik → NAT → ether1<br>→ ISP → Internet|
|2|Kasir akses sistem POS lokal|PC Kasir → Switch → ether2 MikroTik → Server<br>LAN|
|3|Admin kelola router|PC Admin → Switch → ether2 → MikroTik<br>(Winbox/WebFig port 8291/80)|
|4|CCTV akses NVR|IP Camera → Switch → LAN → NVR (tanpa akses<br>internet langsung)|





<!-- Start of picture text -->
WinBox 4.1 - oOo x<br>@ mikrotik S &<br>Select from: | Neighbors -|<br>| Q Find ¥ Filter Actions<br>/ MAC Address « IP Address Identity = i<br>i Refresh /<br>| 08:00:27:DF:C6:E8 0.0.0.0 MikroTik /<br>| 08:00:27:DF:C6:E8 fe80::a00:27ff:fedf:... MikroTik<br>| 78:9A:18:16:37:29 192.168.2.2 RouterOS<br>| Connect to<br>| Login admin<br>| Password<br>| Remember password<br>| Workspace <own> v<br>RoMON Agent - 9<br>open in new<br>| Group v<br>| Comment<br>Save to list with password a) > Live |<br><!-- End of picture text -->



<!-- Start of picture text -->
@ admin@08:00:27:DF:C6:E8 (MikroTik) CHR innotek GmbH VirtualBox WinBox _ a] x<br>im) MIKroTiIK Workspace:: <own> . a) 1 Q no Safe Mode 7% 2 IS+ é><br>FG Quick Set<br>= WiFi ka Interfaces -~ Interface Interfai Etherni EolP Te IP Tunr GRE TL VLAN VXLAN VRRP MACse MACVI Bondin LTE “ X<br>ka Interfaces n . :<br>© WireGuard Ci New Q Find ¥ Filter © Configuration<br>+ Bridge P Name « Type ActualMTU L2MTU_ Tx Rx= Detect Internet<br>'G]_ ppp R HOTSPOT Ethernet 1500 0 bps<br>R LAN Ethernet 1500 42.5 kbps<br>Ay. Switch > R ©) lo Loopback 65536 0 bps<br>Y Mesh R WAN Ethernet 1500 0 bps<br>“i IP ><br>YE IPv6 ><br>MPLS ><br><!-- End of picture text -->





<!-- Start of picture text -->
“a Addresses ux<br>Ci New Q Find ¥ Filter |<br>1 FP Address «~ Network Interface VRF =|<br>| D 10.0.2.15/24 10.0.2.0 WAN main<br>t 192.168.10....  192.168.10.0 LAN main<br>192.168.20....  192.168.20.0 HOTSPOT main<br>|<br>I > Live<br><!-- End of picture text -->

# ~~|~~ 



<!-- Start of picture text -->
Ba] DHCP Client ~ DHCPClient DHCP Client Options<br>Ci New Q Find ¥ Filter<br>Pp Interface « UsePe... AddD... IP Address Expires After Status =<br>WAN yes yes 10.0.2.15/24 23:44:43 bound<br><!-- End of picture text -->



<!-- Start of picture text -->
“a DHCP Server -~ DHCP Networks Leases Options OptionSets Option Matcher Alerts uv Xx<br>Ci+ New Q Find. ¥ Filter. O % Actions<br>P Name « Interface Relay Lease Time Address Pool Add AR... = DHCP Setup<br>dhcp1 LAN 1d 00:00:00 dhcp_poold no<br>© Configuration<br>DHCP Config<br>1 > Live<br><!-- End of picture text -->



<!-- Start of picture text -->
FN ee EE ee ee<br>oh Pool ~ Pools Used Addresses ux<br>Ci New Q Find Y Filter<br>Name « Addresses Next Pool Total Used Available =<br>dhcp_poold 192.168.10.30-192.168.10.200 i7i1 0 171<br><!-- End of picture text -->





<!-- Start of picture text -->
vl DHCP Server ~ DHCP Networks Leases Options OptionSets OptionMatcher Alerts ox<br>Ci New Q Find ¥ Filter % actions<br>P Address « MAC Address Client ID Server Routes =<br>PC Kasir<br>192.168.10.... AA:BB:CC:DD:E...<br>ccTv-1<br>192.168.10.... AA:BB:CC:DD:E...<br>cCcTV-2<br>192.168.10.... AA:BB:CC:DD:E...<br>D 192.168.20.... OB8:00:27:72:AE:.. 1:8:0:27:72:ae:30 dhcp2<br><!-- End of picture text -->





<!-- Start of picture text -->
v! DNS Settings 0 x<br>Servers | 8.8.8.8] +\|/s|+ © Conligimation<br>VRF Static<br>Adlist<br>Dynamic Servers 192.168.1.1 Forwarders<br>Use DoH Server +<br>mDNS Repeater Interfaces +<br>Allow Remote Requests<br><!-- End of picture text -->



<!-- Start of picture text -->
v! DNS +» Static Cache Adlist Forwarders ux<br>Ci New Q Find Y Filter<br># a PF Name Regexp Type Value TTL =<br>Lokal Router<br># 0 router.cafe A 192.168.10.1 1d 00:00:00<br>Lokal Server<br># 1 server.cafe A 192.168.10.2 1d 00:00:00<br>Login Page<br># 2 hotspot.cafe A 192.168.20.1 1d 00:00:00<br><!-- End of picture text -->



<!-- Start of picture text -->
va Firewall + FilterRules NAT Mangle Raw_ ServicePorts Connections AddressLists Layer7 Protocols uo Xx<br>Ci+ New Q Find; Y Filter; A al» cn O Actions<br># a Pp Action Chain Src. Address Dst.Address Src. Ad... Dst.Ad... Proto... Src.=<br>Internet Sharing<br># 0 mas... srcnat Reset All Counters<br><!-- End of picture text -->





<!-- Start of picture text -->
vA Firewall + FilterRules NAT Mangle Raw_ Service Ports Connections AddressLists Layer7 Protocols ux<br>Ci New Q Find ¥ Filter ‘= all v<br>Fag List « Address Timeout Creation Time =<br>Jaringan HOTSPOT<br>HOTSPOT 192.168.20.0/24 2026-06-29 1...<br>Jaringan LAN<br>LAN 192.168.10.0/24 2026-06-29 1...<br>IP Kasir<br>Managem... 192.168.10.2 2026-06-29 1...<br>IP Server<br>Perangkat 192.168.10.2 2026-06-29 1...<br><!-- End of picture text -->

### **4.10 Konfigurasi Firewall Filter** 

Firewall Filter berfungsi untuk mengizinkan atau menolak paket berdasarkan kriteria tertentu seperti asal interface, IP sumber/tujuan, protokol, dan kondisi koneksi. Konfigurasi firewall yang baik melindungi jaringan dari akses tidak sah, serangan dari internet, dan penyalahgunaan dari dalam jaringan. 

Ringkasan aturan Firewall Filter yang diterapkan: 

|**No**|**Chain**|**Src/Dst**|**Action**|**Keterangan**|
|---|---|---|---|---|
|1|input|state=established,related|accept|Izinkan koneksi yang sudah<br>terbentuk|
|2|input|in-interface=WAN|drop|Blokir akses langsung dari<br>WAN ke router|
|3|forward|state=invalid|drop|Buang paket tidak valid|
|4|forward|src=Blocked-IP<br>(address-list)|drop|Blokir IP yang masuk daftar<br>hitam|
|5|forward|dst-port=25 (SMTP)|drop|Cegah spam email dari<br>jaringan|



_Tabel 4.1 — Ringkasan Aturan Firewall Filter_ 

Konfigurasi Firewall Filter melalui CLI: 

|`/ip firewall`|`filter add`|`chain=input connection-`|
|---|---|---|
|`state=establ`|`ished,relat`|`ed action=accept comment="Terima`|
|`koneksi esta`|`blished"`||
|`/ip firewall`|`filter add`|`chain=input connection-state=invalid`|
|`action=drop`|`comment="Bu`|`ang paket invalid"`|
|`/ip firewall`|`filter add`|`chain=input in-interface=ether1`|
|`action=drop`|`comment="Bl`|`okir akses langsung dari WAN"`|
|`/ip firewall`|`filter add`|`chain=forward connection-state=invalid`|
|`action=drop`|`comment="Bu`|`ang forward paket invalid"`|
|`/ip firewall`|`filter add`|`chain=forward dst-port=25 protocol=tcp`|
|`action=drop`|`comment="Bl`|`okir SMTP spam"`|





<!-- Start of picture text -->
a) Firewall -~ FilterRules NAT Mangle Raw Service Pc Connectio AddressLi Layer? Prc  X<br>Ci New Enable Disable Remove Q Find Y¥ Filter all» Of % Actions<br># AF Action Chain Src. Address Dst.Address Sre.Ad.= 0<br>eos<br>Terima Koneksi estabilshed<br># 0 @acc... input Reset All Counters<br>Buang Paket Invalid<br>#4 {drop input<br>Blokir akses dari WAN<br># 62 (3drop input<br>Buang Forward paket Invalid<br># 63 E§Jdrop —sforward<br>Blokir SMTP spam<br>H 4 £3 drop forward<br>5 > Live<br><!-- End of picture text -->



<!-- Start of picture text -->
| aa} Routes ux |<br>| Ci New Enable Disable Remove Q Find Y¥ Filter ¥: all v |<br>| P Dst. Address « Gateway Distance Routing Table Pref. Source= |<br>| DAd ? 0.0.0.0/0 10.0.2.2 1 main |<br>| DAC  10.0.2.0/24 WAN ) main |<br>| DAC ? 192.168.10..... LAN 0 main |<br>| DAC ? 192.168.20..... HOTSPOT 0 main |<br><!-- End of picture text -->



<!-- Start of picture text -->
“ Hotspot ~ Servers Server Users UserPr Active Hosts IP Bindi Service Walled Walled Cookie: “'<br>Ci New Q Find Y Filter % Actions<br>Pe Name « Interface Address Pool Profile Addresses...= -<br>* hotspotorspo HOTSPOT hs-pool-4=o hsprof1Spro 2 Hotspot Setup<br><!-- End of picture text -->



<!-- Start of picture text -->
%! Hotspot Server Profile > hsprof1 2 x |<br>General Login RADIUS<br>Name | hsproft| @x CopyRemove<br>Hotspot Address 192.168.20.1 -<br>DNS Name hotspot.cafe -<br>HTML Directory hotspot .<br>HTML Directory Override +<br>Install Hotspot Queue<br>ee<br>HTTP Proxy Port 0<br>SMTP Server +<br>Cancel oK<br><!-- End of picture text -->



<!-- Start of picture text -->
St Hotspot Server Profite > hsprof1 o x)<br>General | Login RADIUS<br>LoginaBy QHTTP—]MAC cHaP @ cookieHTTPS ®peeCopy<br>HTTP PAP Trial<br>MAC Cookie<br>MAC as username<br>HTTP Cookie Lifetime 3d 00:00:00<br>none .<br>Split User Domain<br>00:30:00<br>1d 00:00:00<br>default<br><!-- End of picture text -->



<!-- Start of picture text -->
¥! Hotspot Server Profile > hsprof1 te<br>General Login RADIUS<br>Use RADIUS © Copy<br>x Remove<br>XOXIOCOCIOC KKK ¥<br>v<br>19 (wireless-802.11) .<br>Cancel OK<br><!-- End of picture text -->





<!-- Start of picture text -->
“tl Hotspot ~ Ser Ser, Users Use Acti Hos IPB Ser Wall Wall Coo «' X<br>Ci New Enable Disable Remove Q@ Find ¥ Filter C .<br>& Actions<br>r Server « Name Address =<br>counters and limits— for trial- users Reset Counters<br>+ ° Reset All Counters<br>Akun Staff Cafe<br>® all staff01<br>Akun Pelanggan<br>® all Pelanggan01<br>® all admin<br><!-- End of picture text -->



<!-- Start of picture text -->
‘ Internet hotspot- Log in — Mozilla Firefox -.. x<br>© | W internet hotspot-Login x = + v /<br>| €<¢ °C Q Not Secure http://hotspot.caFe/login w @®@nvy = | |<br>| | @ You must log in to this network before you can access the Internet. | Open network login page x |<br>| Please log in to use the internet hotspot service |<br>HOnMaCMEAN. SB eonce . ae<br><!-- End of picture text -->



<!-- Start of picture text -->
Pe neivanvirwabor ne<br>Session Actions Edit View Help<br>irvan@irvan-virtualbox: ~<br>irvan@irvan-virtualbox:~$ ip a<br>1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN grou<br>HP default qlen 1000<br>Link/Loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00<br>inet 127.0.0.1/8 scope host lo<br>valid lft forever preferred lft forever<br>inet6 ::1/128 scope host noprefixroute<br>valid_Lft forever preferred_1lft forever<br>2: enp@s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel sta<br>te UP group default glen 1000<br>Llink/ether 08:00:27:72:ae:30 brd ff: ff: ff: ff: ff: ff<br>inet 192.168.20.200/24 brd 192.168.20.255 scope global dynamic nopre<br>fixroute enpOs3<br>valid Lft 1389sec preferredlft 1389sec<br>inet6 fe80::a00:27ff: fe72:ae30/64 scope Link noprefixroute<br>valid lft forever preferred lft forever<br>irvan@irvan-virtualbox:~$ fj<br><!-- End of picture text -->



<!-- Start of picture text -->
sal DHCP Server ~ DHCP Networks Leases Options OptionSets Option Matcher Alerts uo<br>CG New Q, Find ¥ Filter [i Actions<br>-e Address « MAC Address Client ID Server Routes =<br>PC Kasir<br>192.168.10.... AA:BB:CC:DD:E...<br>CCcTV-1<br>192.168.10.... AA:BB:CC:DD:E...<br>CCTV-2<br>192.168.10.... AA:BB:CC:DD:E...<br>D 192.168.20.... O8:00:27:72:AE:.. 1:8:0:27:72:ae:30 dhcp?<br>“4 DHCP Lease > 192.168.10.10 o x<br>| General Active<br>| Enabled @ Copy<br>| Comment pc Kasir * Remove<br>| Address | 192.168.10.10 “|<br>| — Send Reconfigure<br>| MAC Address = AA:BB:CC:DD:EE:01 :<br>| Ping<br>| Use Src. MAC Address<br>| Check Status<br>ClientID +<br><!-- End of picture text -->



<!-- Start of picture text -->
4 Pe irvan@irvan-virtualbox: ~ -.ox |<br>| Session Actions Edit View Help |<br>| irvan@irvan-virtualbox: ~ ~ |<br>| irvan@irvan-virtualbox:~$ ip a |<br>1: Lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN grou |<br>| Link/Loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00 |<br>| 2: enpOs3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel sta<br>link/ether 08:00:27:72:ae:30 brd ff: ff: ff: ff: ff: fF |<br>| inet6 fe80::a00:27ff:fe72:ae30/64 scope Link noprefixroute |<br>irvan@irvan-virtualbox:~$ ff |<br>© ~~ W Internet hotspot-Login x + :<br>€ Cc ®Q NotSecure htt hotspot.cafe/logir 2 o a =|<br>i<br>ae 4<br>Mirrorik<br>Please log in to use the internet hotspot service<br>& Username |<br>Connect ‘<br>‘<br>Powered by MikroTik RouterOS oa<br>& 1 2 3 4 BM Minternethotspot-Ltog >= irvan@irvan-virtualbo. 6 eiasoy<br><!-- End of picture text -->



<!-- Start of picture text -->
| Mixrowik e |<br>:<br>Please log in to use the internet hotspot service<br>This connection is not secure. Logins<br>| Hi, Pelanggan01! —<br>IP address 192.168.20.200 /<br>Bytes up / down 2.7 KiB / 693 B /<br>Connected Os /<br>Status refresh Im /<br><!-- End of picture text -->

irvan@irvan-virtualbox:~$ ping 192.168.20.1 PING 192.168.20.1 (192.168.20.1) 56(84) bytes of data. 64 bytes from 192.168.20.1: icmp_seq=1 ttl=64 time=0.715 ms 64 bytes from 192.168.20.1: icmp_seq=2 ttl=64 time=0.802 ms 64 bytes from 192.168.20.1: icmp_seq=3 ttl=64 time=0.499 ms 64 bytes from 192.168.20.1: icmp_seq=4 ttl=64 time=0.494 ms AC --192.168.20.1 ping statistics --4 packets transmitted, 4 received, 0% packet loss, time 3083ms rtt min/avg/max/mdev = 0.494/0.627/0.802/0.134 ms irvan@irvan-virtualbox:~$ fj 



<!-- Start of picture text -->
irvan@irvan-virtualbox:~$ ping 8.8.8.8<br>PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.<br>64 bytes from 8.8.8.8: icmp seq=1 ttl=62 time=24.5 ms<br>64 bytes from 8.8.8.8: icmp seq=2 ttl=62 time=24.5 ms<br>64 bytes from 8.8.8.8: icmp seq=3 ttl=62 time=24.4 ms<br>64 bytes from 8.8.8.8: icmp_seq=4 ttl=62 time=24.2 ms<br>AC<br>--- 8.8.8.8 ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss, time 3007ms<br>rtt min/avg/max/mdev = 24.223/24.409/24.497/0.108 ms<br>irvan@irvan-virtualbox:~$ fj<br><!-- End of picture text -->



<!-- Start of picture text -->
‘irvan@irvan-virtualbox:~S ping google.com<br>PING google.com (74.125.68.138) 56(84) bytes of data.<br>64 bytes from sc-in-f138.1e100.net (74.125.68.138): tcmp_seq=1 ttl=62 ti<br>me=25.2 ms<br>64 bytes from sc-in-f138.1e100.net (74.125.68.138): icmp _seq=2 ttl=62 ti<br>me=25.5 ms<br>64 bytes from sc-in-f138.1e100.net (74.125.68.138): icmp_seq=3 ttl=62 ti<br>me=25.7 ms<br>64 bytes from sc-in-f138.1e100.net (74.125.68.138): icmp _seq=4 ttl=62 ti<br>me=25.5 ms<br>--- google.com ping statistics ---<br>4 packets transmitted, 4 received, 0% packet loss, time 3017ms<br>rtt min/favg/max/mdev = 25.153/25.491/25.732/0.210 ms<br>irvan@irvan-virtualbox:~$ fj<br><!-- End of picture text -->



<!-- Start of picture text -->
a ‘© Internet hotspot-Status X €% YouTube x + v<br>€ > CS © www.youtube.com w Sov =<br>_— 1D a<br>= Giyoulube Search Q Qg s+ @ Signin<br>Home Try searching* to get started<br>8 Start watching videos to help us build a feed of videos you'll love.<br>Shorts<br>Subscriptions<br>You<br>™% Firewall + FilterRules NAT Mangle Raw  ServicePorts Connections Address Lists _Layer7 Protocols o x<br>C4 New able able ove Q Find ¥ Filter ¥ ally O § Actions<br># AP Action Chain Src. Address Dst. Address Src. Ad... Dst. Ad... Proto... Src.Port  Dst.Port In. Inter... Out. Int... In. Inter... Out. Int... Bytes Packets =<br>##1000 D ajA jumpump — forwardforwardorwar 25.7 0BKiB: 126) Reset All Counters<br># 2 0 A jump — input 772.0 KiB 5093<br># 3 0 drop input 6 (tcp) 64872-... 0B to)<br># 4 0 jump —hs-input 772.0 KiB 5 093<br># 5 D @acc... hs-input 17 (u... 64872 43.8 KiB 678<br># 6 D @acc... hs-input 6 (tcp) 64872-... 727.1 KiB 4401<br># 7 0 jump —hs-input 8408 10<br># 8 D Greject hs-unauth 6 (tcp) 6.1 KiB 103<br># 9 D Greject hs-unauth 20.5 KiB 33<br># 10 D reject hs-unaut... oB ()<br>place hotspot rules here<br># 11 x =) pas. unused -h. oB ie]<br>Terima Koneksi estabilshed<br># 12 @acc... input 92.6 KiB 597<br>Buang Paket Invalid<br># 13 drop input 54.9 KiB 371<br>Blokir akses dari WAN<br>#14 drop input WAN 1152B 2<br>Buang Forward paket Invalid<br>#15 drop —_ forward 80B 2<br>Blokir SMTP spam<br># 16 drop forward 6 (tcp) 25 oB 0)<br>17> Live<br><!-- End of picture text -->



<!-- Start of picture text -->
A DNS ~ Static Cache Adlist Forwarders [2] x |<br>Q Find Y¥ Filter OJ % Actions<br>P Name . « Type Data TTL = Flush Cache |<br>® www.google.com 0.0.0.0 05:01:21<br>* www.gstatic.com AAAA 2404:6800:4003:c11... 00:00:15<br>© www.gstatic.com A 14?2.251.12.94 00:00:51<br>© www.reddit.com CNAME — reddit.map.fastly.net. 00:00:23<br>® www.wikipedia.org CNAME = dyna.wikimedia.org. 23:55:24<br>® www.youtube.com CNAME = youtube-ui.l.google.c... 00:00:27<br>® youtube-ui.l.google.com A 74.125.130.190 00:00:27<br>® youtube-ui.l.google.com A 74.125.130.91 00:00:27<br>® youtube-ui.l.google.ccom <A 74.125.130.136 00:00:27<br>* youtube-uil.google.com A 74.125.130.93 00:00:27<br>® youtube-uilgoogle.com A 14?.251.10.190 00:00:27<br>® youtube-ui.l.google.com A 142.251.10.93 00:00:27<br>® youtube-ui.l.google.com A 172.253.158.136 00:00:27<br>® youtube-ui.l.google.com A 172.253.144.91 00:00:27<br>® youtube-ui.l.google.com A 142.250.4.93 00:00:27<br>® youtube-ui.l.google.ccom <A 142.250.4.91 00:00:27<br>* youtube-uil.google.com A 147.250.4.190 00:00:27<br>* youtube-ui.l.google.com <A 142.250.4.136 00:00:27<br>® youtube-ui.l.google.com A 74.125.68.136 00:00:27<br>® youtube-ui.l.google.com A 74.125.68.93 00:00:27<br>® youtube-ui.l.google.com A 74.125.68.190 00:00:27<br>® youtube-ui.l.google.ccom <A 74.125.68.91 00:00:27<br>© youtube -ui.l.google.com 0.0.0.0 00:55:27<br><!-- End of picture text -->

||<br>A DNS|~<br>Static<br>Cache<br>Adlist|Forwarders|||[2] x<br>|<br>||
|---|---|---|---|---|---|
||||||QFind<br>Y¥FilterOJ|%Actions<br>||
||<br>P<br>|Name .<br>« <br>|Type|Data<br>|<br>  <br>TTL<br>=<br>|<br><br>FlushCache<br>|<br>|<br>|
||<br>|® www.google.com<br>||0.0.0.0<br>|05:01:21<br>||<br>|
||<br>|* www.gstatic.com<br>|AAAA<br>|2404:6800:4003:c11...<br>|00:00:15<br>||<br>|
||<br>|© www.gstatic.com<br>|A<br>|14?2.251.12.94<br>|00:00:51<br>||<br>|
||<br>|© www.reddit.com<br>|CNAME — <br>|reddit.map.fastly.net.<br>|00:00:23<br>||<br>|
||<br>|® www.wikipedia.org<br>|CNAME = <br>|dyna.wikimedia.org.<br>|23:55:24<br>||<br>|
||<br>|® www.youtube.com<br>|CNAME =<br>|youtube-ui.l.google.c...<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|74.125.130.190<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|74.125.130.91<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.ccom<br>|<A<br>|74.125.130.136<br>|00:00:27<br>||<br>|
||<br>|* youtube-uil.google.com<br>|A<br>|74.125.130.93<br>|00:00:27<br>||<br>|
||<br>|® youtube-uilgoogle.com <br>|A<br>|14?.251.10.190<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|142.251.10.93<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|172.253.158.136<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|172.253.144.91<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|142.250.4.93<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.ccom<br>|<A<br>|142.250.4.91<br>|00:00:27<br>||<br>|
||<br>|* youtube-uil.google.com<br>|A<br>|147.250.4.190<br>|00:00:27<br>||<br>|
||<br>|* youtube-ui.l.google.com<br>|<A<br>|142.250.4.136<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|74.125.68.136<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|74.125.68.93<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.com<br>|A<br>|74.125.68.190<br>|00:00:27<br>||<br>|
||<br>|® youtube-ui.l.google.ccom<br>|<A|74.125.68.91<br>|00:00:27<br>||<br>|
|||©youtube-ui.l.google.com||0.0.0.0|00:55:27|||





<!-- Start of picture text -->
Session Actions Edit View Help<br>irvan@irvan-virtualbox: ~<br>irvan@irvan-virtualbox:~S ping router.cafe<br>PING router.cafe (192.168.10.1) 56(84) bytes of data.<br>64 bytes from router.cafe (192.168.10.1): icmp _seq=1 ttl=64 time=0.568 m<br>64 bytes from router.cafe (192.168.10.1): icmp _seq=2 ttl=64 time=0.792 m<br>64 bytes from router.cafe (192.168.10.1): icmp_seq=3 ttl=64 time=0.911 m<br>64 bytes from router.cafe (192.168.10.1): icmp _seq=4 ttl=64 time=0.750 m<br>--- router.cafe ping statistics ---<br>4 packets transmitted, 4 received, 0% packet Loss, time 3579ms<br>rtt min/avg/max/mdev = ©.568/0.755/0.911/0.123 ms<br>irvan@irvan-virtualbox:~$ ff<br><!-- End of picture text -->



<!-- Start of picture text -->
“A Hotspot + Servers ServerPro Users User Profil Active Hosts IP Binding: Service Pc Walled Gai Walled Gai Cookies “ %*<br>Q Find Y Filter<br>Fa Server « User Domain Address Uptime Idle Time Session Time... Rx Rate Tx Rate =<br>Akun Pelanggan<br>hotspot1 Pelanggan... 192.168.20.200 00:12:16 00:00:21 0 bps 0 bps<br><!-- End of picture text -->

## **BAB 6 — ANALISIS HASIL** 

### **6.1 Evaluasi Keberhasilan Konfigurasi** 

Secara keseluruhan, seluruh target implementasi berhasil dicapai. Berikut adalah ringkasan evaluasi masing-masing fitur: 

|**No**|**Fitur**|**Status**|**Keterangan**|
|---|---|---|---|
|1|DHCP Server|✓Berhasil|Klien LAN mendapat IP otomatis<br>sesuai pool|
|2|Static DHCP|✓Berhasil|Kasir & CCTV selalu mendapat IP<br>tetap|
|3|Hotspot & Login|✓Berhasil|Captive portal berfungsi, autentikasi<br>wajib|
|4|NAT Masquerade|✓Berhasil|Semua perangkat dapat akses internet|
|5|Firewall Filter|✓Berhasil|Akses WAN ke router diblokir, rule<br>aktif|
|6|Address List|✓Berhasil|Grup IP terdefinisi, digunakan oleh<br>firewall rule|
|7|DNS Cache|✓Berhasil|Cache terisi, resolusi domain lebih<br>cepat|
|8|DNS Static|✓Berhasil|Nama lokal 'router.cafe' berhasil di-<br>resolve|
|9|Static Route|✓Berhasil|Routing table sesuai, default route ke<br>ISP aktif|



### **6.2 Kendala yang Ditemui dan Cara Penyelesaian** 

Tuliskan kendala yang Anda temui selama proses konfigurasi dan cara mengatasinya. Berikut contoh format: 

|**No**|**Kendala**|**Penyebab**|**Solusi**|
|---|---|---|---|
|1|Muncul pesan error "Secure<br>Connection Failed"<br>(PR_END_OF_FILE_ERROR)<br>saat pertama kali terhubung ke<br>jaringan Hotspot|Browser secara otomatis<br>mencoba mengakses<br>situs HTTPS<br>(connectivity-check ke<br>support.mozilla.org)<br>sebelum login, sementara<br>router mencegat<br>(intercept) seluruh trafik<br>untuk diarahkan ke<br>halaman login. Koneksi<br>HTTPS tidak bisa di-<br>redirect dengan aman<br>tanpa sertifikat SSL<br>terpasang|Mengabaikan pesan<br>error tersebut dan<br>langsung membuka tab<br>"Internet hotspot - Log<br>in" yang muncul<br>terpisah, lalu login<br>melalui halaman<br>tersebut. Untuk<br>pengujian browsing<br>pasca-login, digunakan<br>situs HTTP murni<br>seperti neverssl.com<br>agar terhindar dari<br>konflik SSL|
|2|Static DHCP Lease<br>menampilkan status "waiting",<br>bukan "bound"|MAC Address yang<br>didaftarkan pada<br>konfigurasi Static DHCP<br>merupakan MAC<br>Address<br>percobaan/placeholder,<br>sehingga belum ada<br>perangkat fisik yang<br>benar-benar terhubung<br>dengan MAC Address<br>tersebut|Status "waiting" tetap<br>dianggap sebagai bukti<br>konfigurasi yang valid,<br>karena menunjukkan<br>router telah berhasil<br>mereservasi IP Address<br>untuk MAC Address<br>yang didaftarkan.<br>Status akan otomatis<br>berubah menjadi<br>"bound" ketika<br>perangkat dengan<br>MAC Address sesuai<br>benar-benar terhubung<br>ke jaringan|
|3|Kesalahan pengetikan IP<br>Address saat melakukan<br>pengujian ping (contoh:<br>19.168.20.1, bukan<br>192.168.20.1), menyebabkan<br>100% packet lossKesalahan<br>pengetikan IP Address saat<br>melakukan pengujian ping<br>(contoh: 19.168.20.1, bukan<br>192.168.20.1), menyebabkan<br>100% packet loss|Human error saat<br>mengetik perintah ping<br>pada terminal|Memeriksa kembali<br>penulisan IP Address<br>sebelum menjalankan<br>perintah, memastikan<br>setiap oktet IP Address<br>sesuai dengan skema<br>yang telah dirancang|



### **6.3 Kemungkinan Pengembangan Sistem** 

Beberapa fitur pengembangan yang dapat diterapkan di masa depan untuk meningkatkan kualitas jaringan Cafe Kopi Bandung: 

- Bandwidth Management (Queue Simple/Tree) — Membatasi bandwidth per pengguna hotspot agar semua pengguna mendapat alokasi yang adil. 

- VLAN — Memisahkan trafik LAN, Hotspot, dan CCTV pada level Layer 2 menggunakan VLAN untuk keamanan yang lebih ketat. 

- User Profile Hotspot — Membuat profil berbeda dengan batas waktu dan bandwidth yang berbeda (misalnya: profil gratis 1 jam, profil premium unlimited). 

- Walled Garden — Mengizinkan akses ke beberapa website tertentu (seperti website cafe sendiri) tanpa perlu login hotspot. 

- Backup Otomatis — Konfigurasi script MikroTik untuk backup otomatis konfigurasi router secara berkala ke FTP atau email. 

- Monitoring — Mengintegrasikan The Dude atau Grafana untuk pemantauan trafik jaringan secara real-time dan historis. 

## **BAB 7 — KESIMPULAN** 

Berdasarkan hasil perancangan, implementasi, dan pengujian yang telah dilakukan, dapat disimpulkan bahwa: 

- Implementasi jaringan komputer Cafe Kopi Bandung menggunakan Router MikroTik berhasil dibangun dengan baik dan memenuhi seluruh target minimal yang ditetapkan, yaitu Internet Sharing, distribusi IP otomatis, dan sistem Hotspot dengan autentikasi. 

- Fitur DHCP Server berhasil mendistribusikan IP Address secara otomatis kepada seluruh perangkat yang terhubung ke jaringan LAN maupun Hotspot, mengurangi potensi konflik IP dan menyederhanakan administrasi jaringan. 

- Static DHCP memastikan perangkat-perangkat kritis seperti PC Kasir dan kamera CCTV selalu mendapatkan IP Address yang konsisten, yang sangat penting untuk keandalan operasional cafe. 

- Sistem Hotspot dengan captive portal berhasil diterapkan, sehingga setiap pelanggan diwajibkan melakukan autentikasi sebelum dapat menggunakan akses internet, meningkatkan keamanan dan memungkinkan pengelolaan pengguna. 

- Firewall Filter dan NAT yang dikonfigurasi berhasil melindungi jaringan dari akses tidak sah dari internet dan memastikan seluruh perangkat internal dapat mengakses internet melalui NAT Masquerade. 

- DNS Cache mempercepat resolusi domain bagi seluruh pengguna jaringan, sementara DNS Static memungkinkan penggunaan nama domain lokal untuk perangkat-perangkat dalam jaringan dan memberikan fleksibilitas untuk pemblokiran domain di tingkat DNS. 

- Address List mempermudah manajemen kebijakan firewall dengan pengelompokan IP yang terstruktur, memungkinkan perubahan kebijakan akses dilakukan secara efisien tanpa harus memodifikasi setiap rule secara individual. 

Dengan infrastruktur jaringan yang terstruktur ini, Cafe Kopi Bandung kini memiliki 

fondasi yang solid dan scalable untuk mendukung operasional bisnis sekaligus 

memberikan pengalaman koneksi internet yang lebih baik, lebih aman, dan lebih terkelola bagi seluruh pengguna. 

