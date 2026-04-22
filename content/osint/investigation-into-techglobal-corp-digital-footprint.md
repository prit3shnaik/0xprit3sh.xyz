---
title: Investigation into "TechGlobal Corp" Digital Footprint
date: 2026-04-22T15:31:00
tags:
  - '#corporate-recon, #social-engineering, #credential-exposure, #vulnerability-scan'
color: '#00d4ff'
leaflet: true
tldr: Initial reconnaissance identified multiple exposed subdomains and a significant breach of employee credentials on third-party forums.
status: active
og_image: ''
---

**1. Objective**
The goal of this investigation is to map the external attack surface of **TechGlobal Corp** and identify any publicly accessible sensitive data or misconfigured infrastructure. 

Bitsight +1

**2. Methodology**
Our team utilized a combination of passive and semi-passive collection techniques: 

InfoSec Write-ups

- **Domain Analysis:** Used `whois` and `DNSDumpster` to map the corporate domain architecture.
- **Credential Auditing:** Leveraged `HaveIBeenPwned` and `DeHashed` to check for compromised employee accounts.
- **Infrastructure Scanning:** Employed `Shodan` to locate internet-connected devices and open ports. 
InfoSec Write-ups +1

**3. Key Findings**

- **Exposed Assets:** Two unencrypted staging servers were found at `://techglobal.com` and `://techglobal.com`.
- **Social Footprint:** Detailed employee hierarchies were reconstructed using LinkedIn dorking, revealing key IT administration targets.
- **Breach Data:** 12 executive email accounts were found in recent credential dumps with high-confidence password matches. 
Imperva +2

**4. Recommendations**

1. Immediate decommissioning of exposed staging environments.
2. Mandatory password resets and MFA enforcement for all executive staff
























{{< graph id="inv-je5dl" height="520" >}}
3. {"nodes":[{"id":"n1","label":"custom_node","type":"custom","color":"#ff4444","shape":"circle","x":600,"y":338},{"id":"n2","label":"wallet_n2","type":"wallet","color":"#bc8cff","shape":"diamond","x":499,"y":330},{"id":"n3","label":"domain_n3","type":"domain","color":"#58a6ff","shape":"circle","x":457,"y":250},{"id":"n4","label":"email_n4","type":"email","color":"#f0883e","shape":"circle","x":552,"y":279},{"id":"n5","label":"wallet_n5","type":"wallet","color":"#bc8cff","shape":"diamond","x":588,"y":253},{"id":"n6","label":"org_n6","type":"org","color":"#00d4ff","shape":"circle","x":499,"y":237}],"edges":[{"from":"n3","to":"n5","label":"RESOLVES","color":"#aaaaaa"},{"from":"n6","to":"n4","label":"RESOLVES","color":"#aaaaaa"},{"from":"n2","to":"n4","label":"RESOLVES","color":"#aaaaaa"},{"from":"n1","to":"n4","label":"RESOLVES","color":"#aaaaaa"}]}
4. {{< /graph >}}
