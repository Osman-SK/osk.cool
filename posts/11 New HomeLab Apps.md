---
title: "New HomeLab Apps: Dashboard, WebTop, Qbittorrent and Prowlarr via Cloudflare Tunnel and ghcr.io"
date: 2026-08-17
tags:
  - "#K8s-Cluster"
  - "#HomeLab"
---
### 1- Dashboard

I have been exploring new apps for my home K8s cluster.

I wanted to start with a place where I saw a bird's eye view of my cluster stats. I fell in love with one open source dashboard: [status.deleontech.net](https://status.deleontech.net/) made by [Jonathan Deleon](https://www.linkedin.com/in/jonathan-deleon-cism/). A former KubeCraft member.

Thanks to Jonathan mine is forked and live on: [status.oskcloud.net](https://status.oskcloud.net/)

The process involved setting a cloudflare tunnel and uploading a container to GitHub Container Registry (ghcr) which were welcome since it has been a while I did those. 

Notes helped, workflow looked like:

```bash

# =================== cloudflared Tunnel Creation Steps =========================

# from node/server (not on remote/client machine) create tunnel:

cloudflared tunnel create audiobooks # audiobooks.oskcloud.net, not mandatory but good convention to keep!

cd
cd .cloudflared

ls -l

# on remote machine/client, get the tunnel json:

scp <user>@XX.XX.XX.XX:/home/<user>/.cloudflared/c0fc020d-2a61-495a-9028-25f7ad838b98.json  ~/Documents/pi-cluster/

# create k8s secret:

kubectl create secret generic tunnel-credentials \
--from-file=credentials.json=c0fc020d-2a61-495a-9028-25f7ad838b98.json \
--dry-run=client -o yaml > cloudflare-secret.yaml

# encrypt w/ sops:

sops --age=$AGE_PUBLIC \
--encrypt --encrypted-regex '^(data|stringData)$' --in-place cloudflare-secret.yaml

# Add to the Cloudflare DNS:

>> go to Cloudflare DNS records for oskcloud.net
>> configure:
>> TYPE: CNAME
>> NAME: audiobooks   # audiobooks.oskcloud.net
>> TARGET: c0fc020d-2a61-495a-9028-25f7ad838b98.cfargotunnel.com

nslookup audiobooks.oskcloud.net   # check if it is up! a minute or so!

# ================= END CoudFlareD Tunnel Creation Steps =======================



# ==================== GHCR Upload ====================

# Login to GHCR (you need a Personal Access Token with write:packages scope)
echo YOUR_GITHUB_PAT | docker login ghcr.io -u Osman-SK --password-stdin

cd dashboard 
docker build -t ghcr.io/osman-sk/cluster-dashboard:v1.0.0 .

docker push ghcr.io/osman-sk/cluster-dashboard:v1.0.0

# ==================== END GHCR Upload ====================

```


### 2- WebTop: VM for the Cluster

I have been looking for a decent torrent set up for a while. Lots of free and legal media available for consumption.

I thought why not a container-VM with proper security (torrent sites are notorious for malware)? Enter: WebTop. A VM via browser!

I can now search and download within the WebTop container and then use persistent volumes associated with them to move files around, especially to where my NFS is served. Or so I thought.

The very first issue was that: raspberry pi and wayland did not go well together. Had to use X11. Unfortunately X11 did not work either. 

I then decided to use alpine image for ubuntu xfce and that did work! Now I could browse. 

Second issue: even though I could browse the net, I had strict restrictions on the container like privilege escalation. Because the container could not use root, I could not really download and use binaries (if it possible pls let me know!).

So then I had a research-chat with Grok. I decided to use WebTop as just a regular VM to do regular VM things, and wanted implement qbittorrent (torrent client) and prowlarr (indexer/search) together for torrenting.

### 3- Qbittorrent and Prowlarr

After adjusting manifests, an unexpected thing happened. I mistook lack of seeders for slow download speeds while running in Cluster-IP (not exposed to the net as much as a port-forwarded set up, reducing connections and speed).

Turns out it had nothing to do with Cluster-IP set up, just plain lack of seeder count/volume. LOL. I forgot a bit about how this stuff worked!

After figuring out it was the seeder, not port-forward problem: I love this set up! 

Prowlarr searches for torrents and automatically sends them to the torrent client (qbit) on cluster. You do not need to open the webUI of qbit client if you do not want to, Prowlarr just handles it with a few configs! (same namespace and prowlarr setting configs make it possible!)

### 4- Outlook

I have so many things in the pipeline that I want to try. Slowly move media and streaming to k8s, add nodes and make it multi node + mixed architecture (amd64 & ARM64), try web3 accounts for authentication, login even maybe for secrets. Will be fun!

### References

My homelab is open source, read more in the README: [github.com/Osman-SK/pi-cluster](https://github.com/Osman-SK/pi-cluster)

