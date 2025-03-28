#!/bin/bash

while true; do
    echo "Deploying..."
    dfx deploy --playground 

    echo "Restarting in 15 minutes... (Press 'R' to restart immediately)"

    for ((i = 0; i < 900; i++)); do
        read -t 1 -n 1 key
        if [[ $key == "R" || $key == "r" ]]; then
            echo "Force restart triggered!"
            break
        fi
        sleep 1
    done
done