#!/bin/bash

set -ex

cd $(dirname "$0")

TAG="${TAG:-dev}"

podman build \
    --file Dockerfile \
    --ignorefile .dockerignore \
    --tag ghcr.io/zenmo/coco-frontend:$TAG \
    --progress=plain \
    $@ \
    ../..
