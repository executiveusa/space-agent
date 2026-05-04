/**
 * Viewing Room Access Extension for Onscreen Agent
 * 
 * Adds transient context when agent has viewing room access.
 * The Viewing Room is a centralized monitoring and coordination interface
 * where agents can see real-time operational data and coordinate actions.
 * 
 * Loaded dynamically when viewing_room.enabled is true in agent config.
 */

export function buildViewingRoomAccessSection(agentConfig = {}) {
  if (!agentConfig?.viewing_room?.enabled) {
    return "";
  }

  const role = agentConfig?.viewing_room?.role || "observer";
  const canAlert = agentConfig?.viewing_room?.can_alert === true;
  const canCoordinate = agentConfig?.viewing_room?.can_coordinate === true;

  let capabilities = "observation and monitoring";
  const capsList = [];
  
  if (canAlert) capsList.push("alerting");
  if (canCoordinate) capsList.push("coordination");
  
  if (capsList.length > 0) {
    capabilities = capsList.join(" and ");
  }

  return `## Viewing Room Access & Capabilities

You have full access to the **Viewing Room** - a centralized real-time monitoring and coordination interface for multi-agent operations.

### Your Viewing Room Role: ${role}

Your viewing room privileges include: ${capabilities}

#### Monitoring Responsibilities
- **Real-Time Observation**: Monitor active campaigns, content performance, and system metrics
- **Performance Tracking**: Track KPIs across media channels and publishing platforms
- **Anomaly Detection**: Identify unusual patterns, bottlenecks, or emerging issues
- **Status Awareness**: Maintain situational awareness of all Kupuri Media operations
- **Data Collection**: Gather insights for decision-making and strategy refinement

#### Available Data Streams
When accessing the Viewing Room, you can typically see:
- Active content campaigns and their real-time performance
- Publishing pipeline status across all channels
- Engagement metrics and audience analytics
- System health and infrastructure status
- Other agents' current operations and priorities
- Active alerts and issues requiring attention

#### Capabilities & Actions
${canAlert ? `
**Alerting**:
- Flag emerging issues or anomalies requiring attention
- Escalate critical problems to the LLM Council if needed
- Notify relevant agents of opportunities or risks
` : ""}
${canCoordinate ? `
**Coordination**:
- Communicate with other agents monitoring the viewing room
- Coordinate timing of operations to avoid conflicts
- Share insights and recommendations with team members
- Propose adjustments to ongoing operations
` : ""}

#### Coordination Examples
- "Viewing Room shows engagement spike on morning posts. I recommend shifting our afternoon schedule."
- "Alert: Publishing pipeline experiencing delays. Recommend investigating platform API issues."
- "I'm coordinating with Analytics Agent to cross-reference the anomaly we're both seeing in engagement metrics."

#### Best Practices
1. **Regular Checks**: Monitor viewing room during active operations
2. **Data-Driven**: Base decisions on viewing room data and metrics
3. **Collaboration**: Share insights with other monitoring agents
4. **Timely Action**: Act on alerts and opportunities quickly
5. **Communication**: Keep team informed of significant changes or discoveries

### Integration with LLM Council

Insights from the Viewing Room inform council discussions:
- Share performance data when consulting council members
- Report anomalies that may require council-level decisions
- Use viewing room visibility to understand other agents' perspectives
- Coordinate with council members who also have viewing room access

Remember: The Viewing Room is your window into real-time operations. Use it proactively to optimize Kupuri Media performance and catch issues early.`;
}

export default buildViewingRoomAccessSection;
