# Migrate QRIS Payment to Borderpay

Kami akan mengganti integrasi pembayaran QRIS dari Instanpay menjadi Borderpay sesuai dengan permintaan Anda.

## User Review Required

> [!WARNING]
> Pergantian payment gateway membutuhkan kredensial baru (API Key & Webhook Secret) dari Borderpay. Anda perlu mendaftar di Borderpay dan menyiapkan kredensial tersebut di file `.env` nantinya.

## Open Questions

> [!IMPORTANT]
> 1. **Crypto Payments**: Saat ini Anda juga menggunakan Instanpay untuk pembayaran Crypto (`/crypto`). Apakah Anda ingin tetap menggunakan Instanpay untuk Crypto, atau menghapus fitur Crypto sepenuhnya?
> 2. **API Keys**: Silakan siapkan `BORDERPAY_API_KEY` dan `BORDERPAY_WEBHOOK_SECRET` dari dashboard Borderpay Anda.

## Proposed Changes

### Backend Payment Routes

Akan ada modifikasi pada file backend untuk mengarahkan request QRIS ke API Borderpay.

#### [MODIFY] [payment.js](file:///d:/travellombok1/backend/routes/payment.js)
- Menghapus logika pembuatan QRIS Instanpay (`/qris`).
- Mengganti dengan endpoint pembuatan QRIS milik Borderpay (menggunakan REST API Borderpay).
- Menyesuaikan endpoint cek status (`/status/:transactionId`) dengan format Borderpay.
- Memperbarui handler `/webhook` untuk dapat memverifikasi *signature* (tanda tangan digital) dari webhook Borderpay, serta membaca format *payload* callback-nya saat pembayaran berhasil.

## Verification Plan

### Manual Verification
- Melakukan pemesanan percobaan dengan metode QRIS di website.
- Memastikan QR Code dari Borderpay berhasil muncul.
- (Jika memungkinkan) melakukan simulasi pembayaran / testing di dashboard Borderpay untuk memicu Webhook.
- Memastikan status pesanan di database berubah menjadi Lunas (PAID) saat webhook diterima.
