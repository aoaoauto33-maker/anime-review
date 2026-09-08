FROM node:22-trixie-slim

# 開発に必要な OS パッケージ
RUN apt-get update && apt-get install -y \
    git \
    curl \
    locales \
    && rm -rf /var/lib/apt/lists/*

# 日本語ロケールを生成
RUN sed -i '/ja_JP.UTF-8/s/^# //g' /etc/locale.gen && locale-gen ja_JP.UTF-8

ENV LANG=ja_JP.UTF-8
ENV LANGUAGE=ja_JP:ja
ENV LC_ALL=ja_JP.UTF-8

# pnpm を有効化
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app