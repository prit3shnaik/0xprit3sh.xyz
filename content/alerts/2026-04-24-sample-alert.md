---
title: "Critical: Stealer Log Drop — 50k Indian Credentials Detected"
date: 2026-04-24T08:00:00+05:30
severity: "critical"
alert_type: "IOC"
tlp: "WHITE"
active: true
ioc: "185.220.101.45"
affected_systems: "Windows 10/11 — Redline Stealer variant"
source: "https://darkweb-example.onion"
tldr: "Fresh stealer log drop detected on darkweb forum containing ~50k Indian user credentials including banking and email accounts."
tags: ["stealer", "credential-leak", "india", "darkweb", "redline"]
---

## Overview

A fresh batch of stealer logs was detected on a prominent darkweb marketplace on 2026-04-24 at approximately 06:30 UTC. The dump contains approximately 50,000 credentials attributed to Indian users.

## IOC Details

The C2 server at `185.220.101.45` is associated with a Redline Stealer campaign targeting Indian users via:
- Fake government portal phishing pages
- Cracked software downloads on Telegram channels

## Affected Data Types

- Email credentials (Gmail, Yahoo, Outlook)
- Banking portal logins
- UPI app credentials
- Steam / gaming accounts

## Recommended Actions

1. Check if your organization's domains appear in the dump
2. Force password resets for affected users
3. Block C2 IP at perimeter: `185.220.101.45`
4. Monitor for unusual login activity from Indian IP ranges

## MITRE ATT&CK

- T1555 — Credentials from Password Stores
- T1056 — Input Capture
- T1041 — Exfiltration Over C2 Channel
