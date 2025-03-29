#!/bin/bash

while true; do
    echo "Deploying..."
    dfx deploy --playground 
    
    echo "Waiting for 15 minutes..."
    sleep 900 
done
