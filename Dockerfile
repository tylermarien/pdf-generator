FROM ghcr.io/puppeteer/puppeteer:16.1.0

COPY server.js .

EXPOSE 5000

CMD ["node", "server.js"]