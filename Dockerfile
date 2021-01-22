FROM node:14.11.0-stretch

# https://googlechrome.github.io/rendertron/deploy.html

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/GoogleChrome/rendertron.git

WORKDIR /rendertron

RUN npm install && npm run build

ADD make-config-from-env.js .
ADD entrypoint.sh .

EXPOSE 3000

CMD ["sh", "entrypoint.sh"]