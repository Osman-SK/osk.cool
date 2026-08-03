---
title: My Blog Setup on Google Cloud Platform
date: 2026-08-03
tags:
---
### Intro

I have a very simple and efficient blog/website hosting setup on GCP (Google Cloud Platform). After trying different services, learning their pros and cons, I decided to settle for this one. 

More specifically I am using GCP App Engine service in a standard environment. Basically, you just upload your code and GCP handles the rest: scaling, load balancing, SSL etc. It is very simple and cost effective for simple blogs, websites or web apps.

My website was inspired by Vegard Stikbakke's [blog](https://www.vegardstikbakke.com/); its minimalism and themes.

The cost is less than a dollar a month.

### GCP Side

GCP side is handled with a yaml file:

First specify the the environment (standard or flexible) and runtime (Python, Java, Go, Node, PHP, Ruby etc.).

You might also specify the website url handlers here.

Here is how mine looks like:

```yaml

runtime: nodejs22
env: standard

handlers:

  # Root URL (/)
  - url: /
    static_files: dist/index.html
    upload: dist/index.html
    secure: always
  
  # Posts listing page
  - url: /posts
    static_files: dist/posts.html
    upload: dist/posts\.html$
    secure: always

  # Links page
  - url: /links
    static_files: dist/links.html
    upload: dist/links.html
    secure: always

  # CSS and root-level static files
  - url: /style\.css
    static_files: dist/style.css
    upload: dist/style\.css
    secure: always
    
...

```

### Code: Typescript

I tried to maintain simplicity and just used Typescript. Vite was used as a build and development toolkit. That is about it.

I used Kimi K2.6 on OpenCode for new features like markdown file import/integration.

### Publishing Workflow

I write a post on a markdown file and then move it into a folder in the repository, a few commands handle the rest:


```bash

#1 
move written-blog-post.md file into ./blogs/ 

#2 clear previous build
rm -rf ./dist

#3 build
npm run build

# Optional; check up how it looks
npm run dev

#4 deploy
gcloud app deploy   # requires google cloud cli

```

That is about it. 

I am sure it can be improved in various ways, but served me well for a while now, and I am very well used to it. The main point was simplicity and ease of operations anyway so I do not tinker with it too much.

### References

The website code is open source on GitHub:

[github.com/Osman-SK/osk.cool](https://github.com/Osman-SK/osk.cool)
