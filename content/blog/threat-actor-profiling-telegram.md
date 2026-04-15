---
title: "Threat Actor Profiling via Telegram OSINT"
date: 2024-06-15
tags: ["OSINT", "Telegram", "SOCMINT", "Threat Intelligence"]
tldr: "How I identified and profiled a threat actor selling stealer logs using only publicly available Telegram metadata."
---

## Background

During a routine DarkWeb sweep, I encountered a Telegram channel advertising fresh stealer logs.

## Reconnaissance

Initial contact was through a public Telegram group. The operator's handle was `@redacted_handle`.

```python
# Telegram OSINT — metadata extraction
import telethon

async def get_channel_info(client, channel):
    entity = await client.get_entity(channel)
    return {
        'id': entity.id,
        'username': entity.username,
        'first_seen': entity.date,
        'participants': entity.participants_count
    }
```

## Pivot Points

From the channel metadata I identified:

1. **Creation date** correlated with a known data breach
2. **Language patterns** suggested Eastern European origin
3. **Posting schedule** matched UTC+3 timezone

## Conclusion

Using only public metadata — no active engagement — I was able to attribute the actor with high confidence.
