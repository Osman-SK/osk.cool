---
title: Kubernetes Command Cheat Sheet
date: 2026-10-13
tags:
  - "#k8s"
  - "#kubernetes"
---
## Quick Reference & Practical Examples

```bash

# kubectl intro

alias k=kubectl

brew install bash-completion@2 # completion needs Bash 4.1+ and bash-completion v2 (macOS Bash 3.2 will not)

# shape of almost every line
k <verb> <resource> [name] [flags]

-n <ns>     this namespace
-A          all namespaces
-o wide     ip + node
-o yaml     manifest
-f          from file



# where am I ===========================================

k cluster-info

k config current-context
k config get-contexts                 # empty namespace column means default
k config use-context rancher-desktop  # switches
k config set-context rancher-desktop  # edits or creates, does not switch
k config set-context --current --namespace=mealie

k config view
k config view --minify                # active context only
# file: ~/.kube/config

k top nodes



# help =================================================

k -h
k run -h | less -i
k create deploy -h

k explain pods
k explain pods.spec
k explain pods --recursive
k explain service.spec.ports --recursive | grep -E "targetPort|nodePort|appProtocol"
k api-resources | grep -E "services|pods|deployments|nodes"



# look: get, top, describe =================================================

k get nodes
k get nodes -o wide
k get node rpi5 -o yaml | less

k get all
k get all -o wide
k get all -A

k get pods
k get pods -o wide   # debug default
k get pods -n mealie
k get pods -A

# yaml
k get pod <pod-name> -o yaml > pod-definition.yaml 

k get ns
k get svc
k get svc -A
k get secrets
k get pv
k get pvc
k get rs
k get deploy

k get pod nginx-osk -o yaml | less

k get secret <secret-name> -o yaml | less

k describe node rpi5
k describe node rpi5 | grep -A5 Addresses
k describe pod <pod-name>   # events at the bottom



# yaml, create nothing ================================

k run nginx --image=nginx --dry-run=client -o yaml > pod.yaml

k get pod <pod-name> -o yaml > pod-definition.yaml

k create deployment nginx --image=nginx --dry-run=client -o yaml > deploy.yaml

k create ns mealie --dry-run=client -o yaml > namespace.yaml

k create cm webapp-config-map --from-literal=APP_COLOR=darkblue --dry-run=client -o yaml > configmap.yaml

k create service nodeport nginx --tcp=80:80 --node-port=30080 --dry-run=client -o yaml
# can set nodePort; no pod labels

k create service clusterip redis --tcp=6379:6379 --dry-run=client -o yaml
# no pod labels; cannot pass a selector

k expose pod redis --port=6379 --name redis-service --dry-run=client -o yaml
# selector = pod labels

k expose pod nginx --port=80 --name nginx-service --type=NodePort --dry-run=client -o yaml
# selector from labels; cannot set nodePort



# create ===============================================

# apply -f creates or updates, idempotent; safe to re-run
# create -f fails if it exists
# replace -f replaces the whole object

k run nginx --image nginx             # Docker Hub if no registry
k run nginx --image nginx -n finance
k run custom-nginx --image=nginx --port=8080

k run nginx --image=nginx --dry-run=client -o yaml > pod.yaml

k create -f pod-def.yaml
k create -f pod-def.yaml -n dev

k create ns dev
k create deployment nginx --image=nginx --replicas=4
k create deploy nginx --image=nginx -r=2
k create cm cm-name --from-literal=APP_COLOR=darkblue
k create secret generic <secret-name> --from-literal=<key>=<value>

# yamls
k create deployment nginx --image=nginx --dry-run=client -o yaml > deploy.yaml
k create ns mealie --dry-run=client -o yaml > namespace.yaml

echo -n 'secret' | base64
echo -n 'base64literal' | base64 --decode

k apply -f nginx.yaml



# change / remove ======================================

k edit pod <pod-name>
# live pod only: image, init image, activeDeadlineSeconds, tolerations
# spec.containers[*].image, spec.initContainers[*].image
# spec.activeDeadlineSeconds, spec.tolerations

k apply -f file.yaml     # converge; other fields can remain

k replace -f file.yaml   # full replace
k replace --force -f file.yaml

k scale --replicas=6 -f file.yaml  # file on disk unchanged
k scale --replicas=6 replicaset myapp-replicaset

k rollout restart deployment -n monitoring <name>

k delete deployment nginx   # also deletes its pods
k delete pod <pod-name>     # deployment builds a new one
k delete svc <name>
k delete ns mealie

watch -n 1 "kubectl get pods"

# deployment yaml: RollingUpdate, maxUnavailable 25%, maxSurge 25%



# inside a pod =========================================

k exec -it nginx-docs -- /bin/bash    # -- fences kubectl flags from the container command
k exec -it nginx-docs -- /bin/sh
k exec ubuntu-sleeper -- whoami
k exec -it nginx-storage -c nginx -- bash

# Ctrl-D exits

k logs <pod>
k logs -n mealie pods/<pod>
k logs -n flux-system deploy/helm-controller --tail=30
k port-forward pods/<pod> 9000
k port-forward svc/mealie 9000
# same pod: localhost. other pods: own ip from -o wide


# services =============================================

k expose pod httpd --port=80 --name=httpd
k expose deployment frontend --port 8080
k expose deployment mealie --port 9000
k get svc
k edit service frontend               # type: LoadBalancer -> external ip
k get svc mealie -o yaml > service.yaml
k delete svc mealie && k apply -f service.yaml


# storage ==============================================

k apply -f nginx-storage.yaml
k exec -it nginx-storage -c nginx -- bash      # write on the mount
k exec -it nginx-storage -c busybox -- sh      # same files
# cannot add a volume to a running pod: delete, edit yaml, apply

k get pv                                  # disk, cluster scoped
k get pvc                                 # request, namespaced
k get storageclass
k describe pvc mealie-data
# delete the pod, claim remains, next pod sees the files



# k9s ==================================================

brew install k9s

k9s

? all keys

:pod :deploy :ns :svc :pvc :pv

Shift-A age 
Shift-S status
Shift-F port-forward

Ctrl-K restart

/search

l logs
s shell    
d describe    
y yaml
q quit



# helm / flux ==========================================

brew install helm

helm ls -A

helm status csi-driver-nfs -n nfs-csi

helm history csi-driver-nfs -n nfs-csi

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm install prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --create-namespace

helm upgrade prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --values values.yaml --cleanup-on-fail --wait --timeout 20m

helm rollback prometheus-stack -n monitoring

k get secret prometheus-stack-grafana -n monitoring -o jsonpath="{.data.admin-password}" | base64 --decode ; echo

flux get ks
flux get all -A
flux reconcile ks apps     # after commit/push



# rancher desktop ======================================

rdctl start
rdctl list-settings
rdctl set --virtual-machine.memory-in-gb=8 --virtual-machine.number-cpus=4
rdctl shutdown && sleep 25 && rdctl start
rdctl shell bash                      # /etc/cni inside the vm
rdctl reset                           # factory reset



```

Version 4

---

**End of organized cheat sheet.**  