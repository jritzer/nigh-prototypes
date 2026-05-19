import { useState } from "react";
import {
  Home, Plus, QrCode, Users, BarChart3, Settings, ChevronRight,
  ChevronLeft, Clock, MapPin, DollarSign, Eye, Pause, X, Check,
  Search, Filter, ArrowUpRight, TrendingUp, AlertCircle, Camera,
  Send, Star, Calendar, Zap, Shield, UserPlus, MoreVertical,
  Edit3, Copy, Bell, Menu, ChevronDown, ArrowLeft, Upload, Image
} from "lucide-react";

// ── Color Palette (Clean Light Theme) ─────────────────────────────────
const C = {
  primary: "#1B2A4A",     // Deep navy
  accent: "#3B82F6",      // Bright blue
  accentLight: "#EFF6FF", // Light blue bg
  teal: "#0D9488",        // Teal for success
  tealLight: "#F0FDFA",
  orange: "#F59E0B",      // Warning/pending
  orangeLight: "#FFFBEB",
  red: "#EF4444",         // Error/danger
  redLight: "#FEF2F2",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  white: "#FFFFFF",
};

// ── Sample Data ────────────────────────────────────────────────────────
const sampleDrops = [
  {
    id: "D001", title: "Nike Air Max Day Access", type: "Appointment",
    timing: "Start Time", startTime: "2:00 PM", date: "Mar 5",
    capacity: 8, reserved: 8, checkedIn: 5, noShow: 1,
    price: "Free", status: "Live - Sold Out", category: "Retail",
    venue: "Nike Boulder", image: "shoe",
    description: "Exclusive early access to the Air Max Day collection. Be among the first 8 to try on and purchase the new Air Max DN."
  },
  {
    id: "D002", title: "Starbucks Secret Menu Tasting", type: "Event",
    timing: "Arrival Window", startTime: "5:00 - 7:00 PM", date: "Mar 5",
    capacity: 50, reserved: 38, checkedIn: 22, noShow: 0,
    price: "Free", status: "Live", category: "Food & Drink",
    venue: "Starbucks Pearl St", image: "coffee",
    description: "Try 5 secret menu drinks crafted by our head barista. Free samples, exclusive merchandise raffle."
  },
  {
    id: "D003", title: "Whole Foods Chef's Table", type: "Event",
    timing: "Start Time", startTime: "6:30 PM", date: "Mar 6",
    capacity: 12, reserved: 9, checkedIn: 0, noShow: 0,
    price: "$45", status: "Live", category: "Food & Drink",
    venue: "Whole Foods Market Boulder", image: "food",
    description: "5-course tasting menu featuring seasonal organic ingredients. Wine pairings included."
  },
  {
    id: "D004", title: "Williams-Sonoma Cooking Class", type: "Event",
    timing: "Start Time", startTime: "11:00 AM", date: "Mar 8",
    capacity: 10, reserved: 4, checkedIn: 0, noShow: 0,
    price: "$75", status: "Draft", category: "Food & Drink",
    venue: "Williams-Sonoma Flatiron", image: "cooking",
    description: "Hands-on pasta making with Chef Maria. All ingredients and tools provided. Take home your creations."
  },
];

const sampleReservations = [
  { id: "R001", phone: "(303) 555-0101", name: "Sarah M.", tickets: 2, status: "Checked-In", payment: "Free", time: "2:03 PM" },
  { id: "R002", phone: "(303) 555-0142", name: "James K.", tickets: 1, status: "Checked-In", payment: "Free", time: "2:05 PM" },
  { id: "R003", phone: "(303) 555-0188", name: "Alex R.", tickets: 2, status: "Checked-In", payment: "Free", time: "2:08 PM" },
  { id: "R004", phone: "(303) 555-0234", name: "Maya T.", tickets: 1, status: "Reserved", payment: "Pre-auth", time: "1:45 PM" },
  { id: "R005", phone: "(303) 555-0301", name: "Chris P.", tickets: 1, status: "No-Show", payment: "Captured", time: "1:30 PM" },
  { id: "R006", phone: "(303) 555-0377", name: "Lin W.", tickets: 1, status: "Reserved", payment: "Pre-auth", time: "1:52 PM" },
];

