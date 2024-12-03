#!/bin/bash

TIMEOUT=60
HOST=$1
PORT=$2
shift 2

for i in $(seq 1 $TIMEOUT); do
    nc -z -v -w5 $HOST $PORT && break
    echo "Waiting for $HOST:$PORT to be up..."
    sleep 1
done

if [ $i -eq $TIMEOUT ]; then
    echo "Timed out waiting for $HOST:$PORT"
    exit 1
fi

exec "$@"