---
title: "Fun Little CLI Screensaver: cmatrix"
date: 2026-07-23
tags:
  - "#Linux"
---
### Intro

cmatrix is a classic terminal program that recreates the iconic falling green characters from The Matrix.

It’s lightweight, available in most Unix-like package managers, and perfect for a quick aesthetic break, a temporary screen cover, or just showing off a bit of terminal flair.

### Install

```

brew install cmatrix      # macOS

sudo apt install cmatrix  # Debian/Ubuntu

sudo dnf install cmatrix  # Fedora

sudo pacman -S cmatrix    # Arch

```

### Basic usage and useful flags

```

cmatrix      # classic green rain

cmatrix -m   # lambda mode (every character becomes λ)

cmatrix -a   # asynchronous mode (more organic feel)

cmatrix -b   # occasional bold characters

cmatrix -B   # all characters bold

cmatrix -C blue   # change color (green, red, blue, yellow, cyan, magenta, white, black)

cmatrix -s   # screensaver mode (exits on any keypress)

cmatrix -mbC red   # can conbine options

```  

### Interactive controls (while it’s running)

r -- rainbow mode

a -- toggle asynchronous scroll

b -- random bold characters

B -- all bold

n -- turn bold off

0–9 -- change speed

! @ # $ % ^ & ) -- change color (red / green / yellow / blue / magenta / cyan / white / black)

q or Ctrl+C -- quit

Press above keys live (doesn’t work in -s mode)
 
 
 
Have fun with the cmatrix.




