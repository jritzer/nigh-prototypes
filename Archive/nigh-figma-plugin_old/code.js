// ─────────────────────────────────────────────
//  Nigh Drops 2026 · Figma Setup Plugin
//  Creates pages, design system, and screen frames
// ─────────────────────────────────────────────

figma.showUI(__html__, { visible: false });

async function setup() {

  // ── Load fonts ──────────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
    figma.loadFontAsync({ family: 'Inter', style: 'SemiBold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Extra Bold' }),
  ]);

  // ── Color palette ────────────────────────────
  const C = {
    bg:      { r: 0.039, g: 0.039, b: 0.078 }, // #0a0a14
    bgNav:   { r: 0.051, g: 0.051, b: 0.102 }, // #0d0d1a
    card:    { r: 0.110, g: 0.110, b: 0.157 }, // #1c1c28
    blue:    { r: 0.055, g: 0.306, b: 0.961 }, // #0E4EF5
    purple:  { r: 0.384, g: 0.149, b: 0.914 }, // #6226E9
    teal:    { r: 0.255, g: 0.937, b: 0.976 }, // #41EFF9
    magenta: { r: 0.925, g: 0.098, b: 0.467 }, // #EC1977
    green:   { r: 0.290, g: 0.871, b: 0.502 }, // #4ADE80
    amber:   { r: 0.961, g: 0.651, b: 0.137 }, // #F5A623
    red:     { r: 0.937, g: 0.267, b: 0.267 }, // #EF4444
    white:   { r: 1,     g: 1,     b: 1     },
    text2:   { r: 1,     g: 1,     b: 1     }, // opacity handled separately
    text3:   { r: 1,     g: 1,     b: 1     },
  };

  // ── Helpers ──────────────────────────────────

  function solid(color, opacity = 1) {
    return [{ type: 'SOLID', color, opacity }];
  }

  function frame(name, w, h, bg = C.bg, radius = 0) {
    const f = figma.createFrame();
    f.name = name;
    f.resize(w, h);
    f.fills = solid(bg);
    f.cornerRadius = radius;
    f.clipsContent = true;
    return f;
  }

  function rect(w, h, color, opacity = 1, radius = 0) {
    const r = figma.createRectangle();
    r.resize(w, h);
    r.fills = solid(color, opacity);
    r.cornerRadius = radius;
    return r;
  }

  function text(str, size, style, color, opacity = 1) {
    const t = figma.createText();
    t.fontName = { family: 'Inter', style };
    t.characters = str;
    t.fontSize = size;
    t.fills = solid(color, opacity);
    return t;
  }

  function place(node, x, y, parent) {
    node.x = x;
    node.y = y;
    if (parent) parent.appendChild(node);
    return node;
  }

  function hStack(items, gap, parent) {
    let x = 0;
    for (const item of items) {
      item.x = x;
      x += item.width + gap;
      if (parent) parent.appendChild(item);
    }
  }

  function vStack(items, gap, parent) {
    let y = 0;
    for (const item of items) {
      item.y = y;
      y += item.height + gap;
      if (parent) parent.appendChild(item);
    }
  }

  // Create a paint (color) style
  function createColorStyle(name, color, opacity = 1) {
    const style = figma.createPaintStyle();
    style.name = name;
    style.paints = [{ type: 'SOLID', color, opacity }];
    return style;
  }

  // Create a text style
  function createTextStyle(name, size, weight, letterSpacing = 0, lineHeight = null) {
    const style = figma.createTextStyle();
    style.name = name;
    style.fontName = { family: 'Inter', style: weight };
    style.fontSize = size;
    if (letterSpacing) style.letterSpacing = { value: letterSpacing, unit: 'PERCENT' };
    if (lineHeight) style.lineHeight = { value: lineHeight, unit: 'PERCENT' };
    return style;
  }

  // ── Create Pages ─────────────────────────────
  const root = figma.root;

  // Must switch to the first page before removing others
  figma.currentPage = root.children[0];

  // Remove any extra pages from previous runs (keep only 1)
  while (root.children.length > 1) {
    root.children[root.children.length - 1].remove();
  }

  // Rename first page → Cover and clear its contents
  root.children[0].name = 'Cover';
  const coverPage = root.children[0];
  for (const child of [...coverPage.children]) child.remove();

  const pageNames = [
    'Design System',
    'Customer App · Mobile',
    'Customer App · Web',
    'Pro App · Mobile',
    'Pro App · Web',
    'Support App · Web',
  ];

  const pages = { cover: coverPage };
  for (const name of pageNames) {
    const p = figma.createPage();
    p.name = name;
    const key = name.replace(/[^a-z]/gi, '_').toLowerCase();
    pages[key] = p;
  }


  // ════════════════════════════════════════════
  //  COVER PAGE
  // ════════════════════════════════════════════
  figma.currentPage = coverPage;

  const coverFrame = frame('Cover', 1600, 960, C.bg);
  coverPage.appendChild(coverFrame);

  // Background gradient rect (purple glow)
  const glow = rect(900, 900, C.purple, 0.18, 450);
  glow.x = 900;
  glow.y = -200;
  coverFrame.appendChild(glow);

  const glow2 = rect(700, 700, C.blue, 0.12, 350);
  glow2.x = -100;
  glow2.y = 400;
  coverFrame.appendChild(glow2);

  // Title
  const titleNigh = text('Nigh', 96, 'Extra Bold', C.white);
  place(titleNigh, 96, 720, coverFrame);

  const titleDrops = text('Drops', 96, 'Extra Bold', C.purple);
  place(titleDrops, 96 + titleNigh.width + 20, 720, coverFrame);

  const titleYear = text('2026', 96, 'Extra Bold', C.white, 0.15);
  place(titleYear, 96, 820, coverFrame);

  const subtitle = text('Product Design System', 18, 'Medium', C.white, 0.35);
  place(subtitle, 98, 706, coverFrame);

  // Tags
  const tagData = [
    { label: 'Customer App', color: C.purple },
    { label: 'Pro App', color: C.blue },
    { label: 'Support App', color: C.teal },
  ];
  let tagX = 96;
  for (const tag of tagData) {
    const tagBg = rect(140, 32, tag.color, 0.18, 16);
    tagBg.x = tagX;
    tagBg.y = 660;
    coverFrame.appendChild(tagBg);

    const tagLabel = text(tag.label, 11, 'Bold', tag.color);
    tagLabel.x = tagX + (140 - tagLabel.width) / 2;
    tagLabel.y = 660 + (32 - tagLabel.height) / 2;
    coverFrame.appendChild(tagLabel);

    tagX += 152;
  }

  // Meta row
  const metaItems = [
    { label: 'STATUS', value: 'In Progress' },
    { label: 'VERSION', value: 'v1.0' },
    { label: 'UPDATED', value: 'March 2026' },
    { label: 'PLATFORMS', value: 'iOS · Android · Web' },
  ];
  let metaX = 96;
  for (const meta of metaItems) {
    const lbl = text(meta.label, 9, 'Bold', C.white, 0.30);
    lbl.letterSpacing = { value: 10, unit: 'PERCENT' };
    place(lbl, metaX, 888, coverFrame);

    const val = text(meta.value, 13, 'SemiBold', C.white, 0.60);
    place(val, metaX, 904, coverFrame);

    metaX += val.width + 40;
  }

  figma.viewport.scrollAndZoomIntoView([coverFrame]);


  // ════════════════════════════════════════════
  //  DESIGN SYSTEM PAGE
  // ════════════════════════════════════════════
  figma.currentPage = pages['design_system'];

  // ── Create Color Styles ──
  createColorStyle('Nigh/Brand/Purple',  C.purple);
  createColorStyle('Nigh/Brand/Blue',    C.blue);
  createColorStyle('Nigh/Brand/Teal',    C.teal);
  createColorStyle('Nigh/Brand/Magenta', C.magenta);
  createColorStyle('Nigh/Semantic/Green', C.green);
  createColorStyle('Nigh/Semantic/Amber', C.amber);
  createColorStyle('Nigh/Semantic/Red',   C.red);
  createColorStyle('Nigh/Surface/BG',     C.bg);
  createColorStyle('Nigh/Surface/BG Nav', C.bgNav);
  createColorStyle('Nigh/Surface/Card',   C.card);
  createColorStyle('Nigh/Text/Primary',   C.white, 1);
  createColorStyle('Nigh/Text/Secondary', C.white, 0.60);
  createColorStyle('Nigh/Text/Tertiary',  C.white, 0.38);

  // ── Create Text Styles ──
  createTextStyle('Nigh/Display',      32, 'Extra Bold', -2, 110);
  createTextStyle('Nigh/Title Large',  22, 'Extra Bold', -1, 120);
  createTextStyle('Nigh/Title',        18, 'Bold',       -1, 120);
  createTextStyle('Nigh/Body',         14, 'Regular',     0, 160);
  createTextStyle('Nigh/Body Small',   13, 'Regular',     0, 150);
  createTextStyle('Nigh/Label',        11, 'Bold',        8, 100);
  createTextStyle('Nigh/Caption',      10, 'Bold',       10, 100);

  // ── Color Swatches Frame ──
  const dsFrame = frame('Design System', 1400, 2200, C.bg);
  dsFrame.x = 0;
  dsFrame.y = 0;
  pages['design_system'].appendChild(dsFrame);

  // Section: Colors
  const colorTitle = text('COLOR TOKENS', 11, 'Bold', C.white, 0.35);
  colorTitle.letterSpacing = { value: 12, unit: 'PERCENT' };
  place(colorTitle, 64, 64, dsFrame);

  const colorTokens = [
    { name: 'Purple',  val: '#6226E9', color: C.purple },
    { name: 'Blue',    val: '#0E4EF5', color: C.blue },
    { name: 'Teal',    val: '#41EFF9', color: C.teal },
    { name: 'Magenta', val: '#EC1977', color: C.magenta },
    { name: 'Green',   val: '#4ADE80', color: C.green },
    { name: 'Amber',   val: '#F5A623', color: C.amber },
    { name: 'Red',     val: '#EF4444', color: C.red },
    { name: 'BG',      val: '#0a0a14', color: C.bg },
    { name: 'Card',    val: '#1c1c28', color: C.card },
  ];

  let swatchX = 64;
  for (const token of colorTokens) {
    const swatch = rect(80, 80, token.color, 1, 14);
    swatch.strokes = [{ type: 'SOLID', color: C.white, opacity: 0.08 }];
    swatch.strokeWeight = 1;
    place(swatch, swatchX, 90, dsFrame);

    const nameLabel = text(token.name, 11, 'Bold', C.white);
    place(nameLabel, swatchX, 178, dsFrame);

    const hexLabel = text(token.val, 10, 'Regular', C.white, 0.38);
    place(hexLabel, swatchX, 193, dsFrame);

    swatchX += 96;
  }

  // Section: Typography
  const typoTitle = text('TYPOGRAPHY', 11, 'Bold', C.white, 0.35);
  typoTitle.letterSpacing = { value: 12, unit: 'PERCENT' };
  place(typoTitle, 64, 256, dsFrame);

  const divider1 = rect(1280, 1, C.white, 0.08);
  place(divider1, 64, 275, dsFrame);

  const typeScales = [
    { label: 'Display',     spec: '32px · Extra Bold · -2% tracking', sample: 'Drop Ends in 3:45', size: 32, style: 'Extra Bold' },
    { label: 'Title Large', spec: '22px · Extra Bold · -1% tracking',  sample: 'Friday Night Jazz & Tapas', size: 22, style: 'Extra Bold' },
    { label: 'Title',       spec: '18px · Bold · -1% tracking',        sample: 'Centro Mexican Kitchen', size: 18, style: 'Bold' },
    { label: 'Body',        spec: '14px · Regular · 160% line height',  sample: 'Exclusive chef\'s tastings and private events.', size: 14, style: 'Regular' },
    { label: 'Label',       spec: '11px · Bold · 8% tracking · UPPERCASE', sample: 'LIVE NOW · AVAILABLE', size: 11, style: 'Bold' },
    { label: 'Caption',     spec: '10px · Bold · 10% tracking',        sample: 'March 13 · 7:00 PM', size: 10, style: 'Bold' },
  ];

  let typoY = 285;
  for (const scale of typeScales) {
    const lbl = text(scale.label, 10, 'Bold', C.white, 0.35);
    place(lbl, 64, typoY + 8, dsFrame);

    const spec = text(scale.spec, 9, 'Regular', C.white, 0.25);
    place(spec, 64, typoY + 22, dsFrame);

    const sampleText = text(scale.sample, scale.size, scale.style, C.white);
    place(sampleText, 260, typoY, dsFrame);

    typoY += Math.max(50, sampleText.height + 20);

    const div = rect(1280, 1, C.white, 0.06);
    place(div, 64, typoY, dsFrame);
    typoY += 1;
  }

  // Section: Border Radius
  const radiusTitle = text('BORDER RADIUS', 11, 'Bold', C.white, 0.35);
  radiusTitle.letterSpacing = { value: 12, unit: 'PERCENT' };
  place(radiusTitle, 64, typoY + 32, dsFrame);

  const radii = [
    { label: 'Small',   val: '6px',    r: 6 },
    { label: 'Default', val: '8px',    r: 8 },
    { label: 'Medium',  val: '10px',   r: 10 },
    { label: 'Large',   val: '12px',   r: 12 },
    { label: 'Card',    val: '14px',   r: 14 },
    { label: 'Card+',   val: '16px',   r: 16 },
    { label: 'Pill',    val: '9999px', r: 9999 },
  ];

  let radiusX = 64;
  const radiusY = typoY + 56;
  for (const r of radii) {
    const box = rect(72, 72, C.card, 1, r.r);
    box.strokes = [{ type: 'SOLID', color: C.white, opacity: 0.08 }];
    box.strokeWeight = 1;
    place(box, radiusX, radiusY, dsFrame);

    const rLabel = text(r.label, 10, 'Bold', C.white);
    place(rLabel, radiusX, radiusY + 78, dsFrame);

    const rVal = text(r.val, 9, 'Regular', C.white, 0.35);
    place(rVal, radiusX, radiusY + 92, dsFrame);

    radiusX += 96;
  }

  // Section: Buttons
  const btnTitle = text('BUTTONS', 11, 'Bold', C.white, 0.35);
  btnTitle.letterSpacing = { value: 12, unit: 'PERCENT' };
  place(btnTitle, 64, radiusY + 130, dsFrame);

  const buttons = [
    { label: 'Get Tickets · $45', bg: C.blue,    textC: C.white, r: 12, size: 15, style: 'Bold', px: 24, py: 14 },
    { label: 'Follow',            bg: C.blue,    textC: C.white, r: 8,  size: 13, style: 'Bold', px: 20, py: 9  },
    { label: 'Following',         bg: C.card,    textC: C.white, r: 8,  size: 13, style: 'Bold', px: 20, py: 9, opacity: 1 },
    { label: 'Open in App',       bg: C.card,    textC: C.white, r: 12, size: 13, style: 'SemiBold', px: 20, py: 13, opacity: 0.6 },
  ];

  let btnX = 64;
  const btnY = radiusY + 152;
  for (const btn of buttons) {
    const btnLabel = text(btn.label, btn.size, btn.style, btn.textC, btn.opacity || 1);
    const btnW = btnLabel.width + btn.px * 2;
    const btnH = btnLabel.height + btn.py * 2;

    const btnBg = rect(btnW, btnH, btn.bg, 1, btn.r);
    place(btnBg, btnX, btnY, dsFrame);

    btnLabel.x = btnX + btn.px;
    btnLabel.y = btnY + btn.py;
    dsFrame.appendChild(btnLabel);

    btnX += btnW + 16;
  }


  // ════════════════════════════════════════════
  //  CUSTOMER APP · MOBILE
  // ════════════════════════════════════════════
  figma.currentPage = pages['customer_app___mobile'];

  const mobileScreens = [
    {
      name: 'Feed',
      sections: [
        { type: 'header', title: 'Nigh Drops', sub: 'Boulder, CO' },
        { type: 'card', title: 'Friday Night Jazz & Tapas', sub: 'Centro Mexican Kitchen · $45 · Fri Mar 13', badge: 'LIVE', badgeColor: C.green },
        { type: 'card', title: 'Nike Air Max Day Access', sub: 'Nike Boulder · Free · Sat Mar 14', badge: 'UPCOMING', badgeColor: C.blue },
        { type: 'card', title: 'Whole Foods Chef\'s Table', sub: 'Whole Foods · $65 · Sun Mar 15', badge: 'UPCOMING', badgeColor: C.blue },
      ],
    },
    {
      name: 'Tickets',
      sections: [
        { type: 'header', title: 'My Tickets', sub: '' },
        { type: 'card', title: 'Friday Night Jazz & Tapas', sub: 'Centro Mexican Kitchen · Fri Mar 13 · 7:00 PM', badge: 'UPCOMING', badgeColor: C.blue },
      ],
    },
    {
      name: 'Ticket Detail',
      sections: [
        { type: 'header', title: 'Ticket', sub: '' },
        { type: 'ticketCard', title: 'Friday Night Jazz & Tapas', sub: 'Centro Mexican Kitchen\n1800 29th St, Boulder, CO\nReserved for Alex Rivera' },
      ],
    },
    {
      name: 'Alerts',
      sections: [
        { type: 'header', title: 'Alerts', sub: '' },
        { type: 'alertRow', title: 'Centro Mexican Kitchen just dropped!', sub: '2 min ago' },
        { type: 'alertRow', title: 'Your ticket transfer was accepted', sub: '1 hour ago' },
      ],
    },
    {
      name: 'Transfer',
      sections: [
        { type: 'header', title: 'Transfer Ticket', sub: '' },
        { type: 'card', title: 'Friday Night Jazz & Tapas', sub: 'Centro Mexican Kitchen · Fri Mar 13', badge: '', badgeColor: C.card },
        { type: 'inputRow', label: 'Send to', placeholder: 'Email or @handle' },
      ],
    },
    {
      name: 'Pro Profile',
      sections: [
        { type: 'profileHeader', name: 'Nike Boulder', handle: '@nikeboulder', cat: 'Retail' },
        { type: 'infoCard', rows: ['1800 29th St, Boulder, CO', '(303) 555-0175', 'nike.com/boulder'] },
        { type: 'card', title: 'Nike Air Max Day Access', sub: 'Sat Mar 14 · Free', badge: 'LIVE', badgeColor: C.green },
      ],
    },
  ];

  let mobileX = 0;
  for (const screen of mobileScreens) {
    const f = frame(screen.name, 390, 844, C.bg);
    f.x = mobileX;
    f.y = 0;
    pages['customer_app___mobile'].appendChild(f);

    // Status bar
    const statusBar = rect(390, 44, C.bgNav, 1);
    f.appendChild(statusBar);
    const timeText = text('9:41', 15, 'SemiBold', C.white);
    place(timeText, 20, 12, f);

    let contentY = 44;

    for (const section of screen.sections) {
      if (section.type === 'header') {
        const hdr = rect(390, 64, C.bgNav, 1);
        place(hdr, 0, contentY, f);

        const hTitle = text(section.title, 17, 'Bold', C.white);
        place(hTitle, 16, contentY + 14, f);

        if (section.sub) {
          const hSub = text(section.sub, 11, 'Regular', C.white, 0.38);
          place(hSub, 16, contentY + 36, f);
        }
        contentY += 64;

      } else if (section.type === 'card') {
        const card = rect(358, 88, C.card, 1, 14);
        card.strokes = [{ type: 'SOLID', color: C.white, opacity: 0.08 }];
        card.strokeWeight = 1;
        place(card, 16, contentY + 12, f);

        if (section.badge) {
          const badge = rect(70, 20, section.badgeColor, 0.15, 10);
          place(badge, 30, contentY + 22, f);
          const badgeText = text(section.badge, 9, 'Bold', section.badgeColor);
          badgeText.letterSpacing = { value: 5, unit: 'PERCENT' };
          place(badgeText, 30 + (70 - badgeText.width) / 2, contentY + 27, f);
        }

        const cardTitle = text(section.title, 14, 'Bold', C.white);
        place(cardTitle, 30, contentY + 50, f);

        const cardSub = text(section.sub, 11, 'Regular', C.white, 0.38);
        place(cardSub, 30, contentY + 70, f);

        contentY += 112;

      } else if (section.type === 'ticketCard') {
        const card = rect(358, 220, C.card, 1, 16);
        place(card, 16, contentY + 12, f);

        const heroGrad = rect(358, 110, C.purple, 0.15, 0);
        place(heroGrad, 16, contentY + 12, f);

        const tTitle = text(section.title, 16, 'Bold', C.white);
        place(tTitle, 32, contentY + 136, f);

        const tSub = text(section.sub, 11, 'Regular', C.white, 0.50);
        tSub.textAutoResize = 'HEIGHT';
        place(tSub, 32, contentY + 158, f);

        contentY += 244;

      } else if (section.type === 'alertRow') {
        const alertBg = rect(358, 60, C.card, 1, 12);
        place(alertBg, 16, contentY + 8, f);

        const dot = rect(8, 8, C.blue, 1, 4);
        place(dot, 28, contentY + 26, f);

        const alertTitle = text(section.title, 13, 'SemiBold', C.white);
        place(alertTitle, 46, contentY + 18, f);

        const alertSub = text(section.sub, 10, 'Regular', C.white, 0.38);
        place(alertSub, 46, contentY + 36, f);

        contentY += 76;

      } else if (section.type === 'inputRow') {
        const inputBg = rect(358, 48, C.card, 1, 10);
        inputBg.strokes = [{ type: 'SOLID', color: C.white, opacity: 0.08 }];
        inputBg.strokeWeight = 1;
        place(inputBg, 16, contentY + 8, f);

        const inputLabel = text(section.label, 10, 'Bold', C.white, 0.35);
        inputLabel.letterSpacing = { value: 8, unit: 'PERCENT' };
        place(inputLabel, 28, contentY + 14, f);

        const inputPlaceholder = text(section.placeholder, 13, 'Regular', C.white, 0.25);
        place(inputPlaceholder, 28, contentY + 28, f);

        contentY += 72;

      } else if (section.type === 'profileHeader') {
        const avatarBg = rect(64, 64, C.purple, 1, 14);
        place(avatarBg, 16, contentY + 16, f);

        const avatarText = text(section.name.substring(0, 2).toUpperCase(), 22, 'Extra Bold', C.white);
        place(avatarText, 16 + (64 - avatarText.width) / 2, contentY + 32, f);

        const pName = text(section.name, 18, 'Extra Bold', C.white);
        place(pName, 92, contentY + 20, f);

        const pHandle = text(section.handle, 12, 'Regular', C.white, 0.38);
        place(pHandle, 92, contentY + 42, f);

        const pCat = text(section.cat, 11, 'SemiBold', C.white, 0.38);
        place(pCat, 92, contentY + 60, f);

        contentY += 100;

      } else if (section.type === 'infoCard') {
        const ic = rect(358, section.rows.length * 38, C.card, 1, 12);
        ic.strokes = [{ type: 'SOLID', color: C.white, opacity: 0.08 }];
        ic.strokeWeight = 1;
        place(ic, 16, contentY + 8, f);

        for (let i = 0; i < section.rows.length; i++) {
          const rowText = text(section.rows[i], 13, 'Regular', C.white);
          place(rowText, 28, contentY + 17 + i * 38, f);
        }

        contentY += section.rows.length * 38 + 20;
      }
    }

    // Tab bar
    const tabBar = rect(390, 64, C.bgNav, 1);
    place(tabBar, 0, 780, f);

    const tabDivider = rect(390, 1, C.white, 0.08);
    place(tabDivider, 0, 780, f);

    const tabs = ['Drops', 'Tickets', 'Alerts', 'Menu'];
    const activeTab = screen.name === 'Feed' ? 0 : screen.name === 'Tickets' || screen.name === 'Ticket Detail' || screen.name === 'Transfer' ? 1 : screen.name === 'Alerts' ? 2 : 3;
    for (let i = 0; i < tabs.length; i++) {
      const tabLabel = text(tabs[i], 9, 'SemiBold', i === activeTab ? C.blue : C.white, i === activeTab ? 1 : 0.35);
      tabLabel.letterSpacing = { value: 4, unit: 'PERCENT' };
      tabLabel.x = i * 97 + (97 - tabLabel.width) / 2;
      tabLabel.y = 835;
      f.appendChild(tabLabel);
    }

    mobileX += 414;
  }


  // ════════════════════════════════════════════
  //  CUSTOMER APP · WEB  (placeholder)
  // ════════════════════════════════════════════
  figma.currentPage = pages['customer_app___web'];

  const webScreens = [
    'Pro Profile · Centro',
    'Drop Landing · Centro',
    'User Flow',
  ];

  let webX = 0;
  for (const name of webScreens) {
    const f = frame(name, 1440, 900, C.bg);
    f.x = webX;
    f.y = 0;

    // Nav bar
    const nav = rect(1440, 56, C.bgNav, 1);
    f.appendChild(nav);

    const navTitle = text('Nigh Drops', 16, 'Bold', C.blue);
    place(navTitle, 24, 18, f);

    const pageLabel = text(name, 24, 'Extra Bold', C.white, 0.15);
    place(pageLabel, 560, 420, f);

    const pageSub = text('Add content from HTML prototype', 14, 'Regular', C.white, 0.20);
    place(pageSub, 610, 456, f);

    pages['customer_app___web'].appendChild(f);
    webX += 1480;
  }


  // ════════════════════════════════════════════
  //  PRO APP · MOBILE  (placeholder)
  // ════════════════════════════════════════════
  figma.currentPage = pages['pro_app___mobile'];

  const proMobileScreens = ['Dashboard', 'Create Drop', 'Drop Analytics', 'Scan Tickets', 'Settings'];
  let proMobileX = 0;
  for (const name of proMobileScreens) {
    const f = frame(name, 390, 844, C.bg);
    f.x = proMobileX;
    f.y = 0;

    const statusBar = rect(390, 44, C.bgNav);
    f.appendChild(statusBar);

    const timeText = text('9:41', 15, 'SemiBold', C.white);
    place(timeText, 20, 12, f);

    const hdr = rect(390, 64, C.bgNav);
    place(hdr, 0, 44, f);

    const hTitle = text(name, 17, 'Bold', C.white);
    place(hTitle, 16, 58, f);

    const placeholder = text('Pro · ' + name, 22, 'Extra Bold', C.white, 0.08);
    place(placeholder, 195 - placeholder.width / 2, 400, f);

    const tabBar = rect(390, 64, C.bgNav);
    place(tabBar, 0, 780, f);
    const tabDivider = rect(390, 1, C.white, 0.08);
    place(tabDivider, 0, 780, f);

    pages['pro_app___mobile'].appendChild(f);
    proMobileX += 414;
  }


  // ════════════════════════════════════════════
  //  PRO APP · WEB  (placeholder)
  // ════════════════════════════════════════════
  figma.currentPage = pages['pro_app___web'];
  const proWebNames = ['Dashboard', 'Create Drop', 'Analytics'];
  let proWebX = 0;
  for (const name of proWebNames) {
    const f = frame('Pro · ' + name, 1440, 900, C.bg);
    f.x = proWebX;
    f.y = 0;
    const nav = rect(1440, 56, C.bgNav);
    f.appendChild(nav);
    const navTitle = text('Nigh Pro', 16, 'Bold', C.blue);
    place(navTitle, 24, 18, f);
    const label = text(name, 24, 'Extra Bold', C.white, 0.10);
    place(label, 600, 420, f);
    pages['pro_app___web'].appendChild(f);
    proWebX += 1480;
  }


  // ════════════════════════════════════════════
  //  SUPPORT APP · WEB  (placeholder)
  // ════════════════════════════════════════════
  figma.currentPage = pages['support_app___web'];
  const supportNames = ['Ticket Queue', 'User Lookup', 'Drop Management'];
  let supportX = 0;
  for (const name of supportNames) {
    const f = frame('Support · ' + name, 1440, 900, C.bg);
    f.x = supportX;
    f.y = 0;
    const nav = rect(1440, 56, C.bgNav);
    f.appendChild(nav);
    const navTitle = text('Nigh Support', 16, 'Bold', C.blue);
    place(navTitle, 24, 18, f);
    const label = text(name, 24, 'Extra Bold', C.white, 0.10);
    place(label, 600, 420, f);
    pages['support_app___web'].appendChild(f);
    supportX += 1480;
  }

  // ── Done ──
  figma.notify('✅ Nigh Drops 2026 set up! All pages and frames created.');
  figma.ui.postMessage('done');
  figma.closePlugin();
}

setup().catch(err => {
  figma.notify('❌ Error: ' + err.message, { error: true });
  console.error(err);
  figma.closePlugin();
});
