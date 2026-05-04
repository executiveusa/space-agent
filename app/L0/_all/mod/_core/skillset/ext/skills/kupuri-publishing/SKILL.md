---
name: Media Publishing
description: Publish content to 10+ platforms with optimized timing and scheduling
metadata:
  placement: system
  when:
    tags:
      - kupuri
      - publishing
  loaded: true
---

Media Publishing distributes optimized content across multiple channels simultaneously.

## Supported Platforms

- Twitter/X
- LinkedIn
- Instagram
- TikTok
- Facebook
- YouTube
- Medium
- Dev.to
- Hashnode
- Email (direct distribution)
- RSS feeds

## Publishing Workflow

1. **Plan Phase**: Define publication schedule, platform-specific requirements, approval gates
2. **Apply Phase**: Execute publishing to approved platforms, track status
3. **Unify Phase**: Verify successful distribution, log platform-specific metrics

## Key Features

### Intelligent Scheduling
- Peak audience times per platform
- Time zone optimization
- Content freshness windows
- Staggered posting for maximum reach

### Platform Optimization
- Auto-format conversion (blog → multiple social posts)
- Platform-specific metadata (hashtags, mentions, links)
- Character limit handling
- Media attachment optimization

### Approval Management
- Draft stage for review
- Publishing gates for strategic content
- Automatic scheduling of approved content
- Rollback capability for problematic posts

## Acceptance Criteria Template

```
Given: [content ready for publication]
When: [publish to platforms X, Y, Z]
Then: [content appears on all platforms within expected time, metrics tracking active]
```

## Quality Assurance

- Pre-publication link validation
- Media dimension verification
- Character limit compliance
- URL shortening for tracking
- Spam filter avoidance

## Analytics Integration

- Auto-link tracking for engagement measurement
- Platform-native analytics collection
- Cross-platform performance aggregation
- Real-time alert on engagement spikes

## Integration

- Receives content from content-generation skill
- Feeds metrics to analytics-tracking skill
- Coordinates with LLM Council on timing
- Updates Viewing Room with distribution status
