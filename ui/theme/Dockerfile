FROM debian:stable-slim

RUN apt-get update && apt-get install -y \
      make \
      g++ \
      woff-tools \
      git && \
      apt-get clean && \
      rm -rf /var/lib/apt/lists/*

RUN git clone --recursive https://github.com/google/woff2.git && \
      cd woff2 && \
      make clean all && \
      cp woff2_* /usr/local/bin

WORKDIR /fonts

CMD ["bash"]
