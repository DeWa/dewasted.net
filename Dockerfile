FROM node:16-alpine

EXPOSE 5000
WORKDIR /app

RUN apk add --no-cache nginx git python3 make g++

ADD nginx.conf /

# Retro-demos
ENV PARCEL_WORKER_BACKEND=process
RUN git clone https://github.com/DeWa/retro-demos.git
WORKDIR /app/retro-demos
RUN npm install && npm run build

# Asteroidz
WORKDIR /app
RUN git clone https://github.com/DeWa/asteroidz.git

# Dewasted.net
ADD . /app/dewasted.net
WORKDIR /app/dewasted.net
RUN npm install && npm run build


ENTRYPOINT ["nginx", "-c",  "/nginx.conf"]
