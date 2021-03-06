FROM node:11-alpine

EXPOSE 5000
WORKDIR /app

RUN apk add --no-cache nginx git

ADD nginx.conf /

# Retro-demos
RUN git clone https://github.com/DeWaster/retro-demos.git
WORKDIR /app/retro-demos
RUN npm install && npm run build

# Asteroidz
WORKDIR /app
RUN git clone https://github.com/DeWaster/asteroidz.git

# Dewasted.net
ADD . /app/dewasted.net
WORKDIR /app/dewasted.net
RUN npm install && npm run build


ENTRYPOINT ["nginx", "-c",  "/nginx.conf"]