// ── Status Badge ───────────────────────────────────────────────────────
function StatusBadge({ status, small }) {
  const styles = {
    "Live": { bg: "#DCFCE7", color: "#166534", dot: "#22C55E" },
    "Live - Sold Out": { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
    "Draft": { bg: C.gray100, color: C.gray600, dot: C.gray400 },
    "Paused": { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
    "Ended": { bg: C.gray100, color: C.gray500, dot: C.gray400 },
    "Checked-In": { bg: "#DCFCE7", color: "#166534", dot: "#22C55E" },
    "Reserved": { bg: "#DBEAFE", color: "#1E40AF", dot: "#3B82F6" },
    "No-Show": { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
    "Transferred": { bg: "#F3E8FF", color: "#6B21A8", dot: "#A855F7" },
    "Refunded": { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
  };
  const s = styles[status] || styles["Draft"];
  const sz = small ? "10px" : "12px";
  const pad = small ? "2px 8px" : "4px 10px";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: s.bg, color: s.color, fontSize: sz,
      fontWeight: 600, padding: pad, borderRadius: 999,
      letterSpacing: "0.01em"
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
}

// ── Metric Card ────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, icon: Icon, color, bg }) {
  return (
    <div style={{
      background: C.white, borderRadius: 12, padding: "16px",
      border: `1px solid ${C.gray200}`, flex: "1 1 45%", minWidth: 140
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: C.gray500, fontWeight: 500, marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.gray900 }}>{value}</div>
          {sub && <div style={{ fontSize: 11, color: color || C.teal, marginTop: 2 }}>{sub}</div>}
        </div>
        {Icon && (
          <div style={{
            width: 36, height: 36, borderRadius: 8, display: "flex",
            alignItems: "center", justifyContent: "center",
            background: bg || C.accentLight
          }}>
            <Icon size={18} color={color || C.accent} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Bottom Tab Bar ────────────────────────────────────────────────────
function TabBar({ active, onNav }) {
  const tabs = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "create", icon: Plus, label: "Create" },
    { id: "checkin", icon: QrCode, label: "Check-In" },
    { id: "reservations", icon: Users, label: "Guests" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
  ];
  return (
    <div style={{
      display: "flex", justifyContent: "space-around", alignItems: "center",
      background: C.white, borderTop: `1px solid ${C.gray200}`,
      padding: "6px 0 env(safe-area-inset-bottom, 8px)", position: "sticky", bottom: 0,
      zIndex: 100
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onNav(t.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 2, background: "none", border: "none", cursor: "pointer",
            padding: "4px 12px", minWidth: 56,
            color: isActive ? C.accent : C.gray400,
            transition: "color 0.15s"
          }}>
            <t.icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Top Header ─────────────────────────────────────────────────────────
function Header({ title, subtitle, onBack, rightAction }) {
  return (
    <div style={{
      background: C.white, padding: "12px 16px", borderBottom: `1px solid ${C.gray200}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 99
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            display: "flex", color: C.gray700
          }}>
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.gray900, lineHeight: 1.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: C.gray500, marginTop: 1 }}>{subtitle}</div>}
        </div>
      </div>
      {rightAction}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 1: DASHBOARD
// ═══════════════════════════════════════════════════════════════════════
function DashboardScreen({ onNav, onSelectDrop }) {
  const activeDrop = sampleDrops[0];
  const totalReserved = sampleDrops.reduce((s, d) => s + d.reserved, 0);
  const totalCheckedIn = sampleDrops.reduce((s, d) => s + d.checkedIn, 0);

  return (
    <div style={{ background: C.gray50, minHeight: "100%" }}>
      {/* Top bar */}
      <div style={{
        background: C.primary, padding: "16px 16px 20px", color: C.white
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.7, fontWeight: 500 }}>Good afternoon</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Centro Boulder</div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Bell size={18} color={C.white} />
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "Active Drops", value: "2" },
            { label: "Reservations", value: totalReserved.toString() },
            { label: "Checked In", value: totalCheckedIn.toString() },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 10,
              padding: "10px 12px", textAlign: "center"
            }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Create CTA */}
        <button onClick={() => onNav("create")} style={{
          width: "100%", background: C.accent, color: C.white, border: "none",
          borderRadius: 12, padding: "14px 16px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          fontSize: 15, fontWeight: 600, marginBottom: 20,
          boxShadow: "0 2px 8px rgba(59,130,246,0.3)"
        }}>
          <Plus size={20} /> Create New Drop
        </button>

        {/* Active Drop highlight */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 10
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.gray800 }}>Active Now</span>
            <button onClick={() => onNav("reservations")} style={{
              background: "none", border: "none", color: C.accent, fontSize: 12,
              fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 2
            }}>
              View All <ChevronRight size={14} />
            </button>
          </div>

          {/* Live drop card */}
          <div onClick={() => onSelectDrop(activeDrop)} style={{
            background: C.white, borderRadius: 14, overflow: "hidden",
            border: `1px solid ${C.gray200}`, cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
          }}>
            {/* Image placeholder */}
            <div style={{
              height: 120, background: `linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative"
            }}>
              <Zap size={40} color="rgba(255,255,255,0.3)" />
              <div style={{
                position: "absolute", top: 10, right: 10
              }}>
                <StatusBadge status={activeDrop.status} />
              </div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>
                {activeDrop.title}
              </div>
              <div style={{
                display: "flex", gap: 12, fontSize: 12, color: C.gray500, marginBottom: 10
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Clock size={12} /> {activeDrop.date}, {activeDrop.startTime}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <MapPin size={12} /> {activeDrop.venue}
                </span>
              </div>

              {/* Capacity bar */}
              <div style={{ marginBottom: 8 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", fontSize: 11,
                  color: C.gray500, marginBottom: 4
                }}>
                  <span>Capacity</span>
                  <span style={{ fontWeight: 600, color: C.orange }}>
                    {activeDrop.reserved}/{activeDrop.capacity} reserved
                  </span>
                </div>
                <div style={{ height: 6, background: C.gray200, borderRadius: 3 }}>
                  <div style={{
                    height: "100%", borderRadius: 3,
                    width: `${(activeDrop.reserved / activeDrop.capacity) * 100}%`,
                    background: activeDrop.reserved >= activeDrop.capacity
                      ? C.orange : C.teal,
                    transition: "width 0.3s"
                  }} />
                </div>
              </div>

              {/* Check-in progress */}
              <div style={{
                display: "flex", gap: 16, padding: "8px 0 0",
                borderTop: `1px solid ${C.gray100}`
              }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.teal }}>{activeDrop.checkedIn}</div>
                  <div style={{ fontSize: 10, color: C.gray500 }}>Checked In</div>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.accent }}>
                    {activeDrop.reserved - activeDrop.checkedIn - activeDrop.noShow}
                  </div>
                  <div style={{ fontSize: 10, color: C.gray500 }}>Pending</div>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.red }}>{activeDrop.noShow}</div>
                  <div style={{ fontSize: 10, color: C.gray500 }}>No-Show</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Drops */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.gray800, marginBottom: 10 }}>
            All Drops
          </div>
          {sampleDrops.map(drop => (
            <div key={drop.id} onClick={() => onSelectDrop(drop)} style={{
              background: C.white, borderRadius: 12, padding: "12px 14px",
              border: `1px solid ${C.gray200}`, marginBottom: 8,
              display: "flex", alignItems: "center", gap: 12, cursor: "pointer"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                <Zap size={18} color="rgba(255,255,255,0.6)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.gray900, marginBottom: 3 }}>
                  {drop.title}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: C.gray500 }}>
                    {drop.date}, {drop.startTime}
                  </span>
                  <StatusBadge status={drop.status} small />
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.gray800 }}>
                  {drop.reserved}/{drop.capacity}
                </div>
                <div style={{ fontSize: 10, color: C.gray500 }}>reserved</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 2: CREATE DROP
// ═══════════════════════════════════════════════════════════════════════
function CreateDropScreen({ onNav }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "", description: "", timingMode: "start",
    date: "", startTime: "", windowStart: "", windowEnd: "",
    capacity: "", price: "", venue: "", category: "Food & Drink"
  });

  const categories = [
    "Food & Drink", "Retail", "Fitness", "Beauty", "Technology",
    "Entertainment", "Outdoor", "Automotive", "Books", "Home & Kitchen"
  ];

  const InputField = ({ label, placeholder, value, onChange, type, required }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        fontSize: 12, fontWeight: 600, color: C.gray700,
        marginBottom: 6, display: "block"
      }}>
        {label} {required && <span style={{ color: C.red }}>*</span>}
      </label>
      <input
        type={type || "text"} placeholder={placeholder}
        value={value} onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", padding: "11px 14px", borderRadius: 10,
          border: `1px solid ${C.gray200}`, fontSize: 14, color: C.gray900,
          background: C.white, outline: "none", boxSizing: "border-box",
          transition: "border-color 0.15s"
        }}
        onFocus={e => e.target.style.borderColor = C.accent}
        onBlur={e => e.target.style.borderColor = C.gray200}
      />
    </div>
  );

  const stepTitles = ["Basic Info", "Timing & Venue", "Pricing & Capacity", "Review"];

  return (
    <div style={{ background: C.gray50, minHeight: "100%" }}>
      <Header
        title="Create Drop"
        subtitle={`Step ${step} of 4 — ${stepTitles[step - 1]}`}
        onBack={() => step > 1 ? setStep(step - 1) : onNav("dashboard")}
      />

      {/* Progress bar */}
      <div style={{ padding: "0 16px", marginTop: 12 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: s <= step ? C.accent : C.gray200,
              transition: "background 0.2s"
            }} />
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div>
            <InputField label="Drop Title" placeholder="e.g. Chef's Table Dinner"
              value={form.title} onChange={v => setForm({ ...form, title: v })} required />

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 6, display: "block" }}>
                Description <span style={{ color: C.red }}>*</span>
              </label>
              <textarea
                placeholder="What makes this Drop special?"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={4}
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 10,
                  border: `1px solid ${C.gray200}`, fontSize: 14, color: C.gray900,
                  background: C.white, outline: "none", resize: "vertical",
                  fontFamily: "inherit", boxSizing: "border-box"
                }}
              />
              <div style={{ fontSize: 11, color: C.gray400, marginTop: 4, textAlign: "right" }}>
                {form.description.length}/2000
              </div>
            </div>

            {/* Image upload */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 6, display: "block" }}>
                Cover Image <span style={{ color: C.red }}>*</span>
              </label>
              <div style={{
                border: `2px dashed ${C.gray300}`, borderRadius: 12, padding: "30px 16px",
                textAlign: "center", cursor: "pointer", background: C.gray50
              }}>
                <Upload size={28} color={C.gray400} style={{ margin: "0 auto 8px" }} />
                <div style={{ fontSize: 13, color: C.gray500, fontWeight: 500 }}>
                  Tap to upload photo or video
                </div>
                <div style={{ fontSize: 11, color: C.gray400, marginTop: 4 }}>
                  JPG, PNG, MP4, MOV — Max 10MB
                </div>
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 6, display: "block" }}>
                Category <span style={{ color: C.red }}>*</span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setForm({ ...form, category: cat })} style={{
                    padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                    border: `1px solid ${form.category === cat ? C.accent : C.gray200}`,
                    background: form.category === cat ? C.accentLight : C.white,
                    color: form.category === cat ? C.accent : C.gray600,
                    cursor: "pointer", transition: "all 0.15s"
                  }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Timing & Venue */}
        {step === 2 && (
          <div>
            {/* Timing Mode */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 8, display: "block" }}>
                Timing Mode <span style={{ color: C.red }}>*</span>
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { id: "start", label: "Start Time", desc: "Specific start time", icon: Clock },
                  { id: "window", label: "Arrival Window", desc: "Flexible time range", icon: Calendar },
                ].map(opt => (
                  <button key={opt.id} onClick={() => setForm({ ...form, timingMode: opt.id })} style={{
                    flex: 1, padding: "14px 12px", borderRadius: 12, cursor: "pointer",
                    border: `2px solid ${form.timingMode === opt.id ? C.accent : C.gray200}`,
                    background: form.timingMode === opt.id ? C.accentLight : C.white,
                    textAlign: "left", transition: "all 0.15s"
                  }}>
                    <opt.icon size={20} color={form.timingMode === opt.id ? C.accent : C.gray400}
                      style={{ marginBottom: 6 }} />
                    <div style={{
                      fontSize: 13, fontWeight: 600,
                      color: form.timingMode === opt.id ? C.accent : C.gray800
                    }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: 11, color: C.gray500, marginTop: 2 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <InputField label="Date" placeholder="Select date"
              value={form.date} onChange={v => setForm({ ...form, date: v })} type="date" required />

            {form.timingMode === "start" ? (
              <InputField label="Start Time" placeholder="e.g. 6:00 PM"
                value={form.startTime} onChange={v => setForm({ ...form, startTime: v })} type="time" required />
            ) : (
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <InputField label="Window Start" placeholder="Start"
                    value={form.windowStart} onChange={v => setForm({ ...form, windowStart: v })} type="time" required />
                </div>
                <div style={{ flex: 1 }}>
                  <InputField label="Window End" placeholder="End"
                    value={form.windowEnd} onChange={v => setForm({ ...form, windowEnd: v })} type="time" required />
                </div>
              </div>
            )}

            <InputField label="Venue" placeholder="Search for a location..."
              value={form.venue} onChange={v => setForm({ ...form, venue: v })} required />

            <div style={{
              background: C.accentLight, borderRadius: 10, padding: "10px 14px",
              display: "flex", gap: 8, alignItems: "flex-start"
            }}>
              <AlertCircle size={16} color={C.accent} style={{ marginTop: 1, flexShrink: 0 }} />
              <div style={{ fontSize: 12, color: C.accent, lineHeight: 1.4 }}>
                Drops can be scheduled up to 72 hours in advance. Purchase cutoff is automatically set to 15 minutes before start.
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pricing & Capacity */}
        {step === 3 && (
          <div>
            <InputField label="Capacity" placeholder="Max number of guests"
              value={form.capacity} onChange={v => setForm({ ...form, capacity: v })} type="number" required />

            {form.capacity && parseInt(form.capacity) > 500 && (
              <div style={{
                background: C.orangeLight, borderRadius: 10, padding: "10px 14px",
                display: "flex", gap: 8, marginBottom: 16, marginTop: -8
              }}>
                <AlertCircle size={16} color={C.orange} style={{ marginTop: 1, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: "#92400E", lineHeight: 1.4 }}>
                  Capacity over 500 requires Nigh review before publishing.
                </div>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.gray700, marginBottom: 8, display: "block" }}>
                Pricing <span style={{ color: C.red }}>*</span>
              </label>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[
                  { id: "free", label: "Free" },
                  { id: "paid", label: "Paid" },
                ].map(opt => (
                  <button key={opt.id} onClick={() => setForm({ ...form, price: opt.id === "free" ? "0" : form.price === "0" ? "" : form.price })} style={{
                    flex: 1, padding: "10px", borderRadius: 10, cursor: "pointer",
                    border: `2px solid ${(opt.id === "free" ? form.price === "0" : form.price !== "0" && form.price !== "") ? C.accent : C.gray200}`,
                    background: (opt.id === "free" ? form.price === "0" : form.price !== "0" && form.price !== "") ? C.accentLight : C.white,
                    fontSize: 13, fontWeight: 600,
                    color: (opt.id === "free" ? form.price === "0" : form.price !== "0" && form.price !== "") ? C.accent : C.gray600,
                    transition: "all 0.15s"
                  }}>
                    {opt.label}
                  </button>
                ))}
              </div>
              {form.price !== "0" && (
                <InputField label="Ticket Price" placeholder="$0.00 - $999.99"
                  value={form.price} onChange={v => setForm({ ...form, price: v })} type="number" />
              )}
            </div>

            {/* Direct Offers */}
            <div style={{
              background: C.white, borderRadius: 12, border: `1px solid ${C.gray200}`,
              padding: "14px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Send size={16} color={C.accent} />
                <span style={{ fontSize: 13, fontWeight: 600, color: C.gray800 }}>
                  Direct Offers
                </span>
              </div>
              <div style={{ fontSize: 12, color: C.gray500, lineHeight: 1.5, marginBottom: 10 }}>
                Reserve spots for VIPs via personal SMS links. These don't appear in the public feed.
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${C.gray200}`, background: C.gray50, color: C.gray600,
                  cursor: "pointer"
                }}>
                  Shared Pool
                </button>
                <button style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${C.accent}`, background: C.accentLight, color: C.accent,
                  cursor: "pointer"
                }}>
                  Separate Pool
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <div style={{
              background: C.white, borderRadius: 14, overflow: "hidden",
              border: `1px solid ${C.gray200}`, marginBottom: 16
            }}>
              <div style={{
                height: 100,
                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Image size={32} color="rgba(255,255,255,0.3)" />
              </div>
              <div style={{ padding: "14px" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.gray900, marginBottom: 12 }}>
                  {form.title || "Untitled Drop"}
                </div>
                {[
                  { icon: Calendar, label: "Category", value: form.category },
                  { icon: Clock, label: "Timing", value: form.timingMode === "start" ? `Start Time: ${form.startTime || "—"}` : `Window: ${form.windowStart || "—"} – ${form.windowEnd || "—"}` },
                  { icon: MapPin, label: "Venue", value: form.venue || "Not set" },
                  { icon: Users, label: "Capacity", value: form.capacity || "Not set" },
                  { icon: DollarSign, label: "Price", value: form.price === "0" ? "Free" : form.price ? `$${form.price}` : "Not set" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                    borderBottom: i < 4 ? `1px solid ${C.gray100}` : "none"
                  }}>
                    <item.icon size={16} color={C.gray400} />
                    <span style={{ fontSize: 12, color: C.gray500, width: 70 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: C.gray800, fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button style={{
                flex: 1, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: `1px solid ${C.gray300}`, background: C.white, color: C.gray700,
                cursor: "pointer"
              }}>
                Save Draft
              </button>
              <button style={{
                flex: 1, padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: "none", background: C.accent, color: C.white,
                cursor: "pointer", boxShadow: "0 2px 8px rgba(59,130,246,0.3)"
              }}>
                Publish Now
              </button>
            </div>
          </div>
        )}

        {/* Nav buttons (except on step 4 which has its own) */}
        {step < 4 && (
          <div style={{ marginTop: 24 }}>
            <button onClick={() => setStep(step + 1)} style={{
              width: "100%", padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              border: "none", background: C.accent, color: C.white, cursor: "pointer"
            }}>
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 3: LIVE DROP VIEW
// ═══════════════════════════════════════════════════════════════════════
function LiveDropScreen({ drop, onBack, onNav }) {
  if (!drop) return null;

  const remaining = drop.capacity - drop.reserved;
  const checkinPct = drop.reserved > 0 ? Math.round((drop.checkedIn / drop.reserved) * 100) : 0;

  return (
    <div style={{ background: C.gray50, minHeight: "100%" }}>
      <Header title={drop.title} subtitle={drop.venue} onBack={onBack}
        rightAction={
          <button style={{
            background: "none", border: "none", cursor: "pointer", padding: 4
          }}>
            <MoreVertical size={20} color={C.gray600} />
          </button>
        }
      />

      <div style={{ padding: "16px" }}>
        {/* Status + timing */}
        <div style={{
          background: C.white, borderRadius: 14, padding: "16px",
          border: `1px solid ${C.gray200}`, marginBottom: 12
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <StatusBadge status={drop.status} />
            <span style={{ fontSize: 12, color: C.gray500 }}>
              {drop.timing}: {drop.date}, {drop.startTime}
            </span>
          </div>

          {/* Capacity donut */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke={C.gray200} strokeWidth="8" />
                <circle cx="40" cy="40" r="34" fill="none"
                  stroke={remaining === 0 ? C.orange : C.teal}
                  strokeWidth="8"
                  strokeDasharray={`${(drop.reserved / drop.capacity) * 213.6} 213.6`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)" />
              </svg>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)", textAlign: "center"
              }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.gray900 }}>{remaining}</div>
                <div style={{ fontSize: 9, color: C.gray500 }}>left</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: C.gray500 }}>Total Capacity</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.gray800 }}>{drop.capacity}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: C.gray500 }}>Reserved</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>{drop.reserved}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: C.gray500 }}>Checked In</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.teal }}>{drop.checkedIn}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: C.gray500 }}>No-Shows</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.red }}>{drop.noShow}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Check-in rate */}
        <div style={{
          background: C.white, borderRadius: 14, padding: "16px",
          border: `1px solid ${C.gray200}`, marginBottom: 12
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.gray800 }}>Check-In Rate</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: C.teal }}>{checkinPct}%</span>
          </div>
          <div style={{ height: 8, background: C.gray100, borderRadius: 4 }}>
            <div style={{
              height: "100%", borderRadius: 4, background: C.teal,
              width: `${checkinPct}%`, transition: "width 0.3s"
            }} />
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between", fontSize: 11,
            color: C.gray400, marginTop: 4
          }}>
            <span>{drop.checkedIn} checked in</span>
            <span>{drop.reserved} total</span>
          </div>
        </div>

        {/* Revenue (for paid drops) */}
        {drop.price !== "Free" && (
          <div style={{
            background: C.white, borderRadius: 14, padding: "16px",
            border: `1px solid ${C.gray200}`, marginBottom: 12
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.gray800, display: "block", marginBottom: 10 }}>
              Revenue
            </span>
            <div style={{ display: "flex", gap: 12 }}>
              <MetricCard label="Pre-authorized" value={`$${drop.reserved * parseInt(drop.price.replace("$", ""))}`}
                icon={DollarSign} color={C.accent} bg={C.accentLight} />
              <MetricCard label="Captured" value={`$${drop.checkedIn * parseInt(drop.price.replace("$", ""))}`}
                icon={Check} color={C.teal} bg={C.tealLight} />
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => onNav("checkin")} style={{
            flex: 1, padding: "12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: "none", background: C.teal, color: C.white, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}>
            <QrCode size={16} /> Check In
          </button>
          <button onClick={() => onNav("reservations")} style={{
            flex: 1, padding: "12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: `1px solid ${C.gray300}`, background: C.white, color: C.gray700,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}>
            <Users size={16} /> Guests
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button style={{
            flex: 1, padding: "11px", borderRadius: 10, fontSize: 12, fontWeight: 500,
            border: `1px solid ${C.gray300}`, background: C.white, color: C.gray600,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}>
            <Send size={14} /> Direct Offer
          </button>
          <button style={{
            flex: 1, padding: "11px", borderRadius: 10, fontSize: 12, fontWeight: 500,
            border: `1px solid ${C.gray300}`, background: C.white, color: C.gray600,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}>
            <QrCode size={14} /> Show QR
          </button>
          <button style={{
            flex: 1, padding: "11px", borderRadius: 10, fontSize: 12, fontWeight: 500,
            border: `1px solid ${C.orange}`, background: C.orangeLight, color: "#92400E",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
          }}>
            <Pause size={14} /> Pause
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 4: CHECK-IN / QR SCANNER
// ═══════════════════════════════════════════════════════════════════════
function CheckInScreen({ onNav }) {
  const [mode, setMode] = useState("scan"); // scan | manual | success | error
  const [manualInput, setManualInput] = useState("");

  return (
    <div style={{ background: C.gray50, minHeight: "100%" }}>
      <Header title="Check-In" subtitle="Nike Air Max Day Access" />

      <div style={{ padding: "16px" }}>
        {/* Toggle: QR vs Manual */}
        <div style={{
          display: "flex", background: C.gray100, borderRadius: 10, padding: 3, marginBottom: 16
        }}>
          {[
            { id: "scan", label: "QR Scan", icon: Camera },
            { id: "manual", label: "Manual", icon: Search },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{
              flex: 1, padding: "9px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              border: "none", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", gap: 6,
              background: (mode === m.id || mode === "success" || mode === "error") && (m.id === "scan" ? (mode === "scan" || mode === "success" || mode === "error") : mode === "manual") ? C.white : "transparent",
              color: (mode === m.id || ((mode === "success" || mode === "error") && m.id === "scan")) ? C.gray800 : C.gray500,
              boxShadow: (mode === m.id || ((mode === "success" || mode === "error") && m.id === "scan")) ? "0 1px 2px rgba(0,0,0,0.06)" : "none"
            }}>
              <m.icon size={16} /> {m.label}
            </button>
          ))}
        </div>

        {/* QR Scanner view */}
        {(mode === "scan") && (
          <div>
            <div style={{
              background: C.gray900, borderRadius: 16, height: 300,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden", marginBottom: 16
            }}>
              {/* Scan frame */}
              <div style={{
                width: 200, height: 200, border: "3px solid rgba(255,255,255,0.3)",
                borderRadius: 16, position: "relative"
              }}>
                {/* Corner accents */}
                {[
                  { top: -3, left: -3, borderTop: `4px solid ${C.accent}`, borderLeft: `4px solid ${C.accent}` },
                  { top: -3, right: -3, borderTop: `4px solid ${C.accent}`, borderRight: `4px solid ${C.accent}` },
                  { bottom: -3, left: -3, borderBottom: `4px solid ${C.accent}`, borderLeft: `4px solid ${C.accent}` },
                  { bottom: -3, right: -3, borderBottom: `4px solid ${C.accent}`, borderRight: `4px solid ${C.accent}` },
                ].map((s, i) => (
                  <div key={i} style={{
                    position: "absolute", width: 24, height: 24,
                    borderRadius: i < 2 ? "12px 0 0 0" : "0 0 12px 0",
                    ...s
                  }} />
                ))}

                {/* Scan line animation placeholder */}
                <div style={{
                  position: "absolute", left: 10, right: 10, top: "40%",
                  height: 2, background: C.accent, opacity: 0.8,
                  boxShadow: `0 0 12px ${C.accent}`
                }} />
              </div>
              <div style={{
                color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 16
              }}>
                Point camera at guest's QR code
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setMode("success")} style={{
                flex: 1, padding: "12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                border: "none", background: C.teal, color: C.white, cursor: "pointer"
              }}>
                Simulate Scan
              </button>
              <button onClick={() => setMode("manual")} style={{
                flex: 1, padding: "12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                border: `1px solid ${C.gray300}`, background: C.white, color: C.gray700,
                cursor: "pointer"
              }}>
                Manual Entry
              </button>
            </div>
          </div>
        )}

        {/* Manual entry */}
        {mode === "manual" && (
          <div>
            <div style={{
              background: C.white, borderRadius: 14, padding: "20px",
              border: `1px solid ${C.gray200}`, marginBottom: 16
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.gray800, marginBottom: 12 }}>
                Manual Check-In
              </div>
              <input
                placeholder="Phone number or Ticket ID"
                value={manualInput}
                onChange={e => setManualInput(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 10,
                  border: `1px solid ${C.gray200}`, fontSize: 14, color: C.gray900,
                  background: C.gray50, outline: "none", marginBottom: 12,
                  boxSizing: "border-box"
                }}
              />
              <button onClick={() => setMode("success")} style={{
                width: "100%", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                border: "none", background: C.accent, color: C.white, cursor: "pointer"
              }}>
                Look Up Guest
              </button>
            </div>

            {/* Recent check-ins */}
            <div style={{ fontSize: 13, fontWeight: 600, color: C.gray800, marginBottom: 8 }}>
              Recent Check-Ins
            </div>
            {sampleReservations.filter(r => r.status === "Checked-In").slice(0, 3).map(r => (
              <div key={r.id} style={{
                background: C.white, borderRadius: 10, padding: "10px 14px",
                border: `1px solid ${C.gray200}`, marginBottom: 6,
                display: "flex", alignItems: "center", justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.gray800 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: C.gray500 }}>{r.tickets} ticket{r.tickets > 1 ? "s" : ""} — {r.time}</div>
                </div>
                <StatusBadge status="Checked-In" small />
              </div>
            ))}
          </div>
        )}

        {/* Success state */}
        {mode === "success" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: 100, height: 100, borderRadius: "50%", background: C.tealLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <Check size={48} color={C.teal} strokeWidth={3} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.gray900, marginBottom: 4 }}>
              Check-In Confirmed
            </div>
            <div style={{ fontSize: 14, color: C.gray500, marginBottom: 20 }}>
              Sarah M. — 2 tickets
            </div>

            <div style={{
              background: C.white, borderRadius: 14, padding: "16px",
              border: `1px solid ${C.gray200}`, textAlign: "left", marginBottom: 20
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: C.gray500 }}>Ticket ID</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.gray800 }}>T-8294-A, T-8294-B</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: C.gray500 }}>Payment</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.teal }}>Free — No charge</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: C.gray500 }}>Time</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.gray800 }}>2:03 PM</span>
              </div>
            </div>

            <button onClick={() => setMode("scan")} style={{
              width: "100%", padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              border: "none", background: C.accent, color: C.white, cursor: "pointer"
            }}>
              Scan Next Guest
            </button>
          </div>
        )}

        {/* Live stats bar */}
        <div style={{
          background: C.white, borderRadius: 14, padding: "14px",
          border: `1px solid ${C.gray200}`, marginTop: 16,
          display: "flex", justifyContent: "space-around"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.teal }}>5</div>
            <div style={{ fontSize: 10, color: C.gray500 }}>Checked In</div>
          </div>
          <div style={{ width: 1, background: C.gray200 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.accent }}>2</div>
            <div style={{ fontSize: 10, color: C.gray500 }}>Pending</div>
          </div>
          <div style={{ width: 1, background: C.gray200 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.red }}>1</div>
            <div style={{ fontSize: 10, color: C.gray500 }}>No-Show</div>
          </div>
          <div style={{ width: 1, background: C.gray200 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.gray800 }}>8</div>
            <div style={{ fontSize: 10, color: C.gray500 }}>Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 5: RESERVATIONS LIST
// ═══════════════════════════════════════════════════════════════════════
function ReservationsScreen({ onNav }) {
  const [filter, setFilter] = useState("All");
  const [selectedRes, setSelectedRes] = useState(null);
  const filters = ["All", "Checked-In", "Reserved", "No-Show"];

  const filtered = filter === "All"
    ? sampleReservations
    : sampleReservations.filter(r => r.status === filter);

  return (
    <div style={{ background: C.gray50, minHeight: "100%" }}>
      <Header title="Reservations" subtitle="Nike Air Max Day Access — 8 guests" />

      <div style={{ padding: "12px 16px" }}>
        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, background: C.white,
          borderRadius: 10, border: `1px solid ${C.gray200}`, padding: "8px 12px",
          marginBottom: 12
        }}>
          <Search size={16} color={C.gray400} />
          <input placeholder="Search by name or phone..."
            style={{
              flex: 1, border: "none", outline: "none", fontSize: 13,
              color: C.gray900, background: "transparent"
            }}
          />
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500,
              border: `1px solid ${filter === f ? C.accent : C.gray200}`,
              background: filter === f ? C.accentLight : C.white,
              color: filter === f ? C.accent : C.gray600,
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0
            }}>
              {f} {f === "All" ? `(${sampleReservations.length})` :
                `(${sampleReservations.filter(r => r.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Reservation cards */}
        {filtered.map(r => (
          <div key={r.id} onClick={() => setSelectedRes(selectedRes === r.id ? null : r.id)} style={{
            background: C.white, borderRadius: 12, padding: "12px 14px",
            border: `1px solid ${selectedRes === r.id ? C.accent : C.gray200}`,
            marginBottom: 8, cursor: "pointer", transition: "border-color 0.15s"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%", background: C.gray100,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 600, color: C.gray600
                }}>
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.gray900 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: C.gray500 }}>{r.phone}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <StatusBadge status={r.status} small />
                <div style={{ fontSize: 11, color: C.gray400, marginTop: 4 }}>
                  {r.tickets} ticket{r.tickets > 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* Expanded actions */}
            {selectedRes === r.id && (
              <div style={{
                marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.gray100}`,
                display: "flex", gap: 6
              }}>
                {r.status === "Reserved" && (
                  <button style={{
                    flex: 1, padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                    border: "none", background: C.teal, color: C.white, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 4
                  }}>
                    <Check size={14} /> Check In
                  </button>
                )}
                {r.status === "No-Show" && (
                  <button style={{
                    flex: 1, padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                    border: "none", background: C.orange, color: C.white, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 4
                  }}>
                    <DollarSign size={14} /> Waive No-Show
                  </button>
                )}
                <button style={{
                  flex: 1, padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${C.gray300}`, background: C.white, color: C.gray600,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4
                }}>
                  <Send size={14} /> Message
                </button>
                <button style={{
                  padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: `1px solid ${C.red}`, background: C.redLight, color: C.red,
                  cursor: "pointer"
                }}>
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Summary footer */}
        <div style={{
          background: C.white, borderRadius: 12, padding: "14px",
          border: `1px solid ${C.gray200}`, marginTop: 8,
          display: "flex", justifyContent: "space-between", fontSize: 12
        }}>
          <span style={{ color: C.gray500 }}>Payment Summary</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: C.gray800, fontWeight: 600 }}>Free Drop — No charges</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCREEN 6: ANALYTICS
// ═══════════════════════════════════════════════════════════════════════
function AnalyticsScreen({ onNav }) {
  const barData = [
    { label: "Mon", value: 12 },
    { label: "Tue", value: 28 },
    { label: "Wed", value: 8 },
    { label: "Thu", value: 35 },
    { label: "Fri", value: 42 },
    { label: "Sat", value: 18 },
    { label: "Sun", value: 5 },
  ];
  const maxVal = Math.max(...barData.map(d => d.value));

  return (
    <div style={{ background: C.gray50, minHeight: "100%" }}>
      <Header title="Analytics" subtitle="Centro Boulder — Last 7 days" />

      <div style={{ padding: "16px" }}>
        {/* Metric cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
          <MetricCard label="Total Reservations" value="148" sub="+23% vs last week"
            icon={Users} color={C.accent} bg={C.accentLight} />
          <MetricCard label="Check-In Rate" value="72%" sub="108 of 148"
            icon={Check} color={C.teal} bg={C.tealLight} />
          <MetricCard label="Revenue" value="$2,340" sub="After refunds"
            icon={DollarSign} color={C.accent} bg={C.accentLight} />
          <MetricCard label="No-Show Rate" value="8.1%" sub="12 no-shows"
            icon={AlertCircle} color={C.orange} bg={C.orangeLight} />
        </div>

        {/* Simple bar chart */}
        <div style={{
          background: C.white, borderRadius: 14, padding: "16px",
          border: `1px solid ${C.gray200}`, marginBottom: 16
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.gray800, marginBottom: 14 }}>
            Reservations by Day
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 120 }}>
            {barData.map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{
                  height: `${(d.value / maxVal) * 100}px`,
                  background: i === 4 ? C.accent : C.accentLight,
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s",
                  marginBottom: 6,
                  position: "relative"
                }}>
                  <span style={{
                    position: "absolute", top: -16, left: "50%",
                    transform: "translateX(-50%)", fontSize: 10,
                    fontWeight: 600, color: C.gray600
                  }}>
                    {d.value}
                  </span>
                </div>
                <span style={{ fontSize: 10, color: C.gray500 }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Per-drop breakdown */}
        <div style={{
          background: C.white, borderRadius: 14, padding: "16px",
          border: `1px solid ${C.gray200}`
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.gray800, marginBottom: 12 }}>
            Per-Drop Performance
          </div>
          {sampleDrops.filter(d => d.status !== "Draft").map((drop, i) => (
            <div key={drop.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 0",
              borderBottom: i < 2 ? `1px solid ${C.gray100}` : "none"
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 600, color: C.gray800,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                }}>
                  {drop.title}
                </div>
                <div style={{ fontSize: 11, color: C.gray500, marginTop: 2 }}>
                  {drop.reserved} reservations — {drop.checkedIn} checked in
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.gray800 }}>
                  {drop.price === "Free" ? "Free" : `$${parseInt(drop.price.replace("$", "")) * drop.checkedIn}`}
                </div>
                <div style={{ fontSize: 10, color: C.teal }}>
                  {drop.reserved > 0 ? Math.round((drop.checkedIn / drop.reserved) * 100) : 0}% rate
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN APP SHELL
// ═══════════════════════════════════════════════════════════════════════
export default function NighProApp() {
  const [screen, setScreen] = useState("dashboard");
  const [selectedDrop, setSelectedDrop] = useState(null);

  const onNav = (s) => {
    setScreen(s);
    setSelectedDrop(null);
  };

  const onSelectDrop = (drop) => {
    setSelectedDrop(drop);
    setScreen("liveview");
  };

  return (
    <div style={{
      width: 375, minHeight: 812, maxHeight: 812, overflowY: "auto",
      margin: "0 auto", background: C.gray50,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: "flex", flexDirection: "column",
      borderRadius: 20, border: `1px solid ${C.gray200}`,
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      position: "relative"
    }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {screen === "dashboard" && <DashboardScreen onNav={onNav} onSelectDrop={onSelectDrop} />}
        {screen === "create" && <CreateDropScreen onNav={onNav} />}
        {screen === "liveview" && <LiveDropScreen drop={selectedDrop || sampleDrops[0]} onBack={() => onNav("dashboard")} onNav={onNav} />}
        {screen === "checkin" && <CheckInScreen onNav={onNav} />}
        {screen === "reservations" && <ReservationsScreen onNav={onNav} />}
        {screen === "analytics" && <AnalyticsScreen onNav={onNav} />}
      </div>

      {screen !== "liveview" && <TabBar active={screen} onNav={onNav} />}
    </div>
  );
}