FROM ubuntu:20.04

# Avoid interactive prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies and FEniCS
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    software-properties-common \
    gnupg \
    ca-certificates \
    python3-pip \
    python3-numpy \
    python3-matplotlib && \
    add-apt-repository -y ppa:fenics-packages/fenics && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    fenics && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# The command to run the simulation
CMD ["python3", "main.py"]

