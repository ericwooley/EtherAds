#!/usr/bin/env bash
docker exec ipfs ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
docker exec ipfs ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'
docker exec ipfs ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
docker exec ipfs ipfs config --json API.HTTPHeaders.Access-Control-Expose-Headers '["Location"]'
docker exec ipfs ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'
echo "docker config set"