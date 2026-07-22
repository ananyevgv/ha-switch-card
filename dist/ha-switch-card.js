// ha-switch-card.js
// Карточка для коммутаторов GPS208 / GPS204
// v1.0.0 — Completely removed footer

import { SWITCH_TRANSLATIONS } from './i18n/index.js';

// ─── Background presets ──────────────────────────────────────────────────
const SWITCH_BG_PRESETS = [
  { id: 'default', label: 'Default', c1: '#0a1628', c2: '#1a2d4a' },
  { id: 'night', label: 'Night', c1: '#0d0d1a', c2: '#1a0a3a' },
  { id: 'ocean', label: 'Ocean', c1: '#001020', c2: '#0055aa' },
  { id: 'deep_neon', label: '🔵 Neon', c1: '#020b18', c2: '#00d4ff' },
  { id: 'slate', label: 'Slate', c1: '#101820', c2: '#445566' },
  { id: 'tech', label: '💻 Tech', c1: '#0a0a1a', c2: '#1a2a4a' },
  { id: 'custom', label: '✏ Custom', c1: null, c2: null },
];

// ─── Theme colors ──────────────────────────────────────────────────────
const HA_THEMES = {
  dark: {
    bg_card: '#1a1a2e',
    bg_card_alt: '#16213e',
    text_primary: '#ffffff',
    text_secondary: 'rgba(255,255,255,0.7)',
    text_muted: 'rgba(255,255,255,0.4)',
    border: 'rgba(255,255,255,0.06)',
    card_shadow: '0 12px 48px rgba(0,0,0,0.5)',
    overlay: 'rgba(0,0,0,0.3)',
  },
  light: {
    bg_card: '#f0f4f8',
    bg_card_alt: '#e2e8f0',
    text_primary: '#1a202c',
    text_secondary: 'rgba(0,0,0,0.7)',
    text_muted: 'rgba(0,0,0,0.4)',
    border: 'rgba(0,0,0,0.08)',
    card_shadow: '0 12px 48px rgba(0,0,0,0.15)',
    overlay: 'rgba(255,255,255,0.3)',
  }
};

function getHATheme(themeSetting) {
  if (themeSetting === 'dark') return 'dark';
  if (themeSetting === 'light') return 'light';
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'dark' : 'light';
}

function switchPresetGradient(preset, c1, c2, alpha, haTheme) {
  const a = (alpha || 85) / 100;
  const p = SWITCH_BG_PRESETS.find(x => x.id === preset) || SWITCH_BG_PRESETS[0];
  let g1 = (preset === 'custom' ? c1 : p.c1) || '#0a1628';
  let g2 = (preset === 'custom' ? c2 : p.c2) || '#1a2d4a';
  
  if (preset === 'default') {
    g1 = haTheme === 'light' ? '#dce4ec' : g1;
    g2 = haTheme === 'light' ? '#c8d6e5' : g2;
  }
  
  return `linear-gradient(145deg, ${g1}${Math.round(a*255).toString(16).padStart(2,'0')} 0%, ${g2}${Math.round(a*255).toString(16).padStart(2,'0')} 100%)`;
}

// ─── DEFAULT CONFIG ──────────────────────────────────────────────────────
const SWITCH_DEFAULT_CONFIG = {
  language: 'ru',
  theme: 'auto',
  title: 'GPS208',
  subtitle: 'Управляемый коммутатор',
  owner_name: 'Smart Home',
  model: 'gps208',
  background_preset: 'default',
  bg_color1: '#0a1628',
  bg_color2: '#1a2d4a',
  bg_alpha: 85,
  bg_blur: 12,

  // Colors
  color_online: '#4ade80',
  color_offline: '#ef4444',
  color_partial: '#f59e0b',
  color_port_active: '#3b82f6',
  color_accent: '#00d4ff',
  color_text: '#ffffff',

  // Display options
  show_greet: true,
  show_status: true,
  show_uptime: true,
  show_temperature: true,
  show_port_labels: true,
  show_port_power: true,
  use_port_icons: true,

  // Entities - common
  voltage_entity: '',
  uptime_entity: '',
  temperature_entity: '',
  lan1_link_entity: '',
  lan1_power_entity: '',
  lan1_poe_entity: '',
  lan2_link_entity: '',
  lan2_power_entity: '',
  lan2_poe_entity: '',

  // Entities - ports
  port1_link_entity: '',
  port1_power_entity: '',
  port1_poe_entity: '',
  port2_link_entity: '',
  port2_power_entity: '',
  port2_poe_entity: '',
  port3_link_entity: '',
  port3_power_entity: '',
  port3_poe_entity: '',
  port4_link_entity: '',
  port4_power_entity: '',
  port4_poe_entity: '',
  port5_link_entity: '',
  port5_power_entity: '',
  port5_poe_entity: '',
  port6_link_entity: '',
  port6_power_entity: '',
  port6_poe_entity: '',
  port7_link_entity: '',
  port7_power_entity: '',
  port7_poe_entity: '',
  port8_link_entity: '',
  port8_power_entity: '',
  port8_poe_entity: '',
};

