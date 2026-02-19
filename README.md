# Solapur Smart Water Management & Conservation Portal

An advanced municipal monitoring platform designed for the **Solapur Municipal Corporation** to ensure equitable water distribution, reduce Non-Revenue Water (NRW), and optimize infrastructure longevity.

## 🏛️ Project Vision
Aligned with the **National Smart City Mission** and **AMRUT 2.0**, this portal serves as a real-time telemetry bridge between municipal infrastructure and administrative oversight. It leverages IoT-driven data to resolve distribution inequities and enhance operational transparency.

## 🚀 Key Features

### 1. Intelligence & Analytics
- **Live Distribution Map**: Real-time Leaflet-based visualization of 48 wards with node health status.
- **Pressure Equity Analytics**: Side-by-side comparison of ward-level pressure to detect and resolve "Dry-Tap" scenarios in peripheral zones.
- **Water Balance Dashboard**: A visual hydraulic flow audit tracking water from Source (Ujani Dam) → Treatment → Transmission Loss → Consumption.
- **AI Demand Forecasting**: Predictive engine providing 7-day demand projections to optimize reservoir filling and plant output.

### 2. Smart Infrastructure
- **Automated Valve Simulation**: Interface for simulating "Zero-Variance Pressure Balancing" (ZVPB) sequences.
- **Tail-End Risk Indicators**: Automated labeling of nodes at risk of critical pressure drops due to elevation or distance.
- **Technical Escalation**: Incident management system with impact assessments (Population Affected, Pressure Drop, SLA Deadlines).

### 3. Modern UI/UX
- **Official Registry Aesthetic**: A high-contrast, professional interface designed for municipal command centers.
- **Persistent Theme Toggle**: Seamless transition between Light and Dark (Gov-Navy) modes.
- **Responsive Framework**: Fully optimized for command center displays and field-officer mobile devices.

## 🛠️ Tech Stack
- **Core**: React 18, Vite
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **Charts**: Recharts
- **Maps**: React-Leaflet
- **Icons**: Lucide React
- **State/Theme**: React Context API & LocalStorage Persistence

## 📦 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bhuvaneshrn/Solapur_SmartWater_Dashboard.git
   cd Solapur_SmartWater_Dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build
   ```

## 📜 Compliance
This dashboard is built to comply with **SMC Municipal Disclosure Standards**, providing a transparent feed for both administrative officers and civic research groups.

---
*Developed for the Solapur Municipal Corporation Smart City Hackathon.*
