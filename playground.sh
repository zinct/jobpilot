#!/bin/bash

# Remove All Current
rm -rf .dfx
rm -rf src/declarations

export DFX_NETWORK=local
export PLAYGROUND_NETWORK=playground

echo "Deploying Backend and LLM to Playground..."
dfx deploy hirex_backend --network $PLAYGROUND_NETWORK
dfx deploy llm --network $PLAYGROUND_NETWORK

dfx generate llm --network $PLAYGROUND_NETWORK
dfx generate hirex_backend --network $PLAYGROUND_NETWORK

# Get Backend and LLM canister IDs
BACKEND_CANISTER_ID=$(dfx canister id hirex_backend --network $PLAYGROUND_NETWORK)
LLM_CANISTER_ID=$(dfx canister id llm --network $PLAYGROUND_NETWORK)
echo "Backend deployed with ID: $BACKEND_CANISTER_ID"
echo "LLM deployed with ID: $LLM_CANISTER_ID"

# Update .env file
echo "Updating .env file..."
cat > .env.local <<EOL
DFX_VERSION='0.25.0'
DFX_NETWORK=$DFX_NETWORK
PLAYGROUND_NETWORK=$PLAYGROUND_NETWORK
CANISTER_ID_HIREX_BACKEND=$BACKEND_CANISTER_ID
CANISTER_ID_LLM=$LLM_CANISTER_ID
CANISTER_ID_INTERNET_IDENTITY=$II_CANISTER_ID
EOL

echo ".env file updated successfully!"

echo "Deployment complete."
