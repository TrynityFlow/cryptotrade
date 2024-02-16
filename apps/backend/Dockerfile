FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=4000
ENV DB_URL="mysql://root@localhost:3306/crypto"
ENV JWT_TOKEN="fdbh9u14y123kjfcndsf30uiodjslkdckdsadrfi3"

WORKDIR /app

RUN addgroup --system backend && \
          adduser --system -G backend backend

COPY apps/backend/prisma .
COPY dist/apps/backend .
COPY package.json .
RUN chown -R backend:backend .

RUN npm --omit=dev -f install
RUN npx prisma generate

EXPOSE 4000

CMD [ "node", "main.js" ]
