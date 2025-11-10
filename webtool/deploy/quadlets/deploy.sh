#!/bin/bash
# Set up Quadlet config files, copy them to the Podman host, and restart the services.
# This is a simplified version of the script at https://github.com/Zenmo/lux-website/blob/main/deploy/quadlets/deploy.sh

set -ex
cd $(dirname "$0")

OUTPUT_DIR=coco
mkdir -p $OUTPUT_DIR

# Prepare Quadlet files
for filename in *.container; do
    envsubst < "$filename" > "$OUTPUT_DIR/$filename"
done

# Copy files to the Podman host
scp -r $OUTPUT_DIR podman@podhost.zenmo.com:~/.config/containers/systemd/

# Restart services
ssh podman@podhost.zenmo.com "\
    systemctl --user daemon-reload \
    && systemctl --user restart coco-frontend"
