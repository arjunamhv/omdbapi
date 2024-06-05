# Gunakan image Node.js untuk membangun aplikasi
FROM node:14 as build

WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin semua kode sumber
COPY . .

# Build aplikasi React
RUN npm run build

# Gunakan image Nginx untuk menyajikan aplikasi
FROM nginx:alpine

# Salin build aplikasi React dari tahap build
COPY --from=build /app/build /usr/share/nginx/html

# Ekspos port yang digunakan oleh Nginx
EXPOSE 80

# Perintah untuk menjalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
