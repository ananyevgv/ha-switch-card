// ha-switch-card.js
// Карточка для коммутаторов GPS/GS серий
// v2.0.0 — Добавлена модель GPS105 (1 Uplink + 4 PoE)

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
    switch_body: '#1a2639',
    switch_body2: '#0f1a2e',
    switch_border: '#2a3a55',
    led_off: '#2a3a4a',
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
    switch_body: '#dce4ec',
    switch_body2: '#c8d6e5',
    switch_border: '#b0c0d0',
    led_off: '#a0b0c0',
  }
};

// ─── Language detection ──────────────────────────────────────────────────
function getSystemLanguage(hass, configLanguage) {
  if (configLanguage && configLanguage !== 'auto') {
    return configLanguage;
  }
  if (hass) {
    if (hass.selectedLanguage) {
      const lang = hass.selectedLanguage.split('-')[0];
      if (SWITCH_TRANSLATIONS[lang]) return lang;
      if (SWITCH_TRANSLATIONS[hass.selectedLanguage]) return hass.selectedLanguage;
    }
    if (hass.language) {
      const lang = hass.language.split('-')[0];
      if (SWITCH_TRANSLATIONS[lang]) return lang;
      if (SWITCH_TRANSLATIONS[hass.language]) return hass.language;
    }
    if (hass.translationMetadata?.language) {
      const lang = hass.translationMetadata.language.split('-')[0];
      if (SWITCH_TRANSLATIONS[lang]) return lang;
    }
  }
  return 'ru';
}

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
  language: 'auto',
  theme: 'auto',
  title: 'GPS105',
  subtitle: 'PoE-коммутатор 4 порта',
  owner_name: 'Smart Home',
  model: 'gps105',
  port_count: 4,
  uplink_ports: [1],
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
  led_on: '#00ff88',
  led_link: '#ffaa00',

  // Display options
  show_greet: true,
  show_status: true,
  show_uptime: true,
  show_temperature: true,
  show_port_labels: true,
  show_port_power: true,
  use_port_icons: true,
  show_leds: true,
  show_switch_body: true,
  show_uplink_badge: true,

  // Entities - common
  voltage_entity: '',
  uptime_entity: '',
  temperature_entity: '',
  
  // LAN1 / Uplink 1
  lan1_link_entity: '',
  lan1_label: 'UPLINK',
  
  // LAN2 / Uplink 2 (опционально)
  lan2_link_entity: '',
  lan2_label: 'UPLINK 2',

  // Entities - ports (до 24)
  port1_link_entity: '', port1_power_entity: '', port1_poe_entity: '',
  port2_link_entity: '', port2_power_entity: '', port2_poe_entity: '',
  port3_link_entity: '', port3_power_entity: '', port3_poe_entity: '',
  port4_link_entity: '', port4_power_entity: '', port4_poe_entity: '',
  port5_link_entity: '', port5_power_entity: '', port5_poe_entity: '',
  port6_link_entity: '', port6_power_entity: '', port6_poe_entity: '',
  port7_link_entity: '', port7_power_entity: '', port7_poe_entity: '',
  port8_link_entity: '', port8_power_entity: '', port8_poe_entity: '',
  port9_link_entity: '', port9_power_entity: '', port9_poe_entity: '',
  port10_link_entity: '', port10_power_entity: '', port10_poe_entity: '',
  port11_link_entity: '', port11_power_entity: '', port11_poe_entity: '',
  port12_link_entity: '', port12_power_entity: '', port12_poe_entity: '',
  port13_link_entity: '', port13_power_entity: '', port13_poe_entity: '',
  port14_link_entity: '', port14_power_entity: '', port14_poe_entity: '',
  port15_link_entity: '', port15_power_entity: '', port15_poe_entity: '',
  port16_link_entity: '', port16_power_entity: '', port16_poe_entity: '',
  port17_link_entity: '', port17_power_entity: '', port17_poe_entity: '',
  port18_link_entity: '', port18_power_entity: '', port18_poe_entity: '',
  port19_link_entity: '', port19_power_entity: '', port19_poe_entity: '',
  port20_link_entity: '', port20_power_entity: '', port20_poe_entity: '',
  port21_link_entity: '', port21_power_entity: '', port21_poe_entity: '',
  port22_link_entity: '', port22_power_entity: '', port22_poe_entity: '',
  port23_link_entity: '', port23_power_entity: '', port23_poe_entity: '',
  port24_link_entity: '', port24_power_entity: '', port24_poe_entity: '',
};

