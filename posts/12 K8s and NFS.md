---
title: "K8s storage solutions: NFS and Longhorn"
date: 2026-08-25
tags:
  - "#nfs"
---
### K8s Storage Solutions

From my latest foray into K8s storage and availability; my limited search showed that [Longhorn](https://longhorn.io/) is the most popular choice when it came to distributed block storage. It allows cluster storage to be replicated among nodes. Thus if node(s) go down, volume/storage attached to downed nodes do not become a problem and available via other nodes. Genius.

However I have different needs. I do not have enough storage in my master node, and not nearly enough on agent/worker node. What I do have is my attached/extra storage on my worker node that I make use of as DAS (direct attached storage) and configuerd for NFS (network file share).

Therefore K8s solutions involving NFS were prime canditates. Found my darling in this K8s [csi driver](https://github.com/kubernetes-csi/csi-driver-nfs). This driver simply allows a cluster to use pre-configured NFSv3 or v4 setup which is I already have and documented in this [nfs setup blog post](https://osk.cool/posts/04-network-file-share-setup.html). 

### Yamls

Associated config/yaml files are here for my cluster: https://github.com/Osman-SK/home-cluster/tree/master/infra/controllers/base/nfs-csi

To give an overview, I make use of helm charts for the nfs driver.

I manage the whole thing through Flux (GitOps all the way). There’s a HelmRepository pointing at the official charts, and a HelmRelease that installs csi-driver-nfs version 4.11.0 into its own nfs-csi namespace.

A few key values I set:

- Controller runs on the control-plane node (runOnControlPlane: true) with a single replica; enough for a home cluster.
- driver.mountPermissions: "0755" so the provisioned directories don’t end up with overly restrictive permissions.
- I explicitly disable the chart’s built-in StorageClass creation (storageClass.create: false) because I want to manage (and SOPS-encrypt) that myself.

The StorageClass itself is pretty straightforward. It points the provisioner nfs.csi.k8s.io at the NFS server and share I already set up earlier. A couple of mount options keep it on NFSv4, and I enable volume expansion + set a reclaim policy that matches how I like to clean things up. 

Because the driver supports dynamic provisioning, every new PVC just gets a subdirectory created under the existing share; no manual directory babysitting required.

Once the HelmRelease is reconciled and the StorageClass is applied, any workload can simply request:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: whatever
spec:
  accessModes:
    - ReadWriteMany          # or ReadWriteOnce, both work
  storageClassName: nfs-csi  # or whatever you named the class
  resources:
    requests:
      storage: 10Gi
```


…and the CSI driver takes care of the rest.

### Why this instead of Longhorn (for me)

Longhorn is excellent when you actually have usable local disks on every node and want true distributed block storage with replication. I don’t. My master is storage-starved and the worker’s interesting capacity lives on a DAS that is already exported via NFS. Re-using that existing NFS export via the official CSI driver is simpler, lighter, and doesn’t force me to dedicate more local disk or run extra replica engines I don’t need.

Trade-offs are: the NFS server (and the disk behind it) is a single point of failure, and you get file-level rather than block-level semantics. For a home lab that already treats that DAS as the “big storage” anyway, that’s an acceptable (and intentional) trade-off. 

I will be diving more into having a copy of my whole disk in another location later on. I am ok right now.

That’s the whole setup. Clean, minimal, and it just works with the NFS share I already had.