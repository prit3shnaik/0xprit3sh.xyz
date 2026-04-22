---
title: sample
date: 2026-04-22T14:53:00
tags:
  - sample
color: '#00d4ff'
leaflet: true
tldr: ''
status: active
og_image: ''
---

{{< graph id="inv-qx6fw" height="520" >}}

{"nodes":[{"id":"n1","label":"12.34.56.78","type":"ip","color":"#ff4444","shape":"circle","x":380,"y":260,"ip":"12.34.56.78","asn":"AS14618","country":"US","org":"AWS","notes":"Primary C2"},{"id":"n2","label":"c2.mydomain.net","type":"domain","color":"#58a6ff","shape":"circle","x":210,"y":150},{"id":"n3","label":"staging.mydomain.net","type":"domain","color":"#58a6ff","shape":"circle","x":550,"y":150},{"id":"n4","label":"0x4a3b...f91c","type":"wallet","color":"#bc8cff","shape":"diamond","x":210,"y":370,"notes":"ETH — Tornado Cash"},{"id":"n5","label":"@darkhandle","type":"actor","color":"#e8c547","shape":"circle","x":550,"y":370},{"id":"n6","label":"54.75.101.220","type":"ip","color":"#ff4444","shape":"circle","x":120,"y":260,"ip":"54.75.101.220"},{"id":"n7","label":"anon@proton.me","type":"email","color":"#f0883e","shape":"circle","x":380,"y":420}],"edges":[{"from":"n2","to":"n1","label":"RESOLVES","color":"#2a2a2a"},{"from":"n3","to":"n1","label":"RESOLVES","color":"#2a2a2a"},{"from":"n1","to":"n6","label":"CONNECTS","color":"#2a2a2a"},{"from":"n5","to":"n4","label":"OWNS","color":"#2a2a2a"},{"from":"n5","to":"n2","label":"OPERATES","color":"#2a2a2a"},{"from":"n5","to":"n7","label":"USES","color":"#2a2a2a"}]}

{{< /graph >}}
