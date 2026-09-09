import type { Project } from '../../data/projects'
import { cn } from '../../lib/utils'

type ProjectVisualProps = {
  project: Pick<Project, 'name' | 'visual' | 'accent'>
  className?: string
}

const SignalVisual = () => (
  <div className="visual-dashboard visual-dashboard--signal">
    <div className="visual-appbar"><i /><span>Signal / insights</span><b>⋯</b></div>
    <div className="signal-layout">
      <aside><span className="signal-logo">S</span><i /><i /><i /><i /></aside>
      <main>
        <div className="visual-title-row"><span>Research signals</span><small>Last 30 days</small></div>
        <div className="signal-metric-row">
          <div><small>Recurring themes</small><strong>18</strong><em>+4 this week</em></div>
          <div className="signal-ring"><span>84<small>%</small></span></div>
        </div>
        <div className="signal-list">
          <div><i /><span><b>Enterprise setup</b><small>24 mentions</small></span><em>High</em></div>
          <div><i /><span><b>Export flow</b><small>18 mentions</small></span><em>Rising</em></div>
          <div><i /><span><b>Team sharing</b><small>14 mentions</small></span><em>New</em></div>
        </div>
      </main>
    </div>
  </div>
)

const AtlasVisual = () => (
  <div className="visual-dashboard visual-dashboard--atlas">
    <div className="atlas-appbar"><span>Atlas</span><div><i /><i /><i /></div></div>
    <div className="atlas-content">
      <div className="atlas-title"><span>Week 24</span><small>14 — 18 June</small><div className="avatar-stack"><i>A</i><i>J</i><i>M</i></div></div>
      <div className="atlas-columns">
        <div><b>Now <small>03</small></b><article><i className="avatar lavender">N</i><span>Refresh onboarding<small>Today</small></span></article><article><i className="avatar sky">A</i><span>Review signal map<small>Today</small></span></article></div>
        <div><b>Next <small>02</small></b><article><i className="avatar mint">J</i><span>API migration<small>Thu</small></span></article><article><i className="avatar sand">M</i><span>Release notes<small>Fri</small></span></article></div>
        <div><b>Later <small>04</small></b><article><i className="avatar neutral">N</i><span>Metrics review<small>Next week</small></span></article></div>
      </div>
    </div>
  </div>
)

const NorthstarVisual = () => (
  <div className="visual-dashboard visual-dashboard--northstar">
    <div className="northstar-nav"><span>n</span><div>Objects&nbsp;&nbsp;&nbsp; Journal&nbsp;&nbsp;&nbsp; About</div><i>bag (0)</i></div>
    <div className="northstar-product">
      <div className="northstar-product__copy"><span>Objects for<br />slow living</span><small>New collection — 2024</small><b>Explore pieces ↗</b></div>
      <div className="northstar-vase"><div className="vase-shadow" /><div className="vase-shape" /><div className="vase-stem" /></div>
    </div>
    <div className="northstar-footer"><span>01 / 05</span><div><i /><i /><i /><i /></div><span>Designed in Copenhagen</span></div>
  </div>
)

const RelayVisual = () => (
  <div className="visual-dashboard visual-dashboard--relay">
    <div className="relay-sidebar"><b>r.</b><span>overview</span><span>services</span><span className="active">incidents</span><span>traces</span><span>settings</span></div>
    <div className="relay-main">
      <div className="relay-header"><div><small>INCIDENT / 052</small><strong>Checkout latency</strong></div><em>Investigating</em></div>
      <div className="relay-chart"><div className="chart-label"><span>p95 response time</span><b>842ms <i>+128%</i></b></div><svg viewBox="0 0 440 120" preserveAspectRatio="none"><path d="M0 95 C24 85 33 92 59 80 S89 92 112 71 S136 82 157 75 S180 62 198 76 S222 79 238 43 S267 33 282 57 S310 68 329 26 S354 51 370 31 S399 41 440 8" /><path className="chart-fill" d="M0 95 C24 85 33 92 59 80 S89 92 112 71 S136 82 157 75 S180 62 198 76 S222 79 238 43 S267 33 282 57 S310 68 329 26 S354 51 370 31 S399 41 440 8 V120 H0 Z" /></svg><div className="chart-axis"><span>12:00</span><span>12:30</span><span>13:00</span><span>now</span></div></div>
      <div className="relay-events"><span>Timeline</span><div><i /> latency threshold crossed <small>13:04</small></div><div><i /> deployment v2.16.0 <small>12:52</small></div></div>
    </div>
  </div>
)

export const ProjectVisual = ({ project, className }: ProjectVisualProps) => (
  <div className={cn('project-visual', `project-visual--${project.accent}`, className)} aria-hidden="true">
    {project.visual === 'signal' && <SignalVisual />}
    {project.visual === 'atlas' && <AtlasVisual />}
    {project.visual === 'northstar' && <NorthstarVisual />}
    {project.visual === 'relay' && <RelayVisual />}
    <span className="project-visual__reflection" />
    <span className="project-visual__name">{project.name}</span>
  </div>
)
