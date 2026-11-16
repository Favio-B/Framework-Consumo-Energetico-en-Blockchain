# PoS validator image — one instance per validator. Just signs and verifies.
FROM python:3.13-slim

WORKDIR /app

# Ed25519 signing for proposer authentication (same primitive as PBFT).
RUN pip install --no-cache-dir cryptography==44.0.3

COPY node.py .

# Validator + client traffic share this port; orchestrator publishes only
# the entry validator's port to the host so the client can submit transactions.
EXPOSE 5000

# -u keeps stdout unbuffered so docker logs see commit events in real time.
ENTRYPOINT ["python", "-u", "node.py"]
