FROM ubuntu:14.04
RUN apt-get update; \
    apt-get upgrade -y; \
    apt-get install -y git; \
    apt-get install -y python; \
    apt-get install -y python-pip; \
    pip install -y youtube-dl; \
    apt-get install -y nodejs-legacy; \
    apt-get install -y npm \
    mkdir /home/web; \
