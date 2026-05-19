# Nigh Drops App - HTML Files

## Overview
7 responsive HTML pages for the Nigh Drops event ticketing app with shared dark design system, mobile tab bar (64px height), and desktop sidebar (240px width, hidden on mobile).

## Files Created

### 1. **nigh-onboarding.html**
3-step onboarding flow (pre-auth, no navigation):
- Step 1: Phone number entry
- Step 2: SMS 6-digit verification
- Step 3: Account creation (name, username, email optional, DOB optional)
- Dark navy background (#1B2A4A)
- Gradient "N" logo
- Links to nigh-feed.html on completion

### 2. **nigh-feed.html**
Main drops feed page:
- Tab bar active: Drops
- Sidebar active: Drops
- Placeholder for featured drops near user
- Fully responsive with shared navigation

### 3. **nigh-tickets.html**
My Tickets page:
- Tab bar active: Tickets
- Sidebar active: Tickets
- Two sections: CURRENT (2 active) and PAST (1 completed)
- Gradient-bordered ticket cards for active tickets
- Links to nigh-ticket-view.html for each ticket

### 4. **nigh-ticket-view.html**
Individual ticket details:
- Flip card interaction (front shows QR, back shows receipt)
- For multi-spot tickets (TK003): dot navigation between spots
- Shows spot status: active, transferred, pending, or available
- Transfer button on available spots links to nigh-transfer.html
- Back button navigation

### 5. **nigh-transfer.html**
Transfer ticket flow with 2 phases:
- **SELECT phase**: Search bar + recents, friends, contacts sections
- **CONFIRM phase**: Avatar, name, transfer details, disclaimer, send button
- Live search filtering
- Back navigation to ticket view

### 6. **nigh-alerts.html**
Notification center:
- Tab bar active: Alerts (with badge)
- 5 notification types: broadcast, friend actions, live events
- Unread items highlighted with green left border
- All link to nigh-feed.html

### 7. **nigh-menu.html** 
Multi-view menu system (dark mode main view, light mode sub-pages):
- Tab bar active: Menu
- **Main Menu**: Profile card, social section (Friends/Following), account section (Payment/User Account), legal links, logout
- **Friends sub-page**: 4 friends, "Going" badges for those with active tickets
- **Following sub-page**: 2 following accounts with LIVE badges, unfollow buttons
- **Account sub-page**: Editable profile fields (name, email, DOB), save changes button

### 8. **nigh-pro-profile.html**
Brand/Pro profile page:
- Back button navigation
- Hero card with brand info
- Contact details card
- Bio section
- Recent drops list
- Readable via ?handle= URL parameter

## Design System

**Colors:**
- Background: `#0a0a14`
- Cards: `#1c1c28`
- Border: `rgba(255,255,255,0.08)`
- Accent: Blue `#0E4EF5`, Purple `#6226E9`, Teal `#41EFF9`, Magenta `#EC1977`, Green `#4ADE80`, Amber `#F5A623`
- Text: `#fff`, dim `rgba(255,255,255,0.60)`, dimmer `rgba(255,255,255,0.38)`

**Typography:**
- Font: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', Roboto, sans-serif`

**Navigation:**
- Mobile: Tab bar (64px height, sticky bottom)
- Desktop (900px+): Sidebar (240px width, hidden on mobile)

**Sub-pages (Friends, Following, Account):**
- Light mode styling: Background `#F9FAFB`, cards white, text `#111827`

## Features

✓ Fully self-contained HTML (no external dependencies)
✓ Inline CSS & JavaScript
✓ Responsive design (mobile-first)
✓ Dark theme with premium gradient accents
✓ Shared navigation between all pages
✓ Interactive components (flip cards, search, phase transitions)
✓ Sample data embedded via JavaScript variables
✓ Cross-page linking via URL parameters

## Navigation Structure

```
nigh-feed.html
  ↓
nigh-tickets.html → nigh-ticket-view.html → nigh-transfer.html
nigh-alerts.html
nigh-menu.html (with sub-pages: friends, following, account)
  ↓
nigh-pro-profile.html
```

All pages link back via back buttons or navigation tabs.

---

**Created:** March 5, 2026
**Version:** 1.0
