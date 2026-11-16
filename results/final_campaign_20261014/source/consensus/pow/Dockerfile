# PoW node image — one instance per miner. SHA-256 work is the whole point of
# this benchmark, so no native crypto deps: stdlib `hashlib` is enough.
FROM python:3.13-slim

WORKDIR /app

COPY node.py .

# Mining + peer + client traffic share this port; orchestrator publishes only
# node 0's port to the host so the client can submit transactions.
EXPOSE 5000

# -u keeps stdout unbuffered so docker logs see commit events in real time.
ENTRYPOINT ["python", "-u", "node.py"]
