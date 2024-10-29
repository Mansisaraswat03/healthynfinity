# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
ENV PORT 3000
EXPOSE 3000
CMD ["npm", "run", "start"]
