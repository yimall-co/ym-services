FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN cd node_modules/lockersm
RUN pnpm run build

EXPOSE 3200

CMD ["pnpm", "start:prod"]