// ─── Model definitions ──────────────────────────────────────────────────
const SWITCH_MODELS = {
  // Модели с 1 Uplink (порт 1)
  gps105: { label: 'GPS105', ports: 4, cols: 5, icon: '🔌', uplink: [1] },
  
  // Модели с 2 Uplink (порты 1, 2)
  gps204: { label: 'GPS204', ports: 4, cols: 2, icon: '🔌', uplink: [1, 2] },
  gps208: { label: 'GPS208', ports: 8, cols: 4, icon: '🔌', uplink: [1, 2] },
  gs105: { label: 'GS105', ports: 5, cols: 5, icon: '🔗', uplink: [5] },
  gs108: { label: 'GS108', ports: 8, cols: 4, icon: '🔗', uplink: [1, 2] },
  
  // Модели с 2 Uplink (16-24 порта)
  'gs116-16p-100m': { label: 'GS116-16P-100M', ports: 16, cols: 4, icon: '🔗', uplink: [1, 2] },
  'gs224-24p-100m': { label: 'GS224-24P-100M', ports: 24, cols: 6, icon: '🔗', uplink: [1, 2] },
  'gs224-24p-gigabit': { label: 'GS224-24P-Gigabit', ports: 24, cols: 6, icon: '🔗', uplink: [1, 2] },
  
  // Модели с 3 Uplink (1 SFP + 2 Gigabit)
  'gs216-2g-1s-16p-100m': { label: 'GS216-2G-1S-16P', ports: 16, cols: 4, icon: '🔗', uplink: [1, 2, 3] },
  'gs224-2g-24p-100m': { label: 'GS224-2G-24P-100M', ports: 24, cols: 6, icon: '🔗', uplink: [1, 2] },
  
  custom: { label: 'Custom', ports: 8, cols: 4, icon: '🔌', uplink: [] },
};

function getModelConfig(model) {
  return SWITCH_MODELS[model] || SWITCH_MODELS.gps208;
}

// ─── CSS ──────────────────────────────────────────────────────────────────
function getSwitchCSS(haTheme, model, portCount) {
  const theme = HA_THEMES[haTheme] || HA_THEMES.dark;
  const isDark = haTheme === 'dark';
  const modelCfg = getModelConfig(model);
  const cols = modelCfg.cols || Math.min(portCount, 6);
  
  return `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :host{display:block;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif}
    .card{background:${switchPresetGradient('default')};border-radius:24px;border:1px solid ${theme.border};
      overflow:hidden;position:relative;box-shadow:${theme.card_shadow},inset 0 1px 0 rgba(255,255,255,0.04)}
    .card::before{content:'';position:absolute;inset:0;pointer-events:none;
      background:radial-gradient(ellipse at 80% 20%,rgba(0,150,255,0.04),transparent 60%)}
    .inner{position:relative;z-index:1;padding:18px 18px 14px}

    .switch-body {
      background: ${isDark ? 'linear-gradient(180deg, #1a2639 0%, #0f1a2e 100%)' : 'linear-gradient(180deg, #e8eef4 0%, #d0d8e0 100%)'};
      border-radius: 16px;
      border: 2px solid ${isDark ? '#2a3a55' : '#b0c0d0'};
      padding: 14px 16px 12px;
      box-shadow: ${isDark ? 
        'inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)' : 
        'inset 0 2px 4px rgba(255,255,255,0.6), 0 4px 12px rgba(0,0,0,0.1)'};
      position: relative;
      transition: all 0.3s;
    }
    .switch-body::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: ${isDark ? 
        'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)' : 
        'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)'};
      pointer-events: none;
      border-radius: 14px 14px 0 0;
    }

    .switch-grill {
      display: flex;
      gap: 3px;
      padding: 2px 0 6px;
      justify-content: center;
      opacity: 0.3;
    }
    .switch-grill span {
      width: 4px;
      height: 12px;
      background: ${isDark ? '#2a3a55' : '#b0c0d0'};
      border-radius: 2px;
    }

    .switch-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      padding: 0 2px;
      position: relative;
      z-index: 1;
    }
    .switch-title-area {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .switch-title {
      font-size: 18px;
      font-weight: 700;
      color: ${isDark ? '#e8f0ff' : '#1a2a4a'};
      letter-spacing: -0.3px;
      text-shadow: ${isDark ? '0 1px 4px rgba(0,0,0,0.5)' : 'none'};
    }
    .switch-sub {
      font-size: 10px;
      color: ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
      font-weight: 400;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .switch-leds {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .switch-led {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .switch-led .led {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transition: all 0.3s;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
    }
    .switch-led .led.on {
      background: var(--led-on, #00ff88);
      box-shadow: 0 0 8px var(--led-on, #00ff88), 0 0 16px rgba(0,255,136,0.2);
    }
    .switch-led .led.off {
      background: ${isDark ? '#2a3a4a' : '#b0b8c0'};
    }
    .switch-led .led.link {
      background: var(--led-link, #ffaa00);
      box-shadow: 0 0 8px var(--led-link, #ffaa00), 0 0 16px rgba(255,170,0,0.2);
    }
    .switch-led .led-label {
      font-size: 7px;
      font-weight: 600;
      color: ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .ports-grid {
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      gap: 4px;
      margin: 6px 0 4px;
      position: relative;
      z-index: 1;
    }
    @media(max-width:450px){
      .ports-grid { grid-template-columns: repeat(${Math.min(cols, 3)}, 1fr); }
    }
    @media(max-width:350px){
      .ports-grid { grid-template-columns: repeat(2, 1fr); }
    }

    .port-card {
      background: ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)'};
      border-radius: 6px;
      padding: 6px 3px 4px;
      border: 1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
      text-align: center;
      transition: all 0.3s;
      position: relative;
      cursor: pointer;
      min-height: 56px;
    }
    .port-card:hover {
      background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'};
      border-color: ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'};
    }
    .port-card.active {
      border-color: var(--cv-port-active, #3b82f6);
      background: ${isDark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.06)'};
    }
    
    .port-card.uplink {
      border-color: ${isDark ? 'rgba(255,170,0,0.3)' : 'rgba(200,150,0,0.3)'};
      background: ${isDark ? 'rgba(255,170,0,0.05)' : 'rgba(255,200,0,0.05)'};
    }
    .port-card.uplink .port-label {
      color: ${isDark ? '#ffaa00' : '#b8860b'};
    }
    .port-card.uplink .port-icon {
      filter: drop-shadow(0 0 4px rgba(255,170,0,0.3));
    }
    
    .port-leds {
      display: flex;
      justify-content: center;
      gap: 3px;
      margin-bottom: 2px;
    }
    .port-led {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      transition: all 0.3s;
    }
    .port-led.link-on {
      background: var(--led-link, #ffaa00);
      box-shadow: 0 0 6px var(--led-link, #ffaa00);
    }
    .port-led.link-off {
      background: ${isDark ? '#2a3a4a' : '#b0b8c0'};
    }
    .port-led.poe-on {
      background: var(--led-on, #00ff88);
      box-shadow: 0 0 6px var(--led-on, #00ff88);
    }
    .port-led.poe-off {
      background: ${isDark ? '#2a3a4a' : '#b0b8c0'};
    }
    .port-led.speed-100 {
      background: #ffaa00;
      box-shadow: 0 0 6px #ffaa00;
    }
    .port-led.speed-1000 {
      background: #00ff88;
      box-shadow: 0 0 6px #00ff88;
    }
    
    .port-card .port-label {
      font-size: 7px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
      margin-bottom: 1px;
    }
    .port-card .port-icon {
      font-size: 14px;
      line-height: 1.2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .port-card .port-speed {
      font-size: 8px;
      font-weight: 700;
      color: ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'};
      margin-top: 1px;
    }
    .port-card .port-speed.empty {
      color: ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'};
    }
    .port-card .port-power {
      font-size: 9px;
      font-weight: 700;
      color: ${isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)'};
      margin-top: 1px;
    }
    .port-card .port-poe {
      font-size: 7px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      display: inline-block;
      margin-top: 1px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .port-card .port-poe.on {
      background: rgba(74,222,128,0.2);
      color: #4ade80;
    }
    .port-card .port-poe.off {
      background: rgba(239,68,68,0.2);
      color: #ef4444;
    }
    .port-card .port-poe.na {
      background: rgba(107,114,128,0.15);
      color: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
      cursor: default;
    }
    .port-card .port-poe.toggling {
      background: rgba(255,255,255,0.1);
      color: #f59e0b;
      animation: pulse 0.5s ease-in-out infinite;
    }

    .info-bar {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin: 6px 0 4px;
      position: relative;
      z-index: 1;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      background: ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'};
      border-radius: 8px;
      border: 1px solid ${theme.border};
      font-size: 10px;
      color: ${theme.text_muted};
      cursor: pointer;
      transition: all 0.2s;
    }
    .info-item:hover {
      background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
      border-color: ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'};
    }
    .info-item .val {
      font-weight: 600;
      color: ${theme.text_secondary};
    }
    .info-item .port-link-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
      cursor: pointer;
    }
    .port-link-dot.green { background: var(--cv-online,#4ade80); box-shadow: 0 0 6px var(--cv-online,#4ade80); }
    .port-link-dot.orange { background: var(--cv-partial,#f59e0b); box-shadow: 0 0 6px var(--cv-partial,#f59e0b); }
    .port-link-dot.red { background: var(--cv-offline,#ef4444); }
    .port-link-dot.off { background: #4b5563; }

    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 10px;
      background: ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'};
      border-radius: 8px;
      border: 1px solid ${theme.border};
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
      position: relative;
      z-index: 1;
    }
    .status-left {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10px;
      color: ${theme.text_muted};
    }
    .status-left .count {
      font-weight: 600;
      color: ${theme.text_secondary};
    }
    .status-right {
      display: flex;
      gap: 10px;
      font-size: 9px;
      color: ${theme.text_muted};
    }
    .status-right .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 3px;
    }
    .dot.green { background: var(--cv-online,#4ade80); }
    .dot.orange { background: var(--cv-partial,#f59e0b); }
    .dot.red { background: var(--cv-offline,#ef4444); }
    .dot.off { background: #6b7280; }

    .footer { display: none; }
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
    this._languageDetected = false;
  }

  static getConfigElement() {
    return document.createElement('switch-card-editor');
  }

  static getStubConfig() {
    return {
      ...SWITCH_DEFAULT_CONFIG,
      model: 'gps105',
      port_count: 4,
      voltage_entity: 'sensor.gps105_voltage',
      uptime_entity: 'sensor.gps105_uptime',
      temperature_entity: 'sensor.gps105_temperature',
      lan1_link_entity: 'sensor.gps105_lan1_link',
    };
  }

  getCardSize() { return 6; }

  get t() {
    let lang = this._config.language || 'ru';
    if (lang === 'auto' && this._hass) {
      lang = getSystemLanguage(this._hass, 'auto');
    }
    return SWITCH_TRANSLATIONS[lang] || SWITCH_TRANSLATIONS.ru;
  }

  _getHATheme() {
    return getHATheme(this._config.theme || 'auto');
  }

  setConfig(config) {
    this._config = { ...SWITCH_DEFAULT_CONFIG, ...config };
    if (!config.port_count) {
      const modelCfg = getModelConfig(this._config.model);
      this._config.port_count = modelCfg.ports || 8;
    }
    if (!config.uplink_ports) {
      const modelCfg = getModelConfig(this._config.model);
      this._config.uplink_ports = modelCfg.uplink || [];
    }
    
    this._haTheme = this._getHATheme();
    this._initialized = false;
    
    if (this._hass) {
      this._config.language = getSystemLanguage(this._hass, this._config.language);
      this._languageDetected = true;
    }
    
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._haTheme = this._getHATheme();
    
    if (!this._languageDetected) {
      this._config.language = getSystemLanguage(hass, this._config.language);
      this._languageDetected = true;
    }
    
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
    if (state === '1.0G' || state === '1000M' || state === '1000') return '1.0G';
    if (state === '100M' || state === '100') return '100M';
    if (state === '10M' || state === '10') return '10M';
    if (state === '2.5G') return '2.5G';
    if (state === '5G') return '5G';
    if (state === '10G') return '10G';
    if (state === 'up' || state === 'on' || state === 'true') return '1.0G';
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
    return val.toFixed(1);
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
      const poeLabel = element.querySelector('.port-poe');
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
          const poeLabel = element.querySelector('.port-poe');
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
    const portCount = cfg.port_count || getModelConfig(model).ports || 8;
    const uplinkPorts = cfg.uplink_ports || [];
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

    // Uplink 1
    const lan1Speed = this._getLinkSpeed(cfg.lan1_link_entity);
    const lan1Label = cfg.lan1_label || 'UPLINK';
    
    // Uplink 2 (опционально)
    const lan2Speed = this._getLinkSpeed(cfg.lan2_link_entity);
    const lan2Label = cfg.lan2_label || 'UPLINK 2';

    const ports = [];
    const maxPorts = Math.min(portCount, 24);
    for (let i = 1; i <= maxPorts; i++) {
      const linkEntity = cfg[`port${i}_link_entity`];
      const powerEntity = cfg[`port${i}_power_entity`];
      const poeEntity = cfg[`port${i}_poe_entity`];
      const speed = this._getLinkSpeed(linkEntity);
      const power = this._getPowerDisplay(powerEntity);
      const poeOn = this._isOn(poeEntity);
      const hasPoe = !!poeEntity;
      const isUplink = uplinkPorts.includes(i);
      ports.push({ id: i, speed, power, linkEntity, powerEntity, poeEntity, poeOn, hasPoe, isUplink });
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
      --led-on: ${cfg.led_on || '#00ff88'};
      --led-link: ${cfg.led_link || '#ffaa00'};
      background: ${bgGrad};
      backdrop-filter: blur(${cfg.bg_blur || 12}px);
      -webkit-backdrop-filter: blur(${cfg.bg_blur || 12}px);
    `;

    // Сборка Uplink информации
    let uplinkHtml = '';
    const uplinkItems = [];
    
    if (cfg.lan1_link_entity) {
      const color = this._getLinkColor(lan1Speed);
      const speedLabel = lan1Speed ? (t.speeds[lan1Speed] || lan1Speed) : '—';
      uplinkItems.push(`
        <span class="info-item" data-entity="${cfg.lan1_link_entity}">
          <span class="port-link-dot ${color}" style="width:6px;height:6px;cursor:pointer" data-entity="${cfg.lan1_link_entity}"></span>
          ${lan1Label} ${speedLabel}
        </span>
      `);
    }
    
    if (cfg.lan2_link_entity) {
      const color = this._getLinkColor(lan2Speed);
      const speedLabel = lan2Speed ? (t.speeds[lan2Speed] || lan2Speed) : '—';
      uplinkItems.push(`
        <span class="info-item" data-entity="${cfg.lan2_link_entity}">
          <span class="port-link-dot ${color}" style="width:6px;height:6px;cursor:pointer" data-entity="${cfg.lan2_link_entity}"></span>
          ${lan2Label} ${speedLabel}
        </span>
      `);
    }
    
    if (uplinkItems.length) {
      uplinkHtml = `<div class="info-bar">${uplinkItems.join('')}</div>`;
    }

    let portsHtml = '';
    ports.forEach((p) => {
      const speedLabel = p.speed ? (t.speeds[p.speed] || p.speed) : '—';
      const isActive = p.speed !== null;
      const icon = isActive ? '🔗' : '⛔';
      const speedClass = isActive ? '' : 'empty';
      const uplinkClass = p.isUplink ? 'uplink' : '';
      const uplinkLabel = p.isUplink ? ' ▲' : '';
      
      let poeHtml = '';
      if (p.hasPoe) {
        const poeClass = p.poeOn ? 'on' : 'off';
        const poeLabel = p.poeOn ? '⚡ON' : '⚡OFF';
        poeHtml = `<div class="port-poe ${poeClass}" data-poe="${p.poeEntity}">${poeLabel}</div>`;
      }

      const ledClasses = isActive ? 'link-on' : 'link-off';
      const poeLedClass = p.hasPoe ? (p.poeOn ? 'poe-on' : 'poe-off') : '';
      const speedLedClass = isActive ? (p.speed === '1.0G' || p.speed === '2.5G' || p.speed === '5G' || p.speed === '10G' ? 'speed-1000' : 'speed-100') : '';

      portsHtml += `
        <div class="port-card ${isActive ? 'active' : ''} ${uplinkClass}" data-entity="${p.linkEntity}" data-poe="${p.poeEntity}" data-power="${p.powerEntity}" data-port="${p.id}">
          <div class="port-leds">
            <span class="port-led ${ledClasses}"></span>
            ${p.hasPoe ? `<span class="port-led ${poeLedClass}"></span>` : ''}
            ${isActive ? `<span class="port-led ${speedLedClass}"></span>` : ''}
          </div>
          <div class="port-label">${t.labels.port} ${p.id}${uplinkLabel}</div>
          <div class="port-icon" data-entity="${p.linkEntity}">${cfg.use_port_icons !== false ? icon : '⚡'}</div>
          <div class="port-speed ${speedClass}" data-entity="${p.linkEntity}">${cfg.show_port_labels !== false ? speedLabel : ''}</div>
          ${cfg.show_port_power !== false && p.hasPoe ? `<div class="port-power" style="color:${isActive ? portColor : themeColors.text_muted}" data-entity="${p.powerEntity}">${p.power}W</div>` : ''}
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

    const grillDots = Array.from({ length: 20 }, () => '<span></span>').join('');

    const html = `
      <style>${getSwitchCSS(haTheme, model, portCount)}</style>
      <div class="card" style="${customCss}">
        <div class="inner">
          <div class="switch-body">
            <div class="switch-grill">${grillDots}</div>
            
            <div class="switch-header">
              <div class="switch-title-area">
                <div class="switch-title">${cfg.title || t.cardTitle}</div>
                <div class="switch-sub">${cfg.subtitle || t.cardSub}</div>
              </div>
              <div class="switch-leds">
                <div class="switch-led">
                  <span class="led ${lan1Speed ? 'on' : 'off'}"></span>
                  <span class="led-label">PWR</span>
                </div>
                <div class="switch-led">
                  <span class="led ${lan2Speed ? 'link' : 'off'}"></span>
                  <span class="led-label">LINK</span>
                </div>
                <div class="switch-led">
                  <span class="led ${voltage !== null ? 'on' : 'off'}"></span>
                  <span class="led-label">POE</span>
                </div>
              </div>
            </div>

            ${infoHtml}
            ${uplinkHtml}

            <div class="ports-grid">
              ${portsHtml}
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
    
    const lang = this._config.language || 'ru';
    const langName = SWITCH_TRANSLATIONS[lang]?.lang || 'Russian';
    
    container.innerHTML = `
      <div style="padding:20px;text-align:center;color:var(--secondary-text-color);font-family:sans-serif;font-size:13px;">
        🔌 Switch Card — настройте сущности в редакторе<br>
        <span style="font-size:11px;color:var(--secondary-text-color);opacity:0.6;">Язык: ${langName}</span>
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
            const parent = el.closest('.port-card');
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
    if (!config.port_count) {
      const modelCfg = getModelConfig(this._config.model);
      this._config.port_count = modelCfg.ports || 8;
    }
    if (!config.uplink_ports) {
      const modelCfg = getModelConfig(this._config.model);
      this._config.uplink_ports = modelCfg.uplink || [];
    }
    this._render();
  }

  set hass(h) {
    this._hass = h;
    this._syncPickers();
  }

  get t() {
    let lang = this._config.language || 'ru';
    if (lang === 'auto' && this._hass) {
      lang = getSystemLanguage(this._hass, 'auto');
    }
    return SWITCH_TRANSLATIONS[lang] || SWITCH_TRANSLATIONS.ru;
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
    const perRow = 4;
    for (let i = start; i < start + count; i++) {
      if ((i - start) % perRow === 0) {
        if (i > start) html += '</div>';
        html += `<div style="display:grid;grid-template-columns:repeat(${Math.min(perRow, count - (i - start))},1fr);gap:6px;margin-bottom:6px;">`;
      }
      html += `
        <div style="background:var(--secondary-background-color);border-radius:6px;padding:6px 8px;border:1px solid var(--divider-color);">
          <div style="font-size:10px;font-weight:700;color:var(--primary-color);margin-bottom:3px;">${prefix} ${i}</div>
          ${this._entityField(`port${i}_link_entity`, '🔗 Link', 'sensor')}
          ${this._entityField(`port${i}_power_entity`, '⚡ Power', 'sensor')}
          ${this._entityField(`port${i}_poe_entity`, '⚡ PoE', 'switch')}
        </div>
      `;
    }
    if (count > 0) html += '</div>';
    return html;
  }

  _render() {
    const cfg = this._config;
    const lang = cfg.language || 'auto';
    const bgP = cfg.background_preset || 'default';
    const model = cfg.model || 'gps105';
    const portCount = cfg.port_count || getModelConfig(model).ports || 4;
    const theme = cfg.theme || 'auto';

    // Определяем текущий язык системы для отображения
    let systemLang = 'ru';
    if (this._hass) {
      systemLang = getSystemLanguage(this._hass, 'auto');
    }
    const systemLangName = SWITCH_TRANSLATIONS[systemLang]?.lang || 'Russian';

    const modelOptions = Object.entries(SWITCH_MODELS).map(([key, val]) => `
      <div class="model-btn ${model === key ? 'on' : ''}" data-model="${key}">
        ${val.label}
        <span class="sub">${val.ports} портов</span>
      </div>
    `).join('');

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
        .row { display:flex;flex-direction:column;margin-bottom:10px; }
        .row:last-child { margin-bottom:0; }
        .row label { font-size:11px;color:var(--secondary-text-color);margin-bottom:3px;font-weight:600; }
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
        .model-selector { display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:6px;margin-bottom:12px; }
        .model-btn {
          padding:8px 6px;border-radius:8px;border:2px solid var(--divider-color);
          cursor:pointer;text-align:center;font-size:12px;font-weight:600;
          background:var(--secondary-background-color);color:var(--primary-text-color);
          transition:all .2s;font-family:inherit;
        }
        .model-btn.on { border-color:var(--primary-color);background:rgba(3,169,244,.08);color:var(--primary-color); }
        .model-btn .sub { font-size:9px;font-weight:400;color:var(--secondary-text-color);display:block;margin-top:1px; }
        .model-btn.on .sub { color:var(--primary-color);opacity:0.7; }
        .port-count-row { display:flex;align-items:center;gap:12px;margin:8px 0 12px; }
        .port-count-row label { font-size:12px;font-weight:600;color:var(--secondary-text-color);min-width:80px; }
        .port-count-row input[type=range] { flex:1;accent-color:var(--primary-color);height:4px;cursor:pointer;max-width:200px; }
        .port-count-row .pcv { font-size:13px;font-weight:700;color:var(--primary-color);min-width:30px; }
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
          <span style="color:var(--secondary-text-color);font-weight:400;">v2.4.0 — GPS105: 1 Uplink + 4 PoE</span>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-lang">
            <ha-icon icon="mdi:translate"></ha-icon> ${this.t.edLang}
            <span class="acc-arrow" id="arrow-lang">${this._open.lang ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-lang" style="display:${this._open.lang ? 'block' : 'none'}">
            <div class="lang-grid">
              <div class="lang-btn ${lang === 'auto' ? 'on' : ''}" data-lang="auto">
                🌐 Системный
                <span style="font-size:9px;color:var(--secondary-text-color);display:block;">${systemLangName}</span>
              </div>
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
            <ha-icon icon="mdi:card-text"></ha-icon> ${this.t.edTitle}
            <span class="acc-arrow" id="arrow-title">${this._open.title ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-title" style="display:${this._open.title ? 'block' : 'none'}">
            <div class="row">
              <label>${this.t.edTitleLabel}</label>
              <input class="txt-inp" type="text" id="inp-title" value="${cfg.title || ''}" placeholder="${this.t.cardTitle}"/>
            </div>
            <div class="row">
              <label>${this.t.edSubtitleLabel}</label>
              <input class="txt-inp" type="text" id="inp-subtitle" value="${cfg.subtitle || ''}" placeholder="${this.t.cardSub}"/>
            </div>
            <div class="row">
              <label>${this.t.edOwnerName}</label>
              <input class="txt-inp" type="text" id="inp-owner" value="${cfg.owner_name || ''}" placeholder="Smart Home"/>
            </div>
            <div style="height:1px;background:var(--divider-color);margin:8px 0;"></div>
            
            <label style="font-size:12px;font-weight:600;color:var(--secondary-text-color);margin-bottom:6px;display:block;">${this.t.edTheme}</label>
            <div class="theme-grid">
              <div class="theme-btn ${theme === 'auto' ? 'on' : ''}" data-theme="auto">
                ${this.t.edThemeAuto}
                <span class="sub">${this.t.edThemeDesc}</span>
              </div>
              <div class="theme-btn ${theme === 'dark' ? 'on' : ''}" data-theme="dark">
                ${this.t.edThemeDark}
                <span class="sub">${this.t.edThemeDesc}</span>
              </div>
              <div class="theme-btn ${theme === 'light' ? 'on' : ''}" data-theme="light">
                ${this.t.edThemeLight}
                <span class="sub">${this.t.edThemeDesc}</span>
              </div>
            </div>
            
            <label style="font-size:12px;font-weight:600;color:var(--secondary-text-color);margin-bottom:6px;display:block;">${this.t.edModel}</label>
            <div class="model-selector">
              ${modelOptions}
            </div>
            <div class="port-count-row">
              <label>Кол-во портов:</label>
              <input type="range" id="inp-port-count" min="4" max="24" step="1" value="${portCount}"/>
              <span class="pcv" id="port-count-lbl">${portCount}</span>
            </div>
            <div class="row">
              <label>Uplink порты (через запятую, например: 1)</label>
              <input class="txt-inp" type="text" id="inp-uplink" value="${(cfg.uplink_ports || []).join(',')}" placeholder="1"/>
            </div>
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-entities">
            <ha-icon icon="mdi:database"></ha-icon> ${this.t.edEntities}
            <span class="acc-arrow" id="arrow-entities">${this._open.entities ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-entities" style="display:${this._open.entities ? 'block' : 'none'}">
            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:8px 0 6px;text-transform:uppercase;">⚡ ${this.t.edVoltage}</div>
            ${this._entityField('voltage_entity', this.t.edVoltage, 'sensor')}

            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:12px 0 6px;text-transform:uppercase;">⏱️ ${this.t.edUptime}</div>
            ${this._entityField('uptime_entity', this.t.edUptime, 'sensor')}

            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:12px 0 6px;text-transform:uppercase;">🌡️ ${this.t.edTemperature}</div>
            ${this._entityField('temperature_entity', this.t.edTemperature, 'sensor')}

            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:12px 0 6px;text-transform:uppercase;">🔗 UPLINK</div>
            ${this._entityField('lan1_link_entity', 'UPLINK 1 (LAN1)', 'sensor')}
            ${this._entityField('lan2_link_entity', 'UPLINK 2 (LAN2) - опционально', 'sensor')}

            <div style="font-size:10px;font-weight:700;color:var(--secondary-text-color);letter-spacing:.5px;margin:12px 0 6px;text-transform:uppercase;">🔌 ${this.t.edPortPrefix}</div>
            ${this._renderPortFields(1, portCount, this.t.edPortPrefix)}
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-bg">
            <ha-icon icon="mdi:palette"></ha-icon> ${this.t.edBg}
            <span class="acc-arrow" id="arrow-bg">${this._open.bg ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-bg" style="display:${this._open.bg ? 'block' : 'none'}">
            <div style="font-size:11px;font-weight:700;color:var(--secondary-text-color);margin-bottom:8px;">${this.t.edBgPresets}</div>
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
                ${this._colorRow('bg_color1', this.t.edColorAccent)}
                ${this._colorRow('bg_color2', this.t.edColorAccent)}
              </div>
            ` : ''}
            <div class="sl-row">
              <label>${this.t.edBgAlpha}</label>
              <input type="range" id="inp-bg-alpha" min="0" max="100" step="1" value="${cfg.bg_alpha !== undefined ? cfg.bg_alpha : 85}"/>
              <span class="slv" id="bg-alpha-lbl">${cfg.bg_alpha !== undefined ? cfg.bg_alpha : 85}%</span>
            </div>
            <div class="sl-row" style="margin-top:4px;">
              <label>${this.t.edBgBlur}</label>
              <input type="range" id="inp-bg-blur" min="0" max="30" step="1" value="${cfg.bg_blur !== undefined ? cfg.bg_blur : 12}"/>
              <span class="slv" id="bg-blur-lbl">${cfg.bg_blur !== undefined ? cfg.bg_blur : 12}px</span>
            </div>
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-colors">
            <ha-icon icon="mdi:palette-swatch"></ha-icon> ${this.t.edColors}
            <span class="acc-arrow" id="arrow-colors">${this._open.colors ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-colors" style="display:${this._open.colors ? 'block' : 'none'}">
            ${this._colorRow('color_online', this.t.edColorOnline)}
            ${this._colorRow('color_offline', this.t.edColorOffline)}
            ${this._colorRow('color_partial', this.t.edColorPartial)}
            ${this._colorRow('color_port_active', this.t.edColorPortActive)}
            ${this._colorRow('color_accent', this.t.edColorAccent)}
            ${this._colorRow('color_text', this.t.edColorText)}
            ${this._colorRow('led_on', 'LED On')}
            ${this._colorRow('led_link', 'LED Link')}
            <button class="reset-btn" id="btn-reset-colors">${this.t.edColorsReset}</button>
          </div>
        </div>

        <div class="acc-wrap">
          <div class="acc-head" id="head-display">
            <ha-icon icon="mdi:eye"></ha-icon> ${this.t.edDisplay}
            <span class="acc-arrow" id="arrow-display">${this._open.display ? '▾' : '▸'}</span>
          </div>
          <div class="acc-body" id="body-display" style="display:${this._open.display ? 'block' : 'none'}">
            ${this._toggleSwitch('show_greet', this.t.edShowGreet, this.t.edShowGreetDesc)}
            ${this._toggleSwitch('show_status', this.t.edShowStatus, '')}
            ${this._toggleSwitch('show_uptime', this.t.edShowUptime, '')}
            ${this._toggleSwitch('show_temperature', this.t.edShowTemperature, '')}
            ${this._toggleSwitch('show_port_labels', this.t.edShowPortLabels, '')}
            ${this._toggleSwitch('show_port_power', this.t.edShowPortPower, '')}
            ${this._toggleSwitch('use_port_icons', this.t.edUseIcons, '')}
            ${this._toggleSwitch('show_leds', 'Показывать LED', 'Светодиоды на портах')}
            ${this._toggleSwitch('show_switch_body', 'Корпус коммутатора', '')}
            ${this._toggleSwitch('show_uplink_badge', 'Показывать Uplink', 'Выделение uplink портов')}
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
        const modelCfg = getModelConfig(btn.dataset.model);
        this._config.port_count = modelCfg.ports;
        this._config.uplink_ports = modelCfg.uplink || [];
        this._fire();
        this._render();
      }));

    const portCountSlider = sr.getElementById('inp-port-count');
    if (portCountSlider) {
      const lbl = sr.getElementById('port-count-lbl');
      portCountSlider.addEventListener('input', () => {
        const val = parseInt(portCountSlider.value);
        if (lbl) lbl.textContent = val;
        this._config.port_count = val;
        this._config.model = 'custom';
        this._fire();
        this._render();
      });
    }

    const uplinkInput = sr.getElementById('inp-uplink');
    if (uplinkInput) {
      uplinkInput.addEventListener('change', () => {
        const val = uplinkInput.value.trim();
        this._config.uplink_ports = val ? val.split(',').map(Number).filter(n => !isNaN(n) && n > 0) : [];
        this._fire();
      });
    }

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
      ['color_online', 'color_offline', 'color_partial', 'color_port_active', 'color_accent', 'color_text', 'led_on', 'led_link'].forEach(k => delete this._config[k]);
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
  name: 'Switch Card (GPS/GS Series)',
  description: 'Professional switch card with physical design, up to 24 ports, PoE control, LED indicators',
  preview: true,
});

console.info(
  '%c 🔌 Switch Card %c v2.0.0 %c ready! (GPS105: 1 Uplink + 4 PoE)',
  'background:#0a1628;color:#00d4ff;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px;font-size:12px',
  'background:#00d4ff;color:#0a1628;font-weight:700;padding:2px 6px;border-radius:0 4px 4px 0;font-size:12px',
  'color:#4ade80;font-weight:400;font-size:11px;margin-left:4px'
);