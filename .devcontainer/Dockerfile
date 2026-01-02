FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm AS dev

RUN apt-get update

RUN git config --global core.autocrlf true && \
    git config --global core.trustctime false && \
    git config --global core.checkStat minimal

RUN ln -s /usr/bin/batcat /usr/local/bin/bat

USER root
