FROM mcr.microsoft.com/playwright:v1.60.0

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json ./
COPY playwright.config.ts ./
COPY eslint.config.ts ./
COPY .prettierrc ./
COPY src ./src
COPY tests ./tests

ENV CI=true
ENV HEADLESS=true

CMD ["npm", "run", "test:ci"]