import Icon, { type IconName } from "./ui/Icon";

// Decorative sketches: the actual skills and examples remain in the card text.
export default function SkillIllustration({ domain }: { domain: string }) {
  return (
    <div className={`skill-sketch sketch-${domain}`} aria-hidden="true">
      <div className="sketch-grid" />
      {domain === "frontend" && (
        <div className="sketch-browser sketch-piece">
          <div className="sketch-chrome"><i /><i /><i /><span /></div>
          <div className="sketch-ui">
            <div className="sketch-sidebar"><b /><i /><i /><i /></div>
            <div className="sketch-workspace">
              <span className="sketch-line" />
              <div className="sketch-tiles"><i /><i /><i /></div>
              <span className="sketch-line" /><span className="sketch-line" />
            </div>
          </div>
          <span className="sketch-cursor"><Icon name="arrow" /></span>
        </div>
      )}
      {(domain === "backend" || domain === "architecture") && (
        <div className="sketch-flow">
          {(domain === "backend"
            ? [{ icon: "code", label: "HTTP" }, { icon: "layers", label: "API" }, { icon: "database", label: "SQL" }]
            : [{ icon: "github", label: "CODE" }, { icon: "check", label: "TEST" }, { icon: "layers", label: "DEPLOY" }]
          ).map((node, index) => (
            <div className="sketch-flow-step" key={node.label}>
              {index > 0 && <span className="sketch-connector"><i /></span>}
              <span className="sketch-node sketch-piece">
                <Icon name={node.icon as IconName} />
                <small>{node.label}</small>
              </span>
            </div>
          ))}
        </div>
      )}
      {domain === "leadership" && (
        <div className="sketch-team">
          <span className="sketch-orbit" />
          <span className="sketch-person sketch-piece"><Icon name="code" /></span>
          <span className="sketch-person sketch-person-main sketch-piece">AR<span>↗</span></span>
          <span className="sketch-person sketch-piece"><Icon name="code" /></span>
          <span className="sketch-team-note"><Icon name="message" /><i /><i /></span>
        </div>
      )}
      {domain === "ai" && (
        <div className="sketch-ai-flow">
          <span className="sketch-prompt sketch-piece"><span>↳</span><i /><b /></span>
          <span className="sketch-ai-core sketch-piece"><Icon name="cpu" /></span>
          <span className="sketch-response sketch-piece"><Icon name="check" /><span><i /><i /><i /></span></span>
        </div>
      )}
      {domain === "mobile" && (
        <div className="sketch-phones">
          <div className="sketch-phone sketch-phone-back sketch-piece"><span /><div><i /><i /><i /></div></div>
          <div className="sketch-phone sketch-piece"><span /><Icon name="phone" /><div><i /><i /><i /></div></div>
          <span className="sketch-mobile-badge">Flutter <Icon name="check" /></span>
        </div>
      )}
    </div>
  );
}
