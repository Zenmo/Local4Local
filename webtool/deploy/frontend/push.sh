TAG="${TAG:-dev}"

podman push \
    ghcr.io/zenmo/coco-frontend:$TAG \
    docker://ghcr.io/zenmo/coco-frontend:$TAG
