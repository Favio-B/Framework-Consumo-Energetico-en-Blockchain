# PBFT node image — one instance per container in the cluster.
# Runs only `node.py` inside; the orchestrator-side module.py lives on the host.
FROM python:3.13-slim

WORKDIR /app

# Only runtime dep: cryptography for Ed25519 signing/verification between nodes.
# Pin to match the host-side version in requirements.txt for reproducibility.
RUN pip install --no-cache-dir cryptography==44.0.3

COPY node.py .

# Every node listens for peer + client traffic on this port (inside the user-defined
# bridge network). The orchestrator publishes only the primary's port to the host.
EXPOSE 5000

# -u keeps stdout unbuffered so docker logs see commit events in real time.
ENTRYPOINT ["python", "-u", "node.py"]
