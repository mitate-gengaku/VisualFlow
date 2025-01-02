FROM node:22.12.0-bullseye

USER root

RUN npm i -g npm@latest vercel@latest npm-check-updates
RUN apt-get update && apt-get -y install vim git

COPY ./src /home/node/workflow-generator
RUN chown -R node:node /home/node/workflow-generator

RUN groupmod -g 1000 node && usermod -u 1000 -g 1000 node
USER node
WORKDIR /home/node/workflow-generator