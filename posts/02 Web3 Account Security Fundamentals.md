---
title: Web3 Account Security Fundamentals
date: 2026-04-27
tags:
  - "#web3"
  - "#security"
  - "#hardware_wallets"
---
### Intro

Hacks seem to be gaining up steam these days.

CoW Swap front end attack, Drift protocol hack, AAVE compromises of March and April, 2026 is just as eventful as any other crypto-year, unfortunately. 

I personally had interesting phishing attempts over TG. 

Combined with AI, tricks are more nuanced and customized. Thus web3 security fundamentals are arguably more important than ever. Got that hardware wallet yet?

Good time to remind ourselves the battle tested security fundamentals. So, what are they? Where do we start?

Well lets do start at exchanges, since CEXs are still most popular on/off-ramps for most web3 users. Remember the phrase?

### 1- Not your keys, not your assets.

If crypto natives learned anything since the famous Mt. Gox hack, it is that if you are not holding keys to your digital assets, someone else does, and that might include hackers :/

So how shall you have them?

### 2- Use Hardware wallets; safely store keys.

The simplest and most effective way to protect yourself is to own and use hardware wallets.

There are many options ranging from redit card sized (eg. Solflare Shield) hardware wallets to air gapped devices (eg. Keystone). OGs like Trezor have "quantum ready" and wireless-convenient devices (Trezor Safe 7).

Beware of the one, Ledger, who had customer data leaked and very aggressive app tracking policies.

The choice is yours, do not complicate, pick the one you vibe. Buy from directly from the manufacturer, test with small amounts before using large amounts. Then, make sure to safely store keys offline again -- in case you lose your hardware wallet. 

### 3- Separate accounts (by apps/smart contracts) 

It sucks that even if you use a hardware wallet, you might be a victim. Arguably this is the situation that might suck the most. 

You owned your keys. 
You stored them safely with HWs. 
Yet you still managed to get hacked. WTF? 

Yes, unfortunately the work is not done. If you have smart contract interactions in a wallet, you are still at risk in two major attack vectors :

- Protocol exploit or malicious upgrade (think of smart contract compromises)
- Phishing with a fake approval (think of front end compromises)

What to do?

1- If your assets do not need to be with an app/protocol move them to a virgin address; an address that has not interacted with any smart contracts/apps/protocols.

2- If they do need to be with an app, (eg. lend/borrow like AAVE, Jupiter Lend), only use that address and that asset with that app.

3- To minimize phishing attack risk, check out my [previous article](https://osk.cool/posts/defillama-search.html) and use DefiLlama Search.

### 4- Revoke Approvals

To be safe and eliminate an attack vector, remove token (transfer) approvals granted to apps/smart contracts used. Remove them immediately after using or periodically to stay safer.

2 options to revoke approvals:

- Etherscan token approval checker
- revoke.cash

### Conclusion

Since 2015 smart contract blockchains are with us, and to be frank, unfortunately some of them still suck to use. Too much opsec needed to interact with blockchains safely and you CANNOT skip it unless you are ok that you might lose funds. However, do not lose sight, freedom is what you get if you invest in a bit of learning. 
