---
title: "Web3 Hardware Wallet Hack: A Postmortem and Improved Best Practices"
date: 2026-08-09
tags:
  - "#web3"
  - web3-security
  - hardware-wallets
---
### Intro

Web3/onchain users and institutions are used to software or social engineering hacks. A hardware wallet hack is new. Hardware wallets were supposed to be the epitome of web3 security. 

However, there was a recent hardware wallet (Cold Card) hack that made onchain users very fearful. To be absolutely clear: this is still a firmware/software hack due to randomness failures and yet, it did affect the hardware wallet holders.

In general in the past, If you had an open source hardware wallet with dapp seperation: you had not need to worry about most hacks -- that I know of.  

I wrote about the industry best practices in the past, see [[ link: 1 ]](https://osk.cool/posts/02-web3-account-security-fundamentals.html). 

### The Hack and Security Options Available

The crux of the problem was that the Cold Card random generator for web3 account creation (public and privite keys) was not really, ummmh; random!

Hardware and software were supposed to work together, if web3 account creation is not random or in other words not-easily-guessable then attacker can mimic and guess account keys! Which brings us back to the software/firmware part again.

So what is the solution? 

I still think that if you use open source hardware wallets that respect your privacy you are mostly good to go. I like Trezor. Others exist [[ 1 ]](https://osk.cool/posts/02-web3-account-security-fundamentals.html). 

I would stay far away from Ledger company and devices. They do not respect your privacy (data leaks, business model, aggressive tracking) and they are closed source. 

Do you research then pick a hardware wallet. 

Unfortunately, if you now want to protect against single open source hardware wallets
solutions are getting more complicated -- since there is now a precedent that open source hardware wallet addresses might be hacked; you might want to be more secure.

How? 

### Option 1: Multisig

Use multisig (multisignature). A rough equivalent might be 2 factor authentication. Basically not 1 but 2 private keys are needed for a transaction to go through. One of the best opsec (operational security) might be to used 2 different hardware wallets (eg. Trezor and Keystone).

On Solana Squads Protocol is the king. On ethereum land, I hear Safe (formerly Gnosis Safe) is the industry standard/popular choice.

### Option 2: Offline Signing

There are hardware devices that offer offline signing. It is possible to do it without hardware wallets (due to their account generation risks like Cold Card mentoned above).

### Option 3: Not Mutually Exclusive

Option 1 and 2 are not mutually exclusive. You can use a multisig that is partly signed by a traditional hardware wallet, and partly signed by an offline signer (hardware wallet or otherwise).

### Conclusion

Taking full responsibility for funds is the only way. In Crypto/Web3 land, securing the private key is your responsibility!

And remember: if you do not have smart contract application seperation per address, your funds might still be stolen [[ 1 ]](https://osk.cool/posts/02-web3-account-security-fundamentals.html).

Of course an attack vector might exist that we do not know yet, we can only increase security up to a point. Nothing eliminates all risk; but we can meaningfully reduce it!

Happy (safe) onchain activities! 



### References:

Security best practices
[1] https://osk.cool/posts/02-web3-account-security-fundamentals.html

More on the hack:
[2] https://unchainedcrypto.com/coldcard-firmware-flaw-lets-attacker-drain-594-bitcoin-from-users/

More Technical:
[3] https://engineering.block.xyz/blog/predictable-rng-fallback-and-32-bit-reseed-in-coldcard-firmware