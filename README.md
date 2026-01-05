# Ränta-på-ränta-kalkylator 💰

En avancerad räntekalkylator med svenska skatteregler, byggd med React + TypeScript och Swedish Financial Editorial designsystem.

🔗 **Live Demo:** [https://ranta.moderncloud.se/](https://ranta.moderncloud.se/)

## ✨ Funktioner

### Huvudfunktioner
- **Tre kontotyper med svenska skatteregler:**
  - ISK (Investeringssparkonto) - Schablonskatt
  - Kapitalförsäkring - Årlig avkastningsskatt
  - Aktie- och fondkonto (AF) - 30% kapitalvinstskatt

- **Avancerade beräkningar:**
  - Månads- eller årsinsättningar
  - Förvaltningsavgifter
  - Inflationsjustering
  - Detaljerad skatteberäkning per år

### Visualisering
- **Interaktiva diagram** med Recharts
  - Tillväxt över tid (area chart)
  - Fördelning per period (stacked bar chart)
  - Nyckelstatistik cards

### Design & UX
- **Swedish Financial Editorial designsystem**
  - Typsnitt: Playfair Display + Manrope
  - Färgpalett: Olive (#5a6b3f), Terracotta (#c86b4a), Cream (#f5f1e8)

- **Micro-interactions**
  - Ripple-effekter på knappar
  - Smooth hover-animationer
  - Enhanced focus states

- **Dark mode** med förbättrad kontrast

- **Fully responsive** - Mobile-first design
  - Touch-optimerade knappar (44x44px)
  - Större slider thumbs på mobil
  - iOS zoom prevention

- **Loading skeletons** med shimmer-effekt

## 🚀 Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Custom CSS
- **State Management:** Zustand
- **Charts:** Recharts
- **Deployment:** Azure Static Web Hosting + Azure Front Door

## 📦 Installation

```bash
# Klona repot
git clone https://github.com/staffanbergvall/ranta-kalkylator.git
cd ranta-kalkylator

# Installera dependencies
npm install

# Starta utvecklingsserver
npm run dev
```

## 🛠️ Kommandon

```bash
npm run dev         # Starta utvecklingsserver
npm run build       # Bygga för produktion
npm run preview     # Förhandsgranska produktionsbygge
npm run typecheck   # Kör TypeScript compiler
npm run lint        # Kör ESLint
npm run lint:fix    # Fixa auto-fixable lint issues
```

## 📁 Projektstruktur

```
src/
├── components/
│   ├── Calculator/          # Huvudkalkylatorn
│   │   ├── inputs/         # Input komponenter (Slider, AccountType)
│   │   └── results/        # Resultatvyer (Charts)
│   ├── UI/                 # UI komponenter (Tooltip, Skeleton, DarkMode)
│   ├── Goals/              # Målplanerare
│   ├── Comparison/         # Jämförelsevy
│   ├── FIRE/              # FIRE kalkylator
│   └── Scenarios/         # Scenariohantering
├── stores/                # Zustand stores
├── utils/                 # Beräkningsfunktioner
├── constants/            # Skatteregler och presets
└── types/               # TypeScript typer
```

## 💡 Användning

1. Välj kontotyp (ISK, Kapitalförsäkring eller AF)
2. Ange startbelopp och månatliga insättningar
3. Välj årlig avkastning och investeringsperiod
4. Se resultat i interaktiva diagram och tabeller
5. Jämför olika scenarior med scenariohanteraren

## 🎨 Designsystem

### Färger
```css
--color-olive: #5a6b3f;           /* Huvudfärg */
--color-terracotta: #c86b4a;      /* Accent */
--color-cream: #f5f1e8;           /* Bakgrund */
--color-growth: #4a7c59;          /* Tillväxt */
--color-tax: #c86b4a;             /* Skatt */
--color-fee: #d4834f;             /* Avgifter */
```

### Typografi
- **Display:** Playfair Display (700)
- **Body:** Manrope (400-600)

## 📝 Svenska Skatteregler 2026

### ISK (Investeringssparkonto)
- Schablonskatt på kapitalunderlaget
- Skattefritt upp till 300,000 kr

### Kapitalförsäkring
- Årlig avkastningsskatt på genomsnittligt värde
- Skattefritt upp till 300,000 kr

### Aktie- och fondkonto (AF)
- 30% kapitalvinstskatt på realiserade vinster
- Fondskatt 0.12% årligen
- Ingen skattefri gräns

## 🚢 Deployment

Projektet är deployt till Azure:
- **Storage:** Azure Storage Static Website
- **CDN:** Azure Front Door
- **SSL:** Managed certificates
- **Domain:** ranta.moderncloud.se

## 📄 Licens

MIT

## 🤝 Bidra

Bidrag är välkomna! Öppna en issue eller skicka en pull request.

---

🤖 Skapad med [Claude Code](https://claude.com/claude-code)
