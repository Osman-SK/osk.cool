---
title: Network File Share (NFS) Setup
date: 2026-06-25
tags:
  - nfs-kernel-server
  - Ubuntu_Server
  - Server
  - NAS
  - Linux
---
### Intro

I shared a bit about my frustrations with GUI based media OS [in the post here [1]](https://osk.cool/posts/03-nasmedia-server-oss-vs-ubuntu-server.html). In these systems everything is easier to point and click at the cost of customization and CLI freedom. It works for most, not for me. 

One of the most important functions of any server is to share files. There are many options including: 

- NFS (Network File Share, Linux based)
- SMB (Server Message block, Windows based)
- WebDAV (Web Distributed Authoring and Versioning, HTTP(S) based)
- SFTP (SSH File Transfer Protocol)

If you do not have Windows workflows, NFS is an easy choice in my opinion.

So how does one go about sharing file systems with other devices in the network via NFS? 

### Section  1: Installation

Well, as with most problems, there is a package for that and the binary package name is nfs-kernel-server. As it was the recommended pack and maintained by Ubuntu Devs, I went with it.

Commands to install and inspect are as follows:

```bash

apt show nfs-kernel-server   # optional if you'd like to read more on it; press q to quit after reading.

sudo apt install nfs-kernel-server   # click y/yes after prompt, this will install package

sudo systemctl enable --now nfs-kernel-server   # --now to start 

sudo systemctl status nfs-kernel-server.service   # check if it is enable and active/running

```

These commands shall conclude the installation section.

### Section 2: Configuration

Alright installation done. Before the config edits; if not mounted yet; do 
create and/or mount directory(ies) to be shared:

```bash

#  or create and bind if needed

mkdir -p /srv/nfs/...   

sudo mount --bind /mnt/Media-HDD /srv/nfs/...

```

Now onto the NFS config:

NFS configuration is mainly done via a single config file, which located here: 
/etc/exports

Explore and configure on on CLI:

```bash

man 5 exports   # manual pages for detailed inspection

sudo vim /etc/exports   # open with sudo (otherwise read-only)

```

configuration file is a simple list of file location separated by ip addresses and config options. Looks like this:

```bash

# Example /etc/exports file configuration for NFSv4:
/srv/nfs4/device1  192.168.1.100(rw,sync,no_subtree_check) # Single Device/IP
/srv/nfs4/home  192.168.1.0/24(ro,sync,no_subtree_check) # Whole Local Network

```

Where to serve, mount, locate each directory, disk, is an interesting topic by itself I want to explore and write a blog about, a [useful resource link here [2]](https://grokipedia.com/page/Filesystem_Hierarchy_Standard#directory-hierarchy)

A few configuration option explanations [per Grok [3]](https://grok.com/share/bGVnYWN5_715bc35c-4890-45bf-81bd-869788183531):

ro / rw: Read-only (default behavior) or read-write.

sync / async: Reply only after data is committed to disk (sync; default, safer) vs. reply immediately; risk of data loss on crash, async.

no_subtree_check: default disabled behavior for it may cause issues in modern systems when renaming/moving folders inside exported directories.

#### Apply Changes:

One last thing; we need to apply changes to /etc/exports and check by following commands:

```bash

sudo exportfs -a   # apply changes to /etc/exports file 

sudo exportfs -s   # check; show applied changes/configuration

```

### Section 3: Configuration on Client 

This section is mostly optional. However if you are using MacOS, it is better to prep the machine for NFS. Media devices like Apple TV, ChromeCast etc usually detect via their own applications from their app stores; eg. VLC, Infuse, Plex

```bash

# do not forget to create the mount folder if it does not exist:

sudo mkdir -p /Volumes/nfs-disk

# fill your own ip address of the server below and mount to created/existing folder:

sudo mount -t nfs -o resvport,vers=4,ro 192.168.X.X:/srv/nfs/... /Volumes/nfs-disk

# mount command options: 
# 
# -t for type, ours was nfs
# -o for options 
# nfs version (vers=4) and readonly specifed
# 
# resvport stands for "reserved port".
# It forces the NFS client to connect to the server using a privileged port (a port number below 1024).
# not default on MacOS

```

Using this configuration on MacOS shall alleviate connection problems.

Now enjoy your NFS setup!

### References

[1] Previous Post on Ubuntu Server: https://osk.cool/posts/03-nasmedia-server-oss-vs-ubuntu-server.html

[2] File System Hierarchy Standard: https://grokipedia.com/page/Filesystem_Hierarchy_Standard#directory-hierarchy

[3] NFSv4 /etc/export file config options: https://grok.com/share/bGVnYWN5_715bc35c-4890-45bf-81bd-869788183531

