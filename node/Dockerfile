FROM node:18

RUN mkdir /workdir
COPY . .
RUN mkdir /data
RUN ln -s /workdir/package.json /data/.
WORKDIR /data
RUN npm install
ENV NODE_PATH /data/node_modules/
WORKDIR /workdir

RUN apt update && \
    apt install -y wget

ENV DOCKERIZE_VERSION v0.7.0

RUN wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

EXPOSE 3000