#!/usr/bin/env python3
import json

with open('/root/clawd-work/portugal_research_recovery.jsonl', 'r') as f:
    content = []
    for line in f:
        try:
            obj = json.loads(line)
            if obj.get('type') == 'message':
                msg = obj.get('message', {})
                role = msg.get('role', 'unknown')
                for item in msg.get('content', []):
                    if item.get('type') == 'text':
                        text = item.get('text', '')
                        if text.strip() and len(text) > 50:
                            content.append(f"[{role.upper()}]\n{text}")
                    elif item.get('type') == 'thinking':
                        thinking = item.get('thinking', '')
                        if ('portugal' in thinking.lower() or 'legal' in thinking.lower()) and len(thinking) > 100:
                            content.append(f"[ANALYSIS]\n{thinking[:1000]}")
        except:
            pass

with open('/root/clawd-work/portugal_legal_entity_research_recovered.md', 'w') as f:
    f.write('# Portugal Legal Entity Research - Recovered from Session\n\n')
    f.write('Recovered from session e22dcc72 (Jan 27, 2026)\n\n')
    f.write('---\n\n')
    for c in content:
        f.write(c + '\n\n---\n\n')

print(f'Recovered {len(content)} content blocks')
