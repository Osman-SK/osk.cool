---
title: What’s actually under 'status.oskcloud.net'
date: 2026-09-14
tags:
  - "#GCP"
  - Cloud
  - K8s-Cluster
---
## Intro

Recently [Mischa van den Burg](https://www.linkedin.com/in/mischavandenburg/) asked me about the dashboard in my home Kubernetes cluster. I mumbled too much and could not explain what was going on under the hood, so I went back and looked properly.

The manifests and image started from [Jonathan De Leon](https://www.linkedin.com/in/jonathan-deleon-cism/)’s work. They ran flawlessly, so I had never looked past “it shows CPU and pods on a URL.”

## What it is

`cluster-dashboard` is a small status page for the homelab. It shows things like:

- node names, roles, and architecture
- pod counts
- service / deployment health
- overall CPU and RAM

It is public at [https://status.oskcloud.net/](https://status.oskcloud.net/).

It is **not** Grafana, **not** the official Kubernetes Dashboard, and **not** metrics-server. Those exist elsewhere in the cluster. This page is a static site plus a JSON file that gets rewritten every 30 seconds.

## How it gets onto the cluster

When the cluster is up, Flux reconciles Git and applies the dashboard manifests (`apps/base/cluster-dashboard` plus the staging overlay).

That creates a Deployment in namespace `cluster-dashboard`. One Pod, **two containers**:

1. **nginx** — serves the website  
2. **metrics-collector** — a sidecar that writes metrics into a file nginx can serve  

They share a volume. That pairing is the whole design.

## The main container: nginx

A web server listens for HTTP, maps a URL to a file or response, and writes that response back. Here the main container is unprivileged nginx on port **8080**.

The image is built from only two files:

- `Dockerfile` — `nginxinc/nginx-unprivileged` plus a copy of the page  
- `index.html` — HTML, CSS, and JavaScript  

Source: [github.com/Osman-SK/home-cluster/tree/master/dashboard](https://github.com/Osman-SK/home-cluster/tree/master/dashboard)

The running image in the cluster is `ghcr.io/osman-sk/cluster-dashboard`. 

nginx itself does **not** scrape Kubernetes. It only serves:

- `GET /` → `index.html` baked into the image  
- `GET /api/metrics.json` → a file that appears at runtime on a mounted directory  

## The sidecar: metrics-collector

The sidecar pattern is a helper container in the same Pod as the main app. Same host, same network namespace, same lifetime, separate process. The helper adds behavior without stuffing it into the nginx image.

This sidecar is Alpine. On start it runs a shell script from a ConfigMap (`collect.sh`). Its only job:

1. Query Prometheus  
2. Shape the result into one JSON document  
3. Write that file onto a volume nginx can read  

nginx never gets cluster credentials. The browser never talks to Prometheus.

## Where the numbers come from

Every 30 seconds the script hits the in-cluster Prometheus HTTP API:

```text
http://kube-prometheus-stack-prometheus.monitoring.svc.cluster.local:9090/api/v1/query
```

That Prometheus is `kube-prometheus-stack`, also installed by Flux under `monitoring/`.

The script does **not** call `kubectl` and does **not** use metrics-server. It runs PromQL. The series it needs were already scraped from:

- **node-exporter** — host CPU, memory, uname, boot time (`node_*`)  
- **kube-state-metrics** — object state from the API server (`kube_pod_info`, `kube_deployment_*`)  

So: does the dashboard query Kubernetes directly? No. It queries Prometheus. Prometheus already asked the exporters.

`jq` on the sidecar joins the query results into one object, for example node CPU/memory, pod counts, deployment available vs desired. It writes atomically (`metrics.json.tmp` then rename) so nginx does not serve a half-written file.

## The shared volume

Both containers mount an `emptyDir` named `metrics-data`:

- sidecar: `/data/metrics.json` (write)  
- nginx: `/usr/share/nginx/html/api/metrics.json` (read)  

`emptyDir` is scratch space that lives as long as the Pod. Empty at start, gone when the Pod is deleted. Here it is the contract between helper and web server: **file drop, not an API**.

Until the first successful loop, `/api/metrics.json` is missing. The page shows `CONNECTING...` and retries.

## How the browser uses it

1. Browser loads `https://status.oskcloud.net/` --> HTML/CSS/JS from nginx.  
2. JavaScript calls `fetch('/api/metrics.json?t=' + Date.now())` immediately, then every 30 seconds. The query string avoids a cached file.  
3. The script paints nodes, bars, pod counts, and service health. Some labels (which node is the Pi, which is storage) are hardcoded in the HTML; the live numbers come from JSON.  

Same origin: the JSON is just another path on the same host.

## How the request reaches nginx

Nothing listens on the home router. A Cloudflare Tunnel connector runs **in the cluster** as its own Deployment (`cloudflare/cloudflared`).

That is not the same thing as the `cloudflared` command/binary you run once (`cloudflared tunnel create …`). The binary command **creates** the tunnel and credentials. The Pod **runs** the tunnel with those credentials. After setup, the laptop binary does not need to keep running.

Path of a visitor:

```text
Browser
  → Cloudflare edge (TLS)          # their anycast proxy
  → cloudflared Pod                # in-cluster connector
  → Service cluster-dashboard:3000
  → nginx :8080
        GET /                 → index.html (from the image)
        GET /api/metrics.json → file from emptyDir
```

`cluster-dashboard:3000` is a ClusterIP Service. Clients dial **3000**; kube-proxy forwards to the Pod’s **8080**, which is where nginx listens. From `cloudflared` to nginx the hop is plain HTTP on the cluster network. TLS already ended at Cloudflare.

Tiny version of the same idea:

```text
Web user              Cloudflare POP               Home cluster
browser --TLS--> status.oskcloud.net
                       |
                       |  already-open tunnel
                       v
                 cloudflared Pod --HTTP--> Service :3000 --DNAT--> nginx :8080
```

## How the data moves (the other direction)

```text
Nodes / kubelet
    │
    ├─ node-exporter  ─────────────┐
    └─ kube-state-metrics ─────────┤
                                   ▼
                         Prometheus (monitoring ns)
                                   │  PromQL every 30s
                                   ▼
                    metrics-collector sidecar (Alpine)
                                   │  write /data/metrics.json
                                   ▼
                    emptyDir shared with nginx
                                   │
                                   ▼
                    nginx serves /api/metrics.json
                                   │
                    Cloudflare Tunnel → status.oskcloud.net
                                   │
                                   ▼
                    Browser JS polls every 30s and paints the UI
```

Two pipelines, easy to mix up when talking out loud:

- **Data:** exporters → Prometheus → sidecar → file → nginx → JS  
- **Users:** browser → Cloudflare → `cloudflared` Pod → Service → nginx  

They only meet at nginx.

## What I should have said to Mischa

Underneath the dashboard is a static page in nginx, a sidecar that snapshots Prometheus into `metrics.json` every 30 seconds, and a Cloudflare Tunnel so the Service never needs a public port.

That is it 😅😁😆.

That is why “the dashboard queries metrics server pod” was the wrong sentence. The dashboard queries a file. The sidecar queries Prometheus. Prometheus already scraped the cluster.

Stayed tuned for "What I should have said to Mischa Part 2: HomeLab Cluster Security" 😂

### Reference

Grok and Brave AI used for some definitions, clarifying information and data/visitor graphs.