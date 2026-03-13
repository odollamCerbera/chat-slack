install:
	npm ci && cd frontend && npm ci

build:
	npm run build

start:
	npm run start

lint:
	npx eslint .
	