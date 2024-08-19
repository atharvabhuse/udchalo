#!/bin/bash
# Custom prebuild commands

echo "Running custom prebuild commands"

cd /var/app/staging/

npm install --legacy-peer-deps
