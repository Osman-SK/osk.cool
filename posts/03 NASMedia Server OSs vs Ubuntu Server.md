---
title: NAS/Media Server OSs vs Ubuntu Server
date: 2026-05-30
tags:
  - "#Linux"
  - "#openmediavault"
  - "#Ubuntu_Server"
  - "#Server"
  - "#NAS"
  - "#Media"
---

Recently I wanted to use and experiment with NAS/media servers, bought a cheap, second hand PC for it.

I want to have a couple of services mainly:

- media-share locally eg. NFS, 
- syncing docs across devices (eg. nextcloud container), 
- Ability to experiment with jellyfin like media services, I heard a lot about them.

Initially I thought, if i have a simple media server/NAS (network attached storage) OS (operating system), server services would go smoother. So I picked one of the simplest NAS OS out there: openmediaserver (OMV).

Things worked out quite the opposite though.

Even for relatively small changes or management I had NAS OS fighting me in every step of the way. Came to realize that OMV and likely other NAS operating systems want changes and management done their way, on their interface. If you wanna use cli to get things done, this approach interferes with how the OMV and likely other OSs operate, giving you weird errors, problems as you go about running your server.

For example, wanna docker? Gotto use third party app store thing on OMV, download their docker app, manage docker services there, otherwise you run into weird complications when running docker apps on OMV. 

Wanted a simple: 
```apt update && apt upgrade```? 
Nooo cli warrior, you gotto use the web interface otherwise you get degraded systemd status and apt errors along the way (was a great learning experience though).

I wanted a simple solution to my NAS and Media problems, I got more problems thrown on my way.

My conclusion is that GUI (graphical user interface) oriented NAS/Media Server OSs are for those who do not want to use or inexperienced with CLI. Drop the GUI, use cli & associated tools, tinker to your heart's content. It might be harder at first, because you might not be familiar with tools, but after some time spent, I believe it will be a smoother process, at least for me in the context of NAS and Media Server operations.

I am thinking about transitioning to just vanilla Ubuntu Server and then add whatever I need. 

Cheers for the ability to run your own servers.
