---
title: Grand Linux Command Cheat Sheet
date: 2026-07-08
tags:
  - "#Linux"
---
## Quick Reference & Practical Examples (All Topics)

```bash

### ============================================
### USEFUL IN WIDE RANGE
### ============================================

<cmd> -h
<cmd> --help
<cmd> <sub-cmd> -h

man <command>
man -k <pattern> 
man <section> <command>

command -V <cmd>
command -v <cmd>
which <cmd>
type <cmd>

file <file>

tldr <command> # brew info tealdeer (linuxbrew too!)

<cmd> --version  # quick way to check if it is installed, version
vim --version | head -1

### ============================================
### GENERAL / SYSTEM INFORMATION
### ============================================

uname                # unix name
uname -a             # -a for all

cat /etc/os-release

fastfetch
neofetch

w
who
whoami

hostnamectl -h
hostnamectl          # hostname info
hostnamectl status   # same as above

hostname
hostname -i          # ip address
hostname -I          # all IP addresses

id
id <user>
id root
id 1000
id -u <user>            # user ID
id -g <user>            # group ID

groups               # show group membership
groups <user>

printenv
printenv PATH
printenv SHELL

echo $0              # current shell/script
echo $SHELL          # default shell

uptime

date
cal
cal 2026
cal -3

timedatectl
timedatectl -a       # show all properties
timedatectl -h

free -h

df -h                # df: disk free
df -Th               # with filesystem type

du -sh ~/*           # du: disk usage, -s summarize, -h human-readable
du -sh ~/Documents/* | sort -hr

lsblk                # LiSt BLocK devices
lsblk -f             # with filesystem info
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL

lscpu                # Display info on the CPU arch.

chsh
chsh -s <shell_Path>

sudo shutdown -h now    # macOS
sudo shutdown -P now    # Linux
sudo shutdown -P +5 

sudo reboot

### ============================================
### NAVIGATION, FILES & DIRECTORIES
### ============================================

pwd

cd
cd ~
cd $HOME
cd -
cd /etc
cd ../..

ls
ls -l
ls -lahF --color=auto
ls -Salh                 # sort by size, largest first
ls -1
alias ls="ls -lahF --color=auto"

find . -iname '*git*' 
find ~/Desktop/Files/Docs/ -iname "*Samsung*"
find ~/Documents | wc -l   # count how many files, folders, including top folder

locate <pattern?>
updatedb                # updates locate db for faster finds

stat <file>

tree [path]
tree -L 2 [path]
tree -L 1 --dirsfirst [path]

mkdir newfolder
mkdir -p projects/work/2026/devops/kubecraft

touch newfile.txt
touch script.sh

cp file.txt backup.txt
cp -r folder/ /backup/
cp -r ~/Desktop/ <user>@<hostname>:/home/<user> # scp priority

mv oldname.txt newname.txt
mv -i file.txt destination/    # -i prompts bfore overwriting

rm file.txt                    # might use mv /path/to/Trash
rm -r folder                   # WATCH OUT
rm -rf /path/to/folder/*       # DANGEROUS
sudo rm -rf /path/to/folder/*  # VERY!!! DANGEROUS!!!

rmdir empty_directory_only

file /bin/bash
file /etc
file  ~/.bashrc

realpath script.sh             # show full path

### ============================================
### VIEWING & TEXT PROCESSING
### ============================================

cat file.txt
cat file1.txt file2.txt > combined.txt


# less =========================================

less file.txt
less +F /var/log/syslog        # follow mode (like tail -f)

<stdin> |  less 
# Navigation:
space | f | pageDown # f for forward
b | pageUp      # b for back
/<pattern>      # search pattern
n    # next 
N    # reverse-next

g    # be"g"inning  
G    # end

q    # "q"uit
# less =========================================


head file.txt
head -20 file.txt
head -1 file.txt
<stdin> | head # default 10
<stdin> | head -30
head !*        # take all args of prev cmd

tail file.txt
tail -20 file.txt
tail -f /var/log/syslog        # follow / watch live
tail -n +100 file.txt          # from line 100 to end

# grep =======================

<stdin> | grep "pattern" 
man curl | grep -A 2 -B 2 "\\-O"  # escape regex with \\

grep "pattern" file.txt

grep -ri "fail" /var/log/  # -r recursive; -i case insensitive

grep -B 2 -A 2 "error" app.log # -B before -A after (lines)

grep -v "debug" file.txt   # patterns that do not match 'pattern'

grep "root" /etc/passwd    # see root user-id
grep "^root" /etc/passwd   # starts with root
grep "bash$" /etc/passwd   # ends with bash

grep -E "[0-9]{3,}" file.txt   # regex example

# grep =======================


# cut, tr, sed, tee (text processing)
echo "hello:world:2026" | cut -d: -f2
echo "Hello World" | tr 'A-Z' 'a-z'
echo "hello123" | tr -d '0-9'
echo "line1" | tee output.txt | wc -l

cat names.txt | xargs -n 1 echo "Hello"

sed 's/old/new/g' file.txt
sed -i 's/old/new/g' file.txt     # in-place edit (use with caution)

# regex
^...$ = starts and ends with 

^     = starts with
grep  "^root" /etc/passwd

$     = ends with
grep "bash$" /etc/passwd

[0-9] = any digit
\\    = escape regex chars eg. grep "\\<regex char>"
\     = escape regex chars eg. vim /"\["

### ============================================
### HISTORY, REPEAT & COMMAND LINE
### ============================================

history
history | tail -20
history | grep apt
history | grep "\\?"    # escape regex with "\\"

!1234                   # run history command #1234

!!                      # repeat last command
sudo !!                 # sudo last command

!$                      # last argument of previous command
!*                      # all args of prev cmd

fc -ln -1 | pbcopy      # copy last command (macOS)

command -V apt          # verbose info about command
command -v apt

which apt

type apt

man apt

tldr apt                # if tldr client installed

<cmd> | tail -5
<cmd> | grep "foo" | less

### ============================================
### PROCESS & JOB CONTROL
### ============================================

ps
ps aux
ps aux | grep nginx

pstree
pstree | less
pstree -p           # w/ process id
pstree <user-name>

pgrep nginx
pgrep -a sshd

top

htop

btop

kill 1234
kill -9 1234                      # force kill
killall firefox

sleep 10 &
sleep 60 &

jobs        # show bg jobs
jobs -l     # show bg job pids
jobs -p     # only show bg job pids

bg          # tell if background jobs present

fg          # brings the most recent (+ ) job to foreground

fg %1
fg %sleep
fg %?nginx

### ============================================
### SSH & REMOTE ACCESS
### ============================================

/usr/bin/ssh [-v] <user>@<hostname>

ssh <user>@192.168.X.X
ssh -v <user>@<hostname>.local
ssh <user>@hostname.local

ssh-keygen -t ed25519 -C "github-mac"
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_github -C "github"
ssh-keygen -c -f ~/.ssh/id_ed25519_github     # change comment

ssh-add <private-key-file> 
ssh-add ~/.ssh/id_ed25519_github
ssh-add -L # Lists public key parameters of identities represented by the agent. 
ssh-add -l # Lists fingerprints of all identities represented by the agent
ssh-add -d ~/.ssh/id_ed25519_github

ssh-copy-id <user>@192.168.X.X
ssh-copy-id -i ~/.ssh/id_ed25519_github <user>@192.168.X.X

eval "$(ssh-agent -s)" 
# Could not open a connection to your authentication agent. 
# start the SSH authentication agent and immediately configure your current shell session to use it
# The -s flag tells it to output Bourne/POSIX shell syntax (as opposed to -c for C shell).

scp file.txt <user>@<hostname>:/home/<user>/
scp -r folder/ <user>@<hostname>:/home/<user>/

rsync -avz folder/ <user>@<hostname>:/home/<user>/backup/

# SSH File Locations:
~/.ssh/
~/.ssh/config   
~/.ssh/id_ed25519_github
~/.ssh/id_ed25519_github.pub 

### ============================================
### USERS, GROUPS & PERMISSIONS
### ============================================

passwd   # change password

sudo -i  # sign in root
exit     # exit root

sudo -u <username> <command&args>
sudo -k    # reset sudo use timer 

sudo su 

sudo adduser newuser

sudo deluser olduser
sudo deluser --remove-home olduser

sudo usermod -aG <groupName> <userName>

sudo groupadd <group-name>        # Create normal group
sudo groupadd developers               
sudo groupadd -g 2000 devops      # Create group with specific GID
sudo groupdel developers
sudo groupmod -n newname oldname

sudo chown <user>:<user> file.txt
sudo chown -R 1000:1000 /nextcloud/
sudo chown -R nobody:nogroup /data/

# Numeric chmod:
# 7 = rwx (4+2+1)
# 6 = rw-
# 5 = r-x
# 0 = ---

chmod 755 file          # rwxr-xr-x
chmod 644 file          # rw-r--r--
chmod 600 private_key   # rw-------
chmod 700 private_dir   # rwx------

chmod +x script.sh
chmod u+x <file>  # change to executable for user only 
chmod o-x <file>  # remove executable for others
chmod g+w <file>  # add write for group

umask 022


### ============================================
### PACKAGE MANAGEMENT
### ============================================

# --- apt (Debian/Ubuntu) ---
sudo apt update

sudo apt upgrade
sudo apt upgrade -y

sudo apt full-upgrade

apt search htop
apt search "^htop$"

apt show <package>
apt show htop

sudo apt install <package> 
sudo apt install htop tree curl vim git

apt list --installed
apt list --installed | grep docker
apt list --upgradable

sudo apt remove htop
sudo apt purge htop

sudo apt autoremove
sudo apt autoclean

# --- brew (macOS and Linux) ---

brew search <pattern>
brew search htop

brew info htop
brew desc htop
brew cat htop


brew install <formula>
brew install htop tree

brew install --cask <cask-name: GUI apps>
brew install --cask visual-studio-code

brew list

brew outdated

# --- snap ---

snap list
snap find nextcloud
snap info nextcloud
sudo snap install nextcloud --classic
sudo snap refresh
sudo snap refresh --hold=48h nextcloud
snap refresh --time

sudo snap revert nextcloud

### ============================================
### DISK, PARTITIONS, SMART, LUKS & NFS
### ============================================

lsblk          # LiSt BLocK devices
lsblk -f       # with filesystem info
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL

man fdisk
sudo fdisk -l
sudo fdisk /dev/nvme0n1

cat /etc/fstab



# SMART MONITORING TOOLS (smartmontools) ==============

sudo smartctl -h              # help info 
sudo smartctl -H /dev/<sdb>   # H for health; quick health check, first cmd for new drive
sudo smartctl -a /dev/sdb        # full info + SATA speed
sudo smartctl -t long /dev/sdb   # long self-test (1-3h)
sudo smartctl -t short /dev/sdb
# SMART MONITORING TOOLS (smartmontools) ==============



# unencrypt
sudo cryptsetup open --type luks /dev/sdb ironwolf



# NFS
cat /etc/exports
sudo exportfs -a   # apply changes to /etc/exports file 
sudo exportfs -s   # check; show applied changes/configuration

sudo systemctl restart nfs-kernel-server


# Mount / bind / NFS client (macOS example)

sudo mount /dev/sdX1 /data # simple mount

sudo mount /dev/mapper/ironwolf /data/ # after unencryption
sudo mount --bind /data/Files/Media/ /srv/nfs/media/ 

sudo umount /data

sudo mount --move /old/mount /new/mount

sudo mkdir -p /Volumes/nfs-media
sudo mount -t nfs -o resvport,vers=4,ro 192.168.X.XX:/srv/nfs/media /Volumes/nfs-media



### ============================================
### NETWORKING & DOWNLOAD
### ============================================

ip a
ip -o a       # non-verbose
ip addr show

networkctl
networkctl list

nettop # macOS

ping google.com
ping -c 4 8.8.8.8
ping 192.168.X.X

curl https://example.com
curl -I https://example.com      # fetch headers only (HTTP FTP FILE)
curl -O https://example.com/file.tar.gz # Output; Download w/ existing name
curl -o myfile.tar.gz https://example.com/file.tar.gz # output to a new file-name

wget https://example.com/file.iso 

ss -tuln
ss -tun

ethtool eno0
ethtool eno0 | grep -E "Speed|Link detected"

nmcli device status

### ============================================
### macOS SPECIFIC
### ============================================

open .
open <file>   # with defualt program
open -a <application-name>        # open macOS app
open -a <application-name> <file> # open w/ custom program

caffeinate -d &         # do not turn off display; in the bg
caffeinate -u -t 3600

ifconfig -a
ipconfig getifaddr en0

pbcopy < file.txt
pbpaste > newfile.txt

open .
open file.txt
open -a <application> [file]

# VS CODE

code 
code .
code file.txt

### ============================================
### SCRIPTING, VARIABLES, LOOPS & TESTS
### ============================================

# Variables
name="<user>"
echo $name
echo "${name}"
echo "$name is learning DevOps"
count=5

# Loops
for i in {1..10}; do echo $i; done
for file in *.txt; do echo "Processing $file"; done
while read line; do echo "$line"; done < file.txt

# Prefer `[[ ]]` over `test` or single `[` for safety in modern bash.

# String comparison (use [[ ]] )
[[ "$str1" == "$str2" ]] && echo "Equal"
[[ "$str1" != "$str2" ]] && echo "Not equal"
[[ -z "$name" ]] && echo "Empty string"
[[ -n "$name" ]] && echo "Not empty"

# Numeric comparison
[[ $count -eq 5 ]] && echo "Equal to 5"
[[ $count -gt 3 ]] && echo "Greater than 3"
[[ $count -lt 10 ]] && echo "Less than 10"

# File tests
[[ -f file.txt ]] && echo "Regular file exists"
[[ -d /data ]] && echo "Directory exists"
[[ -x script.sh ]] && echo "Executable"
[[ -r file.txt ]] && echo "Readable by curr. user"
[[ -s file.txt ]] && echo "File exists and not empty"

test -f file.txt && echo "exists"

# Special variables
echo $0     # script name
echo $1     # first argument
echo $?     # exit code of last command
echo $$     # current PID

echo $USER
echo $HOME
echo $PATH

# Functions (basic)
greet() {
    echo "Hello, $1!"
}
greet "DevOps Engineer"

### ============================================
### ARCHIVING (tarball)
### ============================================

# general  cerate syntax
tar -czvf $HOME/archive.tar.gz folder/to/be/archived # save to $HOME dir.
watch -n 2 du -sh ./*   # watch live; esp. large files

# Create
COPYFILE_DISABLE=1 tar -czvf backup.tar.gz folder/  # macOS friendly
tar -czvf backup.tar.gz folder/
tar -cvf backup.tar folder/       # no compress / -z
# -c create, -z compress w/ gzip, -v verbose, -f file-name
# -f must be last bc of value/file-name

# Extract
tar -xzvf backup.tar.gz           # default save to current dir
tar -xvf backup.tar -C /target/directory

# List contents
tar -tzvf backup.tar.gz

### ============================================
### REDIRECTION, PIPES, HEREDOC
### ============================================

echo "Line 1" > file.txt
echo "Line 2" >> file.txt

ls /etc > stdout.txt 2> stderr.txt
ls /nonexistent &> all.txt

command 2> /dev/null   # stderr
command &> /dev/null   # all

cat > script.sh <<'EOF'
#!/bin/bash
echo "Hello from heredoc"
echo "User: $USER"
EOF

cat >> file.txt <<EOF
Appended line
EOF

# Pipe
cat file.txt | grep "foo" | wc -l
ls /etc | tee listing.txt | head -5

\(ENTER)
ducker run -d \(ENTER) # btw \ and (ENTER) there should be no slash


### ============================================
### Text Editors
### ============================================

vi 

vim <file>
vim <new-file-name>
vim .
vim path/to/location

vim -M <file>    # strict read-only mode; no buffer or file edit allowed

vimtutor

<cmd> | vim -    # read in vim

# VIM COMMANDS

:%s/old_word/new_word/gc # c: asks for confirnation

:set paste

:nohlsearch

### ============================================
### TMUX
### ============================================

tmux
tmux ls
tmux attach | a [-t] # -t for target
tmux kill-session -t <session_name_or_number> 

exit   # detach and close tmux session

#============ CTRL+B ============
CTRL + B

%     # vertical pane
\"    # horizontal pane

arrows # navigate panes 

D     # detach
CTRL + D   # close pane

C     # New Window

0     # Change Window to 0 (Bottom line * changes)
1 
...

Q <number to switch to>   # show tmux window numbers and jump

o   # cycle through

,   # change name of window

w   # Show all windows and sessions

ALT + <1 | 2 | 3 | 4>

x   # kill split y/n

[   # enter scroll mode, press "q" to exit

:movew -t 5   # move window to number 5

tmux kill-window -t <window_number> # kill window

& # kill current window, prompts y/n
w <select> x # kill specified window, promtps y/n

p   # previous window
n   # next window

#============ CTRL+B ============



### ============================================
### CTRL/ALT
### ============================================

Ctrl + C

Ctrl + A
Ctrl + E

Ctrl + L | clear

Ctrl + W
Ctrl + U
Ctrl + K

Ctrl + R

Ctrl + P
Ctrl + N

Ctrl + B     # Move cursor back one character (same as Left Arrow)
Ctrl + F     # Move cursor forward one character (same as Right Arrow)

Alt + B | Alt + leftArrow      # Move back one word (or Esc then B) 
Alt + F | Alt + rightArrow     # Move forward one word (or Esc then F)

Ctrl + H     # Delete character before cursor (same as Backspace)
Ctrl + D     # Delete character under cursor (if line not empty)

Ctrl + Y     # Paste the most recently cut text
Alt + D      # Cut the word after the cursor


### ============================================
### SYSTEMD/systemctl, logs
### ============================================

systemctl [status | show | start | stop | restart | enable | disable]
systemctl status # summary of the systemd system state
systemctl status ssh
systemctl status nfs-server

sudo systemctl start ssh
sudo systemctl stop ssh
sudo systemctl restart ssh
sudo systemctl restart nfs-server
sudo systemctl reload ssh

sudo systemctl enable ssh
sudo systemctl enable --now docker

sudo systemctl disable ssh

systemctl reboot 

journalctl

journalctl -f
journalctl -f --since "1 hour ago"
journalctl -f --since "15 min ago"

journalctl -b                     # current boot
journalctl -b -1                  # previous boot
journalctl -p err -xe



### ============================================
### MISC & USEFUL FILE LOCATIONS
### ============================================

watch -n 2 free -h
watch -n 1 df -h
watch -n 5 "ss -tuln | grep :80"

cmatrix
cmatrix -h # help/commands
cmatrix -m # lambda mode
cmatrix -C [blue | red | green | magenta | white | black | yellow | cyan]
cmatrix -m -C yellow

tailscale -h
tailscale status 
tailscale status -h

locate nginx.conf

sudo updatedb

ln -s /target/path linkname
ln -sf /target/path linkname     # force

source ~/.bashrc

eval "$(/opt/homebrew/bin/brew shellenv)"



# important locations, file paths

/etc/passwd # User account information.

~/.ssh/
~/.ssh/config
~/.ssh/id_ed25519_github
~/.ssh/id_ed25519_github.pub

/etc/fstab

#nfs-kernel-server 
/etc/exports
/etc/nfs.conf

/etc/os-release

#grub
/etc/default/grub

/var/log/syslog (or journalctl)


```

Version 6

---

**End of organized cheat sheet.**  
