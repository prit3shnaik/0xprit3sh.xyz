---
title: "C2 Infrastructure Mapping — Flowsint Investigation"
date: 2024-07-20
tags: ["GEOINT", "C2", "Infrastructure", "Malware"]
leaflet: true
tldr: "Mapping a malware C2 infrastructure to physical datacenter locations using passive DNS and BGP data."
---

## Overview

This investigation maps a Command & Control (C2) infrastructure cluster to real-world locations using:
- Passive DNS resolution
- BGP AS-path analysis  
- Shodan geolocation
- Physical datacenter correlation

> **Note:** All IPs shown are sanitized/fictional for demonstration.

## Infrastructure Map

{{< osint-map id="c2map" lat="20" lng="0" zoom="2" height="500px" >}}
[
  {"lat": 37.7749, "lng": -122.4194, "label": "C2 Node Alpha", "type": "C2", "ip": "12.34.56.78", "color": "#ff4444", "desc": "Primary C2 — hosted on Vultr San Francisco"},
  {"lat": 51.5074, "lng": -0.1278,   "label": "C2 Node Bravo", "type": "C2", "ip": "87.65.43.21", "color": "#ff4444", "desc": "Secondary C2 — Hetzner London"},
  {"lat": 52.5200, "lng": 13.4050,   "label": "Staging Server", "type": "STAGING", "ip": "192.168.1.1", "color": "#ffcc00", "desc": "Staging — OVH Berlin"},
  {"lat": 1.3521,  "lng": 103.8198,  "label": "Exfil Drop",    "type": "EXFIL",   "ip": "55.66.77.88", "color": "#bc8cff", "desc": "Data exfiltration endpoint — Singapore"},
  {"lat": 15.2993, "lng": 74.1240,   "label": "Investigation Origin", "type": "ANALYST", "ip": "N/A", "color": "#00ff41", "desc": "Analyst location — Goa, India"}
]
{{< /osint-map >}}

## Analysis

### Node Alpha (San Francisco)

Primary C2 communicating with ~169 unique domains (as seen in Flowsint graph above). 
Key relationships:

- **akamai[.]** → RESOLVES → `12.34.56.78`
- **gridlog[.]** → RESOLVES → `12.34.56.78`
- **github[.]** → RESOLVES → `12.34.56.78`

### Attribution Confidence

| Indicator | Confidence |
|-----------|-----------|
| ASN overlap | High |
| Cert fingerprint | Medium |
| Behavioral pattern | High |

## Tools Used

- Flowsint (graph analysis)
- Shodan
- PassiveTotal
- BGPView
