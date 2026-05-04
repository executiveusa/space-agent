---
name: Analytics Tracking
description: Aggregate and monitor performance metrics across all channels
metadata:
  placement: system
  when:
    tags:
      - kupuri
      - analytics
  loaded: true
---

Analytics Tracking aggregates real-time performance data from all distribution channels.

## Tracked Metrics

### Engagement Metrics
- Views / Impressions
- Clicks / Click-through rate (CTR)
- Shares / Re-shares
- Likes / Reactions
- Comments / Replies
- Saves / Bookmarks

### Reach Metrics
- Total reach (unique viewers)
- Geographic distribution
- Demographic breakdown
- Device type distribution
- Referral source analysis

### Conversion Metrics
- Link clicks to target
- Email open rates
- Email click-through rates
- Newsletter signups
- Content downloads

### Platform-Specific Metrics
- YouTube: Watch time, avg view duration, subscriber growth
- LinkedIn: Profile clicks, engagement rate, follower growth
- Twitter: Retweet rate, quote-tweet rate, trend participation
- Email: Open rate, click rate, unsubscribe rate

## Analytics Workflow

1. **Plan Phase**: Define reporting objectives, KPI targets, analysis scope
2. **Apply Phase**: Gather metrics from all platforms, normalize to common format
3. **Unify Phase**: Compare actual vs target KPIs, identify trends and optimization opportunities

## Real-Time Monitoring

- Alert thresholds for unusual engagement (positive or negative)
- Anomaly detection for potential issues
- Trending content identification
- Underperforming content flagging

## Reporting

- Hourly summaries for real-time monitoring
- Daily performance snapshots
- Weekly trend analysis
- Monthly comprehensive reports
- Custom period reports

## Acceptance Criteria Template

```
Given: [content published across platforms]
When: [gather and analyze metrics]
Then: [metrics dashboard updated, KPI analysis complete, trends identified]
```

## Data Sources

- Platform APIs (native analytics)
- UTM parameter tracking
- Email service provider data
- Custom webhook integrations
- Viewing Room state

## Optimization Recommendations

- Content type performance analysis
- Optimal posting times by platform
- Topic trend identification
- Audience interest correlation
- Conversion path optimization

## Integration

- Receives publishing notifications from publishing skill
- Feeds KPI data to LLM Council for strategy adjustments
- Updates Viewing Room with real-time dashboards
- Provides insights for content-generation optimization
