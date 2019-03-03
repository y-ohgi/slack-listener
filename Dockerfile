FROM node:10.13-alpine

ENV NUXT_HOST=0.0.0.0

WORKDIR /app

COPY package.json yarn.lock /app/

RUN set -x \
  && yarn install --production \
  && yarn run build

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start"]