// ─── CSS ──────────────────────────────────────────────────────────────────
function getSwitchCSS(haTheme) {
  const theme = HA_THEMES[haTheme] || HA_THEMES.dark;
  return `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :host{display:block;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif}
    .card{background:${switchPresetGradient('default')};border-radius:24px;border:1px solid ${theme.border};
      overflow:hidden;position:relative;box-shadow:${theme.card_shadow},inset 0 1px 0 rgba(255,255,255,0.04)}
    .card::before{content:'';position:absolute;inset:0;pointer-events:none;
      background:radial-gradient(ellipse at 80% 20%,rgba(0,150,255,0.04),transparent 60%)}
    .inner{position:relative;z-index:1;padding:18px 18px 14px}

    .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;flex-wrap:wrap;gap:6px}
    .header-left{display:flex;flex-direction:column;gap:2px}
    .header-title{font-size:20px;font-weight:700;color:${theme.text_primary};letter-spacing:-0.3px}
    .header-sub{font-size:11px;color:${theme.text_muted};font-weight:400}
    .header-right{display:flex;flex-direction:column;align-items:flex-end;gap:4px}
    .header-greet{font-size:12px;color:${theme.text_secondary}}
    .header-status{display:flex;align-items:center;gap:6px;padding:4px 12px;border-radius:20px;
      background:${haTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
      border:1px solid ${theme.border};
      font-size:11px;font-weight:600;color:${theme.text_secondary}}
    .header-status .dot{width:6px;height:6px;border-radius:50%;display:inline-block}
    .dot.green{background:var(--cv-online,#4ade80);animation:pulse 2s ease-in-out infinite}
    .dot.orange{background:var(--cv-partial,#f59e0b);animation:pulse 1.5s ease-in-out infinite}
    .dot.red{background:var(--cv-offline,#ef4444);animation:pulse 0.8s ease-in-out infinite}
    .dot.off{background:#6b7280}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}

    .info-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
    .info-item{display:flex;align-items:center;gap:5px;padding:4px 10px;
      background:${haTheme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
      border-radius:10px;border:1px solid ${theme.border};
      font-size:11px;color:${theme.text_muted};cursor:pointer;transition:all 0.2s}
    .info-item:hover{background:${haTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
      border-color:${haTheme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}}
    .info-item .val{font-weight:600;color:${theme.text_secondary}}

    .ports-grid{display:grid;gap:6px;margin-bottom:10px}
    .ports-grid.gps208{grid-template-columns:repeat(4,1fr)}
    .ports-grid.gps204{grid-template-columns:repeat(2,1fr)}
    @media(max-width:450px){.ports-grid.gps208{grid-template-columns:repeat(2,1fr)}}

    .port-card{background:${haTheme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
      border-radius:10px;padding:8px 6px 6px;
      border:1px solid ${theme.border};transition:all 0.3s;text-align:center}
    .port-card:hover{background:${haTheme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
      border-color:${haTheme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}}
    .port-card.active{border-color:var(--cv-port-active,#3b82f6);
      background:${haTheme === 'dark' ? 'rgba(59,130,246,0.06)' : 'rgba(59,130,246,0.08)'}}
    .port-card .port-label{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.3px;
      color:${theme.text_muted};margin-bottom:2px}
    .port-card .port-icon{font-size:18px;line-height:1.4;display:flex;align-items:center;justify-content:center;cursor:pointer}
    .port-card .port-icon:hover{opacity:0.7}
    .port-card .port-speed{font-size:11px;font-weight:700;color:${theme.text_secondary};margin-top:2px;cursor:pointer;padding:2px 4px;border-radius:4px}
    .port-card .port-speed:hover{background:rgba(255,255,255,0.05);opacity:0.8}
    .port-card .port-speed.empty{color:${theme.text_muted};font-weight:400}
    .port-card .port-power{font-size:12px;font-weight:700;margin-top:2px;transition:color 0.3s;cursor:pointer;padding:2px 4px;border-radius:4px}
    .port-card .port-power:hover{background:rgba(255,255,255,0.05);opacity:0.8}
    .port-card .port-poe{font-size:10px;font-weight:700;margin-top:2px;padding:2px 8px;border-radius:4px;display:inline-block;cursor:pointer;transition:all 0.3s;user-select:none}
    .port-poe:hover{transform:scale(1.05)}
    .port-poe.on{background:rgba(74,222,128,0.25);color:#4ade80}
    .port-poe.off{background:rgba(239,68,68,0.25);color:#ef4444}
    .port-poe.na{background:rgba(107,114,128,0.2);color:#6b7280;cursor:default}
    .port-poe.toggling{background:rgba(255,255,255,0.1);color:#f59e0b;animation:pulse 0.5s ease-in-out infinite}

    .port-card .port-link-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin:0 auto 2px;cursor:pointer}
    .port-link-dot:hover{opacity:0.7}
    .port-link-dot.green{background:var(--cv-online,#4ade80);box-shadow:0 0 6px var(--cv-online,#4ade80)}
    .port-link-dot.orange{background:var(--cv-partial,#f59e0b);box-shadow:0 0 6px var(--cv-partial,#f59e0b)}
    .port-link-dot.red{background:var(--cv-offline,#ef4444)}
    .port-link-dot.off{background:#4b5563}

    .poe-indicator{font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;display:inline-block;margin-left:4px;cursor:pointer;transition:all 0.3s}
    .poe-indicator:hover{transform:scale(1.05)}
    .poe-indicator.on{background:rgba(74,222,128,0.25);color:#4ade80}
    .poe-indicator.off{background:rgba(239,68,68,0.25);color:#ef4444}
    .poe-indicator.na{background:rgba(107,114,128,0.2);color:#6b7280;cursor:default}
    .poe-indicator.toggling{background:rgba(255,255,255,0.1);color:#f59e0b;animation:pulse 0.5s ease-in-out infinite}

    .status-bar{display:flex;justify-content:space-between;align-items:center;
      padding:8px 12px;background:${haTheme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
      border-radius:10px;border:1px solid ${theme.border};flex-wrap:wrap;gap:4px}
    .status-left{display:flex;align-items:center;gap:8px;font-size:11px;color:${theme.text_muted}}
    .status-left .count{font-weight:600;color:${theme.text_secondary}}
    .status-right{display:flex;gap:12px;font-size:10px;color:${theme.text_muted}}

    /* ── Footer (полностью убираем) ── */
    .footer{display:none}
  `;
}

// ─── MAIN CARD ────────────────────────────────────────────────────────────
class SwitchCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = { ...SWITCH_DEFAULT_CONFIG };
    this._hass = null;
    this._initialized = false;
    this._interval = null;
    this._haTheme = 'dark';
  }

  static getConfigElement() {
    return document.createElement('switch-card-editor');
  }

  static getStubConfig() {
    return {
      ...SWITCH_DEFAULT_CONFIG,
      model: 'gps208',
      voltage_entity: 'sensor.gps208_voltage',
      uptime_entity: 'sensor.gps208_uptime',
      temperature_entity: 'sensor.gps208_temperature',
      lan1_link_entity: 'sensor.gps208_lan1_link',
      lan1_power_entity: 'sensor.gps208_lan1_power',
      lan1_poe_entity: 'switch.gps208_lan1_poe',
      lan2_link_entity: 'sensor.gps208_lan2_link',
      lan2_power_entity: 'sensor.gps208_lan2_power',
      lan2_poe_entity: 'switch.gps208_lan2_poe',
      port1_link_entity: 'sensor.gps208_1_link',
      port1_power_entity: 'sensor.gps208_1_power',
      port1_poe_entity: 'switch.gps208_1_poe',
      port2_link_entity: 'sensor.gps208_2_link',
      port2_power_entity: 'sensor.gps208_2_power',
      port2_poe_entity: 'switch.gps208_2_poe',
      port3_link_entity: 'sensor.gps208_3_link',
      port3_power_entity: 'sensor.gps208_3_power',
      port3_poe_entity: 'switch.gps208_3_poe',
      port4_link_entity: 'sensor.gps208_4_link',
      port4_power_entity: 'sensor.gps208_4_power',
      port4_poe_entity: 'switch.gps208_4_poe',
      port5_link_entity: 'sensor.gps208_5_link',
      port5_power_entity: 'sensor.gps208_5_power',
      port5_poe_entity: 'switch.gps208_5_poe',
      port6_link_entity: 'sensor.gps208_6_link',
      port6_power_entity: 'sensor.gps208_6_power',
      port6_poe_entity: 'switch.gps208_6_poe',
      port7_link_entity: 'sensor.gps208_7_link',
      port7_power_entity: 'sensor.gps208_7_power',
      port7_poe_entity: 'switch.gps208_7_poe',
      port8_link_entity: 'sensor.gps208_8_link',
      port8_power_entity: 'sensor.gps208_8_power',
      port8_poe_entity: 'switch.gps208_8_poe',
    };
  }

  getCardSize() { return 6; }

  get t() {
    return SWITCH_TRANSLATIONS[this._config.language || 'ru'] || SWITCH_TRANSLATIONS.ru;
  }

  _getHATheme() {
    return getHATheme(this._config.theme || 'auto');
  }

  setConfig(config) {
    this._config = { ...SWITCH_DEFAULT_CONFIG, ...config };
    this._haTheme = this._getHATheme();
    this._initialized = false;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._haTheme = this._getHATheme();
    if (!this._initialized) {
      this._render();
    } else {
      this._update();
    }
  }

  connectedCallback() {
    this._interval = setInterval(() => this._update(), 30000);
    this._mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this._mediaQuery.addEventListener('change', () => {
      if (this._config.theme === 'auto') {
        this._haTheme = this._getHATheme();
        this._update();
      }
    });
  }

  disconnectedCallback() {
    if (this._interval) { clearInterval(this._interval); this._interval = null; }
    if (this._mediaQuery) {
      this._mediaQuery.removeEventListener('change', () => {});
    }
  }

  _state(entityId) {
    if (!entityId || !this._hass?.states) return null;
    return this._hass.states[entityId];
  }

  _getValue(entityId) {
    const s = this._state(entityId);
    if (!s || s.state === 'unavailable' || s.state === 'unknown') return null;
    const v = parseFloat(s.state);
    return isNaN(v) ? null : v;
  }

  _getState(entityId) {
    const s = this._state(entityId);
    return s ? s.state : null;
  }

  _isOn(entityId) {
    const s = this._state(entityId);
    return s ? s.state === 'on' : false;
  }

  _getLinkSpeed(entityId) {
    const state = this._getState(entityId);
    if (state === '1.0G') return '1.0G';
    if (state === '100M') return '100M';
    if (state === '10M') return '10M';
    if (state === '2.5G') return '2.5G';
    if (state === '5G') return '5G';
    if (state === '10G') return '10G';
    return null;
  }

  _getLinkColor(speed) {
    if (!speed) return 'off';
    if (speed === '1.0G' || speed === '2.5G' || speed === '5G' || speed === '10G') return 'green';
    if (speed === '100M') return 'orange';
    return 'red';
  }

  _getPowerDisplay(entityId) {
    const val = this._getValue(entityId);
    if (val === null) return '—';
    if (val === 0) return '0';
    return val.toFixed(0);
  }

  _openMoreInfo(entityId) {
    if (!entityId || !this._hass) return;
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId: entityId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _togglePoE(entityId, element) {
    if (!entityId || !this._hass) return;
    const state = this._state(entityId);
    if (!state) return;
    const domain = entityId.split('.')[0];
    const isOn = state.state === 'on' || state.state === 'true';
    const service = isOn ? 'turn_off' : 'turn_on';
    
    if (element) {
      const poeLabel = element.querySelector('.poe-indicator') || element.querySelector('.port-poe');
      if (poeLabel) {
        poeLabel.textContent = '⏳';
        poeLabel.className = 'port-poe toggling';
      }
    }

    this._hass.callService(domain, service, { entity_id: entityId })
      .then(() => {
        setTimeout(() => this._render(), 500);
      })
      .catch(() => {
        if (element) {
          const poeLabel = element.querySelector('.poe-indicator') || element.querySelector('.port-poe');
          if (poeLabel) {
            poeLabel.textContent = '⚠️';
            poeLabel.className = 'port-poe toggling';
            setTimeout(() => this._render(), 1000);
          }
        }
      });
  }

  _render() {
    if (!this._hass) {
      this._renderUnconfigured();
      return;
    }

    const cfg = this._config;
    const t = this.t;
    const model = cfg.model || 'gps208';
    const portCount = model === 'gps208' ? 8 : 4;
    const haTheme = this._haTheme;
    const themeColors = HA_THEMES[haTheme] || HA_THEMES.dark;

    const onlineColor = cfg.color_online || '#4ade80';
    const offlineColor = cfg.color_offline || '#ef4444';
    const partialColor = cfg.color_partial || '#f59e0b';
    const portColor = cfg.color_port_active || '#3b82f6';
    const accent = cfg.color_accent || '#00d4ff';
    const textColor = cfg.color_text || (haTheme === 'dark' ? '#ffffff' : '#1a202c');

    const bgGrad = switchPresetGradient(cfg.background_preset, cfg.bg_color1, cfg.bg_color2, cfg.bg_alpha, haTheme);

    const voltage = this._getValue(cfg.voltage_entity);
    const uptime = this._getState(cfg.uptime_entity);
    const temperature = this._getValue(cfg.temperature_entity);

    const lan1Speed = this._getLinkSpeed(cfg.lan1_link_entity);
    const lan1Power = this._getPowerDisplay(cfg.lan1_power_entity);
    const lan1Poe = this._isOn(cfg.lan1_poe_entity);
    const lan1HasPoe = !!cfg.lan1_poe_entity;
    const lan1PowerEntity = cfg.lan1_power_entity;
    
    const lan2Speed = this._getLinkSpeed(cfg.lan2_link_entity);
    const lan2Power = this._getPowerDisplay(cfg.lan2_power_entity);
    const lan2Poe = this._isOn(cfg.lan2_poe_entity);
    const lan2HasPoe = !!cfg.lan2_poe_entity;
    const lan2PowerEntity = cfg.lan2_power_entity;

    const ports = [];
    for (let i = 1; i <= portCount; i++) {
      const linkEntity = cfg[`port${i}_link_entity`];
      const powerEntity = cfg[`port${i}_power_entity`];
      const poeEntity = cfg[`port${i}_poe_entity`];
      const speed = this._getLinkSpeed(linkEntity);
      const power = this._getPowerDisplay(powerEntity);
      const poeOn = this._isOn(poeEntity);
      const hasPoe = !!poeEntity;
      ports.push({ id: i, speed, power, linkEntity, powerEntity, poeEntity, poeOn, hasPoe });
    }

    const activePorts = ports.filter(p => p.speed !== null).length;
    const totalPorts = ports.length;
    let statusText = t.status.offline;
    let statusDot = 'off';
    if (activePorts === 0) { statusText = t.status.offline; statusDot = 'off'; }
    else if (activePorts === totalPorts) { statusText = t.status.online; statusDot = 'green'; }
    else { statusText = t.status.partial; statusDot = 'orange'; }

    const customCss = `
      --cv-online: ${onlineColor};
      --cv-offline: ${offlineColor};
      --cv-partial: ${partialColor};
      --cv-port-active: ${portColor};
      --cv-accent: ${accent};
      --cv-text: ${textColor};
      background: ${bgGrad};
      backdrop-filter: blur(${cfg.bg_blur || 12}px);
      -webkit-backdrop-filter: blur(${cfg.bg_blur || 12}px);
    `;

    const buildLanItem = (label, speed, power, poeOn, hasPoe, linkEntity, poeEntity, powerEntity) => {
      const color = this._getLinkColor(speed);
      const speedLabel = speed ? (t.speeds[speed] || speed) : '—';
      const poeClass = hasPoe ? (poeOn ? 'on' : 'off') : 'na';
      const poeLabel = hasPoe ? (poeOn ? '⚡ON' : '⚡OFF') : '';
      
      return `
        <span class="info-item" data-entity="${linkEntity}" data-poe="${poeEntity}" data-power="${powerEntity}" data-label="${label}">
          <span class="port-link-dot ${color}" style="width:6px;height:6px;cursor:pointer" data-entity="${linkEntity}"></span>
          ${label} ${speedLabel}
          ${power && power !== '—' ? `<span class="val" style="cursor:pointer" data-entity="${powerEntity}">· ${power}W</span>` : ''}
          ${poeLabel ? `<span class="poe-indicator ${poeClass}" data-poe="${poeEntity}">${poeLabel}</span>` : ''}
        </span>
      `;
    };

    let portsHtml = '';
    ports.forEach((p) => {
      const speedLabel = p.speed ? (t.speeds[p.speed] || p.speed) : '—';
      const linkColor = this._getLinkColor(p.speed);
      const isActive = p.speed !== null;
      const icon = isActive ? '🔗' : '⛔';
      const powerDisplay = cfg.show_port_power !== false ? p.power : '';
      const speedClass = isActive ? '' : 'empty';
      
      let poeHtml = '';
      if (p.hasPoe) {
        const poeClass = p.poeOn ? 'on' : 'off';
        const poeLabel = p.poeOn ? '⚡ON' : '⚡OFF';
        poeHtml = `<div class="port-poe ${poeClass}" data-poe="${p.poeEntity}">${poeLabel}</div>`;
      }

      portsHtml += `
        <div class="port-card${isActive ? ' active' : ''}" data-entity="${p.linkEntity}" data-poe="${p.poeEntity}" data-power="${p.powerEntity}" data-port="${p.id}">
          <div class="port-label">${t.labels.port} ${p.id}</div>
          <div class="port-icon" data-entity="${p.linkEntity}">${cfg.use_port_icons !== false ? icon : '⚡'}</div>
          <span class="port-link-dot ${linkColor}" data-entity="${p.linkEntity}"></span>
          <div class="port-speed ${speedClass}" data-entity="${p.linkEntity}">${cfg.show_port_labels !== false ? speedLabel : ''}</div>
          ${cfg.show_port_power !== false ? `<div class="port-power" style="color:${isActive ? portColor : themeColors.text_muted}" data-entity="${p.powerEntity}">${powerDisplay}W</div>` : ''}
          ${poeHtml}
        </div>
      `;
    });

    let infoItems = [];
    if (voltage !== null) infoItems.push(`⚡ ${voltage.toFixed(1)}V`);
    if (cfg.show_temperature !== false && temperature !== null) infoItems.push(`🌡️ ${temperature.toFixed(1)}°C`);
    if (cfg.show_uptime !== false && uptime) {
      const uptimeStr = uptime.includes(':') ? uptime : uptime;
      infoItems.push(`⏱️ ${uptimeStr}`);
    }
    if (cfg.show_status !== false) {
      infoItems.push(`📊 ${activePorts}/${totalPorts} ${t.labels.port}`);
    }

    const infoHtml = infoItems.length ? `
      <div class="info-bar">
        ${infoItems.map(item => `<span class="info-item">${item}</span>`).join('')}
      </div>
    ` : '';

    let lanHtml = '';
    const lanItems = [];
    if (cfg.lan1_link_entity) {
      lanItems.push(buildLanItem('LAN1', lan1Speed, lan1Power, lan1Poe, lan1HasPoe, cfg.lan1_link_entity, cfg.lan1_poe_entity, cfg.lan1_power_entity));
    }
    if (cfg.lan2_link_entity) {
      lanItems.push(buildLanItem('LAN2', lan2Speed, lan2Power, lan2Poe, lan2HasPoe, cfg.lan2_link_entity, cfg.lan2_poe_entity, cfg.lan2_power_entity));
    }
    if (lanItems.length) {
      lanHtml = `<div class="info-bar">${lanItems.join('')}</div>`;
    }

    const html = `
      <style>${getSwitchCSS(haTheme)}</style>
      <div class="card" style="${customCss}">
        <div class="inner">
          <div class="header">
            <div class="header-left">
              <div class="header-title">${cfg.title || t.cardTitle}</div>
              <div class="header-sub">${cfg.subtitle || t.cardSub}</div>
            </div>
            <div class="header-right">
              ${cfg.show_greet !== false ? `<div class="header-greet">${t.greet()} ${cfg.owner_name || 'Smart Home'}</div>` : ''}
              ${cfg.show_status !== false ? `
                <div class="header-status">
                  <span class="dot ${statusDot}"></span>
                  ${statusText}
                </div>
              ` : ''}
            </div>
          </div>

          ${infoHtml}
          ${lanHtml}

          <div class="ports-grid ${model}">
            ${portsHtml}
          </div>

          <div class="status-bar">
            <div class="status-left">
              <span class="count">${activePorts}/${totalPorts}</span> ${t.labels.port} ${statusText.toLowerCase()}
            </div>
            <div class="status-right">
              <span>${t.labels.speed}: ${ports.filter(p => p.speed).length ? ports.filter(p => p.speed).map(p => p.speed).join(', ') : '—'}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    let container = this.shadowRoot.querySelector('#switch-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'switch-root';
      this.shadowRoot.appendChild(container);
    }
    container.innerHTML = html;

    this._initialized = true;
    this._bindEvents();
  }

  _renderUnconfigured() {
    let container = this.shadowRoot.querySelector('#switch-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'switch-root';
      this.shadowRoot.appendChild(container);
    }
    container.innerHTML = `
      <div style="padding:20px;text-align:center;color:var(--secondary-text-color);font-family:sans-serif;font-size:13px;">
        🔌 Switch Card — настройте сущности в редакторе
      </div>
    `;
    this._initialized = false;
  }

  _update() {
    if (!this._initialized || !this._hass) return;
    this._haTheme = this._getHATheme();
    this._render();
  }

  _bindEvents() {
    const sr = this.shadowRoot;

    const clickableEntities = sr?.querySelectorAll('[data-entity]');
    if (clickableEntities) {
      clickableEntities.forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const entity = el.dataset.entity;
          if (entity) this._openMoreInfo(entity);
        });
      });
    }

    const powerElements = sr?.querySelectorAll('[data-power]');
    if (powerElements) {
      powerElements.forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const powerEntity = el.dataset.power;
          if (powerEntity) this._openMoreInfo(powerEntity);
        });
      });
    }

    const poeElements = sr?.querySelectorAll('[data-poe]');
    if (poeElements) {
      poeElements.forEach(el => {
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          const poeEntity = el.dataset.poe;
          if (poeEntity) {
            const parent = el.closest('.info-item') || el.closest('.port-card');
            this._togglePoE(poeEntity, parent || el);
          }
        });
      });
    }

    const portCards = sr?.querySelectorAll('.port-card');
    if (portCards) {
      portCards.forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('[data-entity]') || e.target.closest('[data-poe]') || e.target.closest('[data-power]')) {
            return;
          }
          const entity = card.dataset.entity;
          if (entity) this._openMoreInfo(entity);
        });
      });
    }
  }
}

// ─── EDITOR ────────────────────────────────────────────────────────────
class SwitchCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = { ...SWITCH_DEFAULT_CONFIG };
    this._hass = null;
    this._open = { lang: true, title: true, entities: true, colors: false, bg: true, display: false };
    this._picker = null;
  }

  setConfig(config) {
    this._config = { ...SWITCH_DEFAULT_CONFIG, ...config };
    this._render();
  }

  set hass(h) {
    this._hass = h;
    this._syncPickers();
  }

  get t() {
    return SWITCH_TRANSLATIONS[this._config.language || 'ru'] || SWITCH_TRANSLATIONS.ru;
  }

  _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }

  _syncPickers() {
    if (!this._hass || !this.shadowRoot) return;
    const apply = () => {
      this.shadowRoot.querySelectorAll('ha-entity-picker').forEach(p => {
        p.hass = this._hass;
        const domain = p.dataset.domain;
        if (domain) p.includeDomains = domain.split(',');
        const key = p.dataset.key;
        const saved = this._config[key] || '';
        if (saved && p.value !== saved) {
          p.value = saved;
          p.setAttribute('value', saved);
        }
      });
    };
    apply();
    requestAnimationFrame(() => requestAnimationFrame(apply));
  }

  _toggleSection(id) {
    this._open[id] = !this._open[id];
    const body = this.shadowRoot.getElementById('body-' + id);
    const arrow = this.shadowRoot.getElementById('arrow-' + id);
    if (body) {
      body.style.display = this._open[id] ? 'block' : 'none';
      if (arrow) arrow.textContent = this._open[id] ? '▾' : '▸';
      if (this._open[id]) this._syncPickers();
    }
  }

  _colorRow(key, label) {
    const value = this._config[key] || '#ffffff';
    const isOpen = this._picker === key;
    const swatches = ['#4ade80', '#ef4444', '#f59e0b', '#3b82f6', '#00d4ff', '#a78bfa', '#ffffff', '#94a3b8'];
    return `
      <div class="ci">
        <div class="ci-hdr" data-cp="${key}">
          <div class="ci-swatch" style="background:${value};"></div>
          <span class="ci-label">${label}</span>
          <code class="ci-code">${value}</code>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="ci-chv">
            <path d="${isOpen ? 'M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z' : 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'}"/>
          </svg>
        </div>
        ${isOpen ? `
          <div class="ci-body">
            <input type="color" data-cp-native="${key}" value="${value}" class="ci-native"/>
            <div class="ci-hex-wrap">
              <span class="ci-hash">#</span>
              <input type="text" data-cp-hex="${key}" value="${value.replace('#','')}" maxlength="6" placeholder="rrggbb" class="ci-hex-inp"/>
            </div>
            <div class="ci-swatches">
              ${swatches.map(c => `<div data-cp-dot="${key}" data-color="${c}" class="ci-dot"
                style="background:${c};outline:${value === c ? '2px solid var(--primary-color)' : '2px solid transparent'};"></div>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _entityField(key, label, domain) {
    return `
      <div class="row">
        <label>${label}</label>
        <ha-entity-picker data-key="${key}" data-domain="${domain}" allow-custom-entity></ha-entity-picker>
      </div>
    `;
  }

  _toggleSwitch(key, label, desc) {
    const checked = this._config[key] !== false;
    return `
      <div class="disp-row">
        <div class="disp-info">
          <div class="disp-label">${label}</div>
          ${desc ? `<div class="disp-desc">${desc}</div>` : ''}
        </div>
        <label class="tog-wrap">
          <input type="checkbox" class="disp-tog" data-key="${key}" ${checked ? 'checked' : ''}>
          <span class="tog-slider"></span>
        </label>
      </div>
    `;
  }

  _renderPortFields(start, count, prefix) {
    let html = '';
    for (let i = start; i < start + count; i++) {
      html += `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;background:var(--secondary-background-color);border-radius:8px;padding:8px 10px;margin-bottom:6px;border:1px solid var(--divider-color);">
          <div style="grid-column:1/3;font-size:11px;font-weight:700;color:var(--primary-color);">${prefix} ${i}</div>
          ${this._entityField(`port${i}_link_entity`, '🔗 Link', 'sensor')}
          ${this._entityField(`port${i}_power_entity`, '⚡ Power', 'sensor')}
          ${this._entityField(`port${i}_poe_entity`, '⚡ PoE', 'switch')}
        </div>
      `;
    }
    return html;
  }

  _render() {
    const cfg = this._config;
    const t = this.t;
    const lang = cfg.language || 'ru';
    const bgP = cfg.background_preset || 'default';
    const model = cfg.model || 'gps208';
    const portCount = model === 'gps208' ? 8 : 4;
    const theme = cfg.theme || 'auto';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display:block; font-family:var(--primary-font-family,'Inter',sans-serif); }
        .editor { background:var(--card-background-color,#fff); color:var(--primary-text-color); }
        .credit {
          display:flex;align-items:center;gap:8px;padding:12px 16px 8px;
          font-size:12px;color:var(--primary-color);font-weight:500;
          border-bottom:1px solid var(--divider-color);
        }
        .acc-wrap { border-bottom:1px solid var(--divider-color); }
        .acc-head {
          display:flex;align-items:center;gap:10px;padding:14px 16px;cursor:pointer;
          user-select:none;font-size:14px;font-weight:500;color:var(--primary-text-color);
          background:var(--secondary-background-color);
        }
        .acc-head:hover { filter:brightness(.96); }
        .acc-head ha-icon { color:var(--secondary-text-color);--mdi-icon-size:18px; }
        .acc-arrow { margin-left:auto;font-size:14px;color:var(--secondary-text-color); }
        .acc-body { padding:12px 14px;border-top:1px solid var(--divider-color);background:var(--card-background-color,#fff); }
        .row { display:flex;flex-direction:column;margin-bottom:12px; }
        .row:last-child { margin-bottom:0; }
        .row label { font-size:12px;color:var(--secondary-text-color);margin-bottom:4px;font-weight:600; }
        ha-entity-picker { display:block;width:100%; }
        .lang-grid { display:flex;flex-wrap:wrap;gap:6px; }
        .lang-btn {
          display:flex;align-items:center;gap:5px;padding:7px 10px;border-radius:8px;
          border:1.5px solid var(--divider-color);background:var(--secondary-background-color);
          cursor:pointer;font-size:12px;color:var(--primary-text-color);transition:all .2s;
        }
        .lang-btn.on { border-color:var(--primary-color);background:rgba(3,169,244,.12);color:var(--primary-color);font-weight:700; }
        .txt-inp {
          background:var(--input-fill-color,rgba(0,0,0,.04));border:1px solid var(--divider-color);
          border-radius:8px;padding:8px 12px;font-size:13px;color:var(--primary-text-color);
          width:100%;box-sizing:border-box;font-family:inherit;
        }
        .txt-inp:focus { outline:none;border-color:var(--primary-color); }
        .bg-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:10px; }
        .bgs {
          border-radius:7px;height:38px;cursor:pointer;border:2px solid transparent;
          display:flex;align-items:flex-end;padding:3px 5px;font-size:9px;
          color:rgba(255,255,255,.85);text-shadow:0 1px 3px rgba(0,0,0,.9);
          transition:border-color .15s;white-space:nowrap;overflow:hidden;
        }
        .bgs.on { border-color:var(--primary-color); }
        .sl-row { display:flex;align-items:center;gap:10px;margin-top:8px; }
        .sl-row label { font-size:12px;font-weight:600;color:var(--secondary-text-color);min-width:80px; }
        .sl-row input[type=range] { flex:1;accent-color:var(--primary-color);height:4px;cursor:pointer; }
        .slv { font-size:12px;font-weight:700;color:var(--primary-color);min-width:36px;text-align:right; }
        .ci { border:1px solid var(--divider-color);border-radius:8px;overflow:hidden;margin-bottom:8px; }
        .ci:last-child { margin-bottom:0; }
        .ci-hdr { display:flex;align-items:center;gap:10px;padding:10px 12px;cursor:pointer;background:var(--card-background-color,#fff); }
        .ci-swatch { width:24px;height:24px;border-radius:4px;border:1px solid rgba(0,0,0,.1);flex-shrink:0; }
        .ci-label { font-size:13px;flex:1;color:var(--primary-text-color); }
        .ci-code { font-size:11px;color:var(--secondary-text-color);font-family:monospace;background:var(--secondary-background-color);padding:2px 6px;border-radius:3px; }
        .ci-chv { color:var(--secondary-text-color);flex-shrink:0; }
        .ci-body { padding:12px 14px;background:var(--secondary-background-color);border-top:1px solid var(--divider-color);display:flex;flex-direction:column;gap:10px; }
        .ci-native { width:100%;height:44px;border:1px solid var(--divider-color);border-radius:6px;cursor:pointer;padding:2px;background:transparent; }
        .ci-hex-wrap { display:flex;align-items:center;gap:6px;border:1px solid var(--divider-color);border-radius:4px;padding:6px 10px;background:var(--card-background-color,#fff); }
        .ci-hash { color:var(--secondary-text-color);font-size:12px;font-family:monospace; }
        .ci-hex-inp { border:none;outline:none;width:100%;font-size:14px;color:var(--primary-text-color);font-family:monospace;background:transparent; }
        .ci-swatches { display:flex;gap:6px;flex-wrap:wrap; }
        .ci-dot { width:24px;height:24px;border-radius:50%;cursor:pointer;transition:transform .1s;outline-offset:2px; }
        .ci-dot:hover { transform:scale(1.15); }
        .disp-row { display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--divider-color); }
        .disp-row:last-child { border-bottom:none; }
        .disp-info { flex:1;min-width:0; }
        .disp-label { font-size:13px;font-weight:500;color:var(--primary-text-color); }
        .disp-desc { font-size:11px;color:var(--secondary-text-color);margin-top:2px; }
        .tog-wrap { position:relative;width:40px;height:22px;flex-shrink:0;cursor:pointer; }
        .tog-wrap input { opacity:0;width:0;height:0;position:absolute; }
        .tog-slider { position:absolute;inset:0;border-radius:11px;background:var(--divider-color);transition:background .25s; }
        .tog-slider:before { content:'';position:absolute;width:16px;height:16px;border-radius:50%;left:3px;top:3px;background:#fff;transition:transform .25s;box-shadow:0 1px 3px rgba(0,0,0,.3); }
        .tog-wrap input:checked + .tog-slider { background:var(--primary-color); }
        .tog-wrap input:checked + .tog-slider:before { transform:translateX(18px); }
        .reset-btn {
          width:100%;padding:8px;border-radius:7px;border:1px solid var(--divider-color);
          background:transparent;color:var(--secondary-text-color);font-size:12px;
          cursor:pointer;font-family:inherit;margin-top:10px;
        }
        .reset-btn:hover { background:var(--secondary-background-color); }
        .model-selector { display:flex;gap:8px;margin-bottom:12px; }
        .model-btn {
          flex:1;padding:10px;border-radius:10px;border:2px solid var(--divider-color);
          cursor:pointer;text-align:center;font-size:13px;font-weight:600;
          background:var(--secondary-background-color);color:var(--primary-text-color);
          transition:all .2s;font-family:inherit;
        }
        .model-btn.on { border-color:var(--primary-color);background:rgba(3,169,244,.08);color:var(--primary-color); }
        .model-btn .sub { font-size:10px;font-weight:400;color:var(--secondary-text-color);display:block;margin-top:2px; }
        .model-btn.on .sub { color:var(--primary-color);opacity:0.7; }
        .theme-grid { display:flex;gap:8px;margin-bottom:12px; }
        .theme-btn {
          flex:1;padding:10px;border-radius:10px;border:2px solid var(--divider-color);
          cursor:pointer;text-align:center;font-size:13px;font-weight:500;
          background:var(--secondary-background-color);color:var(--primary-text-color);
          transition:all .2s;font-family:inherit;
        }
        .theme-btn.on { border-color:var(--primary-color);background:rgba(3,169,244,.08);color:var(--primary-color); }
        .theme-btn .sub { font-size:10px;font-weight:400;color:var(--secondary-text-color);display:block;margin-top:2px; }
        .theme-btn.on .sub { color:var(--primary-color);opacity:0.7; }
      </style>

      <div class="editor">
        <div class="credit">🔌 <strong>Switch Card</strong>
          <span style="color:var(--secondary-text-color);font-weight:400;">v1.3.9 — Completely removed footer</span>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-lang">
            <ha-icon icon="mdi:translate"></ha-icon> ${t.edLang}
            <span class="acc-arrow" id="arrow-lang">${this._open.lang ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-lang" style="display:${this._open.lang ? 'block' : 'none'}">
            <div class="lang-grid">
              ${Object.entries(SWITCH_TRANSLATIONS).map(([code, tr]) => `
                <div class="lang-btn ${lang === code ? 'on' : ''}" data-lang="${code}">
                  <img src="https://flagcdn.com/20x15/${tr.flag}.png" width="20" height="15" alt="${tr.lang}" style="border-radius:2px;flex-shrink:0;display:block;">
                  ${tr.lang}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-title">
            <ha-icon icon="mdi:card-text"></ha-icon> ${t.edTitle}
            <span class="acc-arrow" id="arrow-title">${this._open.title ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-title" style="display:${this._open.title ? 'block' : 'none'}">
            <div class="row">
              <label>${t.edTitleLabel}</label>
              <input class="txt-inp" type="text" id="inp-title" value="${cfg.title || ''}" placeholder="${t.cardTitle}"/>
            </div>
            <div class="row">
              <label>${t.edSubtitleLabel}</label>
              <input class="txt-inp" type="text" id="inp-subtitle" value="${cfg.subtitle || ''}" placeholder="${t.cardSub}"/>
            </div>
            <div class="row">
              <label>${t.edOwnerName}</label>
              <input class="txt-inp" type="text" id="inp-owner" value="${cfg.owner_name || ''}" placeholder="Smart Home"/>
            </div>
            <div style="height:1px;background:var(--divider-color);margin:8px 0;"></div>
            
            <label style="font-size:12px;font-weight:600;color:var(--secondary-text-color);margin-bottom:6px;display:block;">${t.edTheme}</label>
            <div class="theme-grid">
              <div class="theme-btn ${theme === 'auto' ? 'on' : ''}" data-theme="auto">
                ${t.edThemeAuto}
                <span class="sub">${t.edThemeDesc}</span>
              </div>
              <div class="theme-btn ${theme === 'dark' ? 'on' : ''}" data-theme="dark">
                ${t.edThemeDark}
                <span class="sub">${t.edThemeDesc}</span>
              </div>
              <div class="theme-btn ${theme === 'light' ? 'on' : ''}" data-theme="light">
                ${t.edThemeLight}
                <span class="sub">${t.edThemeDesc}</span>
              </div>
            </div>
            
            <label style="font-size:12px;font-weight:600;color:var(--secondary-text-color);margin-bottom:8px;display:block;">${t.edModel}</label>
            <div class="model-selector">
              <div class="model-btn ${model === 'gps208' ? 'on' : ''}" data-model="gps208">
                ${t.edModelGPS208}
                <span class="sub">8 портов</span>
              </div>
              <div class="model-btn ${model === 'gps204' ? 'on' : ''}" data-model="gps204">
                ${t.edModelGPS204}
                <span class="sub">4 порта</span>
              </div>
            </div>
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-entities">
            <ha-icon icon="mdi:database"></ha-icon> ${t.edEntities}
            <span class="acc-arrow" id="arrow-entities">${this._open.entities ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-entities" style="display:${this._open.entities ? 'block' : 'none'}">
            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:8px 0 6px;text-transform:uppercase;">⚡ ${t.edVoltage}</div>
            ${this._entityField('voltage_entity', t.edVoltage, 'sensor')}

            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:12px 0 6px;text-transform:uppercase;">⏱️ ${t.edUptime}</div>
            ${this._entityField('uptime_entity', t.edUptime, 'sensor')}

            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:12px 0 6px;text-transform:uppercase;">🌡️ ${t.edTemperature}</div>
            ${this._entityField('temperature_entity', t.edTemperature, 'sensor')}

            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:12px 0 6px;text-transform:uppercase;">🌐 LAN</div>
            ${this._entityField('lan1_link_entity', t.edLan1 + ' ' + t.edPortLink, 'sensor')}
            ${this._entityField('lan1_power_entity', t.edLan1 + ' ' + t.edPortPower, 'sensor')}
            ${this._entityField('lan1_poe_entity', t.edLan1 + ' PoE', 'switch')}
            ${this._entityField('lan2_link_entity', t.edLan2 + ' ' + t.edPortLink, 'sensor')}
            ${this._entityField('lan2_power_entity', t.edLan2 + ' ' + t.edPortPower, 'sensor')}
            ${this._entityField('lan2_poe_entity', t.edLan2 + ' PoE', 'switch')}

            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:12px 0 6px;text-transform:uppercase;">🔌 ${t.edPortPrefix}</div>
            ${this._renderPortFields(1, portCount, t.edPortPrefix)}
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-bg">
            <ha-icon icon="mdi:palette"></ha-icon> ${t.edBg}
            <span class="acc-arrow" id="arrow-bg">${this._open.bg ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-bg" style="display:${this._open.bg ? 'block' : 'none'}">
            <div style="font-size:11px;font-weight:700;color:var(--secondary-text-color);margin-bottom:8px;">${t.edBgPresets}</div>
            <div class="bg-grid">
              ${SWITCH_BG_PRESETS.map(p => {
                const c1 = p.c1 || '#888', c2 = p.c2 || '#444';
                const isC = p.id === 'custom';
                return `<div class="bgs ${bgP === p.id ? 'on' : ''}" data-bg="${p.id}"
                  style="${isC ? 'background:linear-gradient(135deg,#e0e0e0,#bdbdbd);color:#555;text-shadow:none;' : 'background:linear-gradient(135deg,' + c1 + 'cc 0%,' + c2 + '55 100%);'}">${p.label}</div>`;
              }).join('')}
            </div>
            ${bgP === 'custom' ? `
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px;">
                ${this._colorRow('bg_color1', t.edColorAccent)}
                ${this._colorRow('bg_color2', t.edColorAccent)}
              </div>
            ` : ''}
            <div class="sl-row">
              <label>${t.edBgAlpha}</label>
              <input type="range" id="inp-bg-alpha" min="0" max="100" step="1" value="${cfg.bg_alpha !== undefined ? cfg.bg_alpha : 85}"/>
              <span class="slv" id="bg-alpha-lbl">${cfg.bg_alpha !== undefined ? cfg.bg_alpha : 85}%</span>
            </div>
            <div class="sl-row" style="margin-top:4px;">
              <label>${t.edBgBlur}</label>
              <input type="range" id="inp-bg-blur" min="0" max="30" step="1" value="${cfg.bg_blur !== undefined ? cfg.bg_blur : 12}"/>
              <span class="slv" id="bg-blur-lbl">${cfg.bg_blur !== undefined ? cfg.bg_blur : 12}px</span>
            </div>
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-colors">
            <ha-icon icon="mdi:palette-swatch"></ha-icon> ${t.edColors}
            <span class="acc-arrow" id="arrow-colors">${this._open.colors ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-colors" style="display:${this._open.colors ? 'block' : 'none'}">
            ${this._colorRow('color_online', t.edColorOnline)}
            ${this._colorRow('color_offline', t.edColorOffline)}
            ${this._colorRow('color_partial', t.edColorPartial)}
            ${this._colorRow('color_port_active', t.edColorPortActive)}
            ${this._colorRow('color_accent', t.edColorAccent)}
            ${this._colorRow('color_text', t.edColorText)}
            <button class="reset-btn" id="btn-reset-colors">${t.edColorsReset}</button>
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-display">
            <ha-icon icon="mdi:eye"></ha-icon> ${t.edDisplay}
            <span class="acc-arrow" id="arrow-display">${this._open.display ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-display" style="display:${this._open.display ? 'block' : 'none'}">
            ${this._toggleSwitch('show_greet', t.edShowGreet, t.edShowGreetDesc)}
            ${this._toggleSwitch('show_status', t.edShowStatus, '')}
            ${this._toggleSwitch('show_uptime', t.edShowUptime, '')}
            ${this._toggleSwitch('show_temperature', t.edShowTemperature, '')}
            ${this._toggleSwitch('show_port_labels', t.edShowPortLabels, '')}
            ${this._toggleSwitch('show_port_power', t.edShowPortPower, '')}
            ${this._toggleSwitch('use_port_icons', t.edUseIcons, '')}
          </div>
        </div>
      </div>
    `;

    this._bindEvents();
    this._syncPickers();
  }

  _bindEvents() {
    const sr = this.shadowRoot;

    ['lang', 'title', 'entities', 'bg', 'colors', 'display'].forEach(id => {
      const hdr = sr.getElementById('head-' + id);
      if (hdr) hdr.addEventListener('click', () => this._toggleSection(id));
    });

    sr.querySelectorAll('[data-lang]').forEach(btn =>
      btn.addEventListener('click', () => {
        this._config.language = btn.dataset.lang;
        this._fire();
        this._render();
      }));

    sr.querySelectorAll('[data-theme]').forEach(btn =>
      btn.addEventListener('click', () => {
        this._config.theme = btn.dataset.theme;
        this._fire();
        this._render();
      }));

    sr.querySelectorAll('[data-model]').forEach(btn =>
      btn.addEventListener('click', () => {
        this._config.model = btn.dataset.model;
        this._fire();
        this._render();
      }));

    const wireText = (id, key) => {
      const el = sr.getElementById(id);
      if (!el) return;
      const commit = () => {
        this._config[key] = el.value.trim();
        this._fire();
      };
      el.addEventListener('change', commit);
      el.addEventListener('blur', commit);
    };
    wireText('inp-title', 'title');
    wireText('inp-subtitle', 'subtitle');
    wireText('inp-owner', 'owner_name');

    sr.querySelectorAll('[data-bg]').forEach(tile =>
      tile.addEventListener('click', () => {
        this._config.background_preset = tile.dataset.bg;
        this._fire();
        this._render();
      }));

    const alphaSlider = sr.getElementById('inp-bg-alpha');
    if (alphaSlider) {
      const lbl = sr.getElementById('bg-alpha-lbl');
      alphaSlider.addEventListener('input', () => {
        if (lbl) lbl.textContent = alphaSlider.value + '%';
        this._config.bg_alpha = parseInt(alphaSlider.value);
        this._fire();
      });
    }

    const blurSlider = sr.getElementById('inp-bg-blur');
    if (blurSlider) {
      const lbl = sr.getElementById('bg-blur-lbl');
      blurSlider.addEventListener('input', () => {
        if (lbl) lbl.textContent = blurSlider.value + 'px';
        this._config.bg_blur = parseInt(blurSlider.value);
        this._fire();
      });
    }

    sr.querySelectorAll('[data-cp]').forEach(hdr =>
      hdr.addEventListener('click', () => {
        this._picker = this._picker === hdr.dataset.cp ? null : hdr.dataset.cp;
        this._render();
      }));

    sr.querySelectorAll('[data-cp-native]').forEach(inp => {
      inp.addEventListener('input', () => {
        const ci = inp.closest('.ci');
        const sw = ci?.querySelector('.ci-swatch');
        const code = ci?.querySelector('.ci-code');
        const hex = sr.querySelector(`[data-cp-hex="${inp.dataset.cpNative}"]`);
        if (sw) sw.style.background = inp.value;
        if (code) code.textContent = inp.value;
        if (hex) hex.value = inp.value.replace('#', '');
        this._config[inp.dataset.cpNative] = inp.value;
        this._fire();
      });
      inp.addEventListener('change', () => {
        this._config[inp.dataset.cpNative] = inp.value;
        this._fire();
        this._render();
      });
    });

    sr.querySelectorAll('[data-cp-hex]').forEach(inp =>
      inp.addEventListener('change', () => {
        const val = '#' + inp.value.replace('#', '');
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
          this._config[inp.dataset.cpHex] = val;
          this._fire();
          this._render();
        }
      }));

    sr.querySelectorAll('[data-cp-dot]').forEach(dot =>
      dot.addEventListener('click', () => {
        this._config[dot.dataset.cpDot] = dot.dataset.color;
        this._fire();
        this._render();
      }));

    const resetBtn = sr.getElementById('btn-reset-colors');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      ['color_online', 'color_offline', 'color_partial', 'color_port_active', 'color_accent', 'color_text'].forEach(k => delete this._config[k]);
      this._fire();
      this._render();
    });

    sr.querySelectorAll('.disp-tog').forEach(tog =>
      tog.addEventListener('change', () => {
        this._config[tog.dataset.key] = tog.checked;
        this._fire();
        this._render();
      }));

    sr.querySelectorAll('ha-entity-picker[data-key]').forEach(picker =>
      picker.addEventListener('value-changed', e => {
        const key = picker.dataset.key;
        const val = e.detail.value;
        const c = { ...this._config };
        if (val) c[key] = val;
        else delete c[key];
        this._config = c;
        this._fire();
      }));
  }
}

// ─── REGISTER ────────────────────────────────────────────────────────────
customElements.define('switch-card', SwitchCard);
customElements.define('switch-card-editor', SwitchCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'switch-card',
  name: 'Switch Card (GPS208/GPS204)',
  description: 'Professional card for GPS208/GPS204 switches with port monitoring, PoE control, clickable power statistics, visual editor, multi-language and HA theme support',
  preview: true,
});

console.info(
  '%c 🔌 Switch Card %c v1.0.0 %c ready! (No footer)',
  'background:#0a1628;color:#00d4ff;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px;font-size:12px',
  'background:#00d4ff;color:#0a1628;font-weight:700;padding:2px 6px;border-radius:0 4px 4px 0;font-size:12px',
  'color:#4ade80;font-weight:400;font-size:11px;margin-left:4px'
);
