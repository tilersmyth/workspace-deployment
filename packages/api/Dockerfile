# Stage 1: Build the code (from TS - requires dev dep)
FROM node:current-alpine as builder
WORKDIR /usr/app
COPY ./package.json yarn.* ./
RUN yarn install
COPY ./ ./
RUN yarn run build

# Stage 2: clean up dev dep
FROM node:current-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/app
COPY ./package.json yarn.* ./
RUN yarn install --production
COPY --from=builder /usr/app/dist ./dist
COPY production.env .

EXPOSE 4000
CMD ["npm", "run", "start:prod"]




