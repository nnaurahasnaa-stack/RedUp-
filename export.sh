#!/bin/bash

# RedUp Export Script
# Membantu mengexport aplikasi ke berbagai format

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$PROJECT_DIR/dist"
BUILD_TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 RedUp Client-Side Application Export Tool"
echo "================================================"
echo ""

# Function to show menu
show_menu() {
    echo "Pilih opsi export:"
    echo "1. Build Production (npm run build)"
    echo "2. Preview Build Lokal"
    echo "3. Export ke ZIP file"
    echo "4. Show Export Guide"
    echo "5. Clean & Rebuild"
    echo "6. Exit"
    echo ""
}

# Function to build
build_app() {
    echo "📦 Building aplikasi..."
    cd "$PROJECT_DIR"
    npm run build
    echo "✅ Build selesai!"
    echo "📁 Output tersimpan di: $DIST_DIR"
    du -sh "$DIST_DIR"
    echo ""
}

# Function to preview
preview_app() {
    echo "👀 Menjalankan preview server..."
    echo "Aplikasi akan tersedia di: http://localhost:5173"
    echo "Tekan Ctrl+C untuk stop server"
    echo ""
    cd "$PROJECT_DIR"
    npm run preview
}

# Function to export ZIP
export_zip() {
    if [ ! -d "$DIST_DIR" ]; then
        echo "❌ Folder dist tidak ditemukan. Silahkan build terlebih dahulu."
        return 1
    fi
    
    ZIP_FILE="$PROJECT_DIR/RedUp_Export_${BUILD_TIMESTAMP}.zip"
    echo "📦 Membuat ZIP file..."
    cd "$DIST_DIR"
    zip -r "$ZIP_FILE" .
    echo "✅ ZIP file berhasil dibuat!"
    echo "📁 Lokasi: $ZIP_FILE"
    ls -lh "$ZIP_FILE"
    echo ""
}

# Function to show guide
show_guide() {
    if [ -f "$PROJECT_DIR/EXPORT_GUIDE.md" ]; then
        less "$PROJECT_DIR/EXPORT_GUIDE.md"
    else
        echo "❌ EXPORT_GUIDE.md tidak ditemukan"
    fi
}

# Function to clean rebuild
clean_rebuild() {
    echo "🧹 Menghapus build yang lama..."
    rm -rf "$DIST_DIR" "$PROJECT_DIR/node_modules/.vite"
    echo "🔨 Melakukan rebuild..."
    build_app
}

# Main loop
while true; do
    show_menu
    read -p "Pilih (1-6): " choice
    
    case $choice in
        1) build_app ;;
        2) preview_app ;;
        3) export_zip ;;
        4) show_guide ;;
        5) clean_rebuild ;;
        6) echo "👋 Goodbye!"; exit 0 ;;
        *) echo "❌ Pilihan tidak valid"; echo "" ;;
    esac
done
