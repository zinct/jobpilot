#!/bin/bash

# Remove All Current
rm -rf .dfx
rm -rf src/declarations

dfx deploy
dfx generate

export LOCAL_NETWORK=local
export BACKEND_CANISTER_ID=$(dfx canister id hirex_backend)
export LLM_CANISTER_ID=$(dfx canister id llm)
export II_CANISTER_ID=$(dfx canister id internet_identity)

# Update .env file
cat > .env.local <<EOL
DFX_VERSION='0.25.0'
DFX_NETWORK=$LOCAL_NETWORK
CANISTER_ID_HIREX_BACKEND=$BACKEND_CANISTER_ID
CANISTER_ID_LLM=$LLM_CANISTER_ID
CANISTER_ID_INTERNET_IDENTITY=$II_CANISTER_ID
EOL

echo "Deployment complete."
