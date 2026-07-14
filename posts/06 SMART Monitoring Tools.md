---
title: S.M.A.R.T. Monitoring Tools
date: 2026-07-13
tags:
  - "#HDD"
  - "#Linux"
  - "#NAS"
---
### Intro

S.M.A.R.T. stands for Self-Monitoring, Analysis and Reporting Technology System. 

Wordy bunch. However; very useful. 

SMART is built into most modern disks; ATA/SATA, SCSI/SAS and NVMe disks [[ 1 ]](https://github.com/smartmontools/smartmontools/tree/main). "SMART Monitoring Tools" is a Debian/Ubuntu-apt package that contains two programs:

- smartctl (Control and Monitor Utility for SMART Disks)
- smartd (SMART Disk Monitoring Daemon)

This blog will focus on "smartctl".

### Why Useful?

I first came across SMART data during my second hand HDD search and had to use immediately after my purchase.

If you were to look at second hand listings for HDD or SSD drives you will come across SMART metrics one way another, most of the time via "Hard Disk Sentinel" or similar apps on MS Windows. 

I happened to found a "NAS level" HDD in package (not opened), and it was relatively well priced so I went with it. Unfortunately when I put the drive to test on my machine; I could not get it to do any simple thing, even though "lsblk" command showed that it actually existed. 

After a bit of research came across SMART and smartmontools package of Debian/Ubuntu APT. I will not forget the first simple command I ran which immediately told me everything I needed to know:

```bash
smartctl -H /dev/sdb   # -H for quick health info
```

Response: 

```
=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: FAILED!
Drive failure expected in less than 24 hours. SAVE ALL DATA.
No failed Attributes found.
```

Oouupsie. Drive failure? This was a quick test; I immediately wanted to know about the details.

### Drive Failure? Whaaat?

Second most useful command after a quick check:

```bash
sudo smartctl -a /dev/sdb   # full info (SATA speed included)
```

Response:

```
=== START OF INFORMATION SECTION ===

Device Model:     HUH728080ALE601
Serial Number:    VJGLR55X
LU WWN Device Id: 5 000cca 261c881e4
Firmware Version: A4GL0003
User Capacity:    8,001,563,222,016 bytes [8.00 TB]
Sector Sizes:     512 bytes logical, 4096 bytes physical
Rotation Rate:    7200 rpm
Form Factor:      3.5 inches
Device is:        Not in smartctl database 7.3/6131
ATA Version is:   ACS-2, ATA8-ACS T13/1699-D revision 4
SATA Version is:  SATA 3.1, 6.0 Gb/s (current: 6.0 Gb/s)
Local Time is:    Sat May  2 16:19:22 2026 +03
SMART support is: Available - device has SMART capability.
SMART support is: Enabled
AAM feature is:   Unavailable
APM feature is:   Disabled
Rd look-ahead is: Enabled
Write cache is:   Enabled
DSN feature is:   Unavailable
ATA Security is:  Disabled, NOT FROZEN [SEC1], Master PW ID: 0xfffd
Write SCT (Get) Feature Control Command failed: scsi error medium or hardware error (serious)
Wt Cache Reorder: Unknown (SCT Feature Control command failed)

Read SMART Thresholds failed: scsi error medium or hardware error (serious)

...

```
Logs then go on and on for a couple of pages.

I do not know how many times I read: "scsi error medium or hardware error (serious)"

Suffice to say the deal was off for me, I wanted my money back immediately. Second hand web-sites usually have a grace period. That time is very valuable because you can test the device, if not performant or at agreed specs, can return it back and get the money back. The grace period was gone!

Hopefully though; I got the funds back. Whew. That was close.

### On to new adventures

I did managed get another nice deal on a Seagate Ironwolf NAS branded disk. Half the price. Bought it, immediately ran the tests and yesss! Deal closed! Very happy with the disk! 

Might get phenomenal deals on second hand electronics. 

For disks, you know what to do.

### References

[1] https://github.com/smartmontools/smartmontools/tree/main

