# Angular build
FROM node:16.14.2-alpine AS build

USER node
WORKDIR /home/node

ADD --chown=node:node ./src/package.json .
ADD --chown=node:node ./src/package-lock.json .

# install cli extra because it's not part of the package.json file because it's defined in the outer package.json file on the Dockerfile layer
# RUN npm install @angular/cli
RUN npm install

ADD --chown=node:node ./src .

RUN npm run build --prod

# run built version (dist folder)
FROM nginx:alpine AS final

EXPOSE 80

COPY default.conf /etc/nginx/conf.d
COPY --from=build /home/node/dist/inplanticular-frontend /usr/share/nginx/html