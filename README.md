# FITORA — AI-Powered Personalized Clothing Customizer

> **"Your Fit. Your Style. Your Creation."**  
> *"Instead of making customers fit into clothes, FITORA makes clothes fit the customer."*

---

## 1. Project Overview

**FITORA** is a next-generation personalized apparel customization platform engineered to eliminate the sizing guesswork and design rigidity inherent in modern fast fashion. Traditional ready-to-wear retail forces individuals into arbitrary, standardized sizing buckets (`S`, `M`, `L`, `XL`, `XXL`) that fail to account for unique body proportions, shoulder slopes, torso drops, or personal comfort preferences.

FITORA bridges the gap between digital generative customizer technology and industrial garment production by delivering a seamless 6-step bespoke journey:

$$\text{Select Garment} \longrightarrow \text{Enter Measurements} \longrightarrow \text{Customize Styling} \longrightarrow \text{Smart Recommendations} \longrightarrow \text{Live Preview} \longrightarrow \text{Tech-Pack Specification}$$

---

## 2. Problem Statement

1. **The Standard Sizing Dilemma**: Off-the-rack clothing is manufactured against statistical averages. A shirt that fits comfortably at the collar may be oversized at the waist or restrictive across the shoulders.
2. **High Return Rates & Fabric Waste**: Over 30% of online fashion purchases are returned due to poor fit, leading to massive reverse-logistics emissions and discarded inventory.
3. **Limited Style Autonomy**: Consumers cannot easily select their preferred neckline, sleeve length, chest pocket count, and textile weave without paying high bespoke tailoring markups.
4. **Disconnection from Manufacturing**: Bespoke tailoring traditionally relies on paper notes and manual tailoring measurements, lacking structured CAD-ready specifications that modern apparel factories can lay down and cut.

---

## 3. The FITORA Solution

FITORA democratizes bespoke apparel customization through a modern digital platform:
- **Millimeter Precision Tailoring**: Accepts both standard reference sizing and exact custom measurements (Chest, Shoulder, Waist, Sleeve, Length in cm).
- **Interactive Component Customization**: Real-time control over fabric weave, color hue (including hex picker), silhouette contour, sleeve length, collar geometry, and utility pockets.
- **Context-Aware Smart Recommendation Engine**: Intelligent rule-based engine suggesting optimal textile breathability, colors, and drape based on intended occasion, climate/weather, and style priorities.
- **Reactive Live Garment Visualization**: High-fidelity dynamic SVG illustration that renders every color, weave texture, pocket, and sleeve modification in real time.
- **Factory-Ready Production Specifications**: Compiles an industrial tech pack complete with measurement tolerances ($\pm 0.5\text{ cm}$), bill of materials, dynamic costing, and production lead times saved to MongoDB.

---

## 4. Key Features

| Feature | Description |
| :--- | :--- |
| **Garment Archetypes** | Classic Bespoke Shirt (Primary MVP), Modern Tailored T-Shirt, and Ethnic Longline Kurta. |
| **Fit Dual-Engine** | Toggle seamlessly between calibrated standard presets (S–XXL) and bespoke centimeter inputs with real-time range validation. |
| **Styling Suite** | 5 preset luxury tones + custom HEX picker, 4 fabric weaves (Combed Cotton, Washed Linen, Selvedge Denim, Poly Blend), 3 fit silhouettes, 3 sleeve styles, 3 collar cuts, and 0–2 chest pockets. |
| **Smart Recommendation** | Rule engine analyzing Occasion (Casual, College, Formal, Party), Weather (Hot, Moderate, Cold), and Priority (Comfort, Style) with 1-click apply to the garment. |
| **Dynamic Cost & Lead Time** | Real-time calculation of material surcharges, custom CAD drafting fees, and factory lead time (3–5 days, 5–7 days, or 7–10 days). |
| **Tech Pack & Print Export** | Industrial specification card with unique Spec Ref ID, print-ready CSS stylesheet for physical factory job sheets, and MongoDB persistence. |

---

## 5. Technology Stack

### Frontend
- **React.js (v18)**: Component-driven reactive UI architecture.
- **React Router DOM (v6)**: Client-side routing (`/`, `/customize`, `/specification`).
- **CSS3 & Design Tokens**: Custom vanilla design system adhering to fashion-tech aesthetics (neutral canvas, indigo accents, subtle glassmorphism, responsive grid).
- **Lucide React**: Crisp iconography for tailoring tools and attributes.
- **Vite (v5)**: Lightning-fast development server and optimized production bundler.

### Backend
- **Node.js**: Asynchronous JavaScript runtime.
- **Express.js (v4)**: RESTful API routing, JSON body parsing, and CORS configuration.
- **Mongoose (v8)**: Object Data Modeling (ODM) for MongoDB data validation and schema integrity.
- **Dotenv**: Environment variable isolation.

### Database
- **MongoDB**: NoSQL document store persisting bespoke garment designs, measurements, and production metadata.

---

## 6. Project Directory Structure

```text
fitora/
│
├── client/                               # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                # Sticky navigation with brand tagline
│   │   │   ├── Hero.jsx                  # High-fashion landing showcase & feature cards
│   │   │   ├── GarmentSelector.jsx       # Step 1: Shirt, T-Shirt, Kurta selector
│   │   │   ├── MeasurementForm.jsx       # Step 2: Standard & custom measurement inputs
│   │   │   ├── CustomizationPanel.jsx    # Step 3: Color, fabric, fit, sleeves, collar, pockets
│   │   │   ├── GarmentPreview.jsx        # Live reactive SVG garment renderer & guides
│   │   │   ├── RecommendationCard.jsx    # Step 4: Smart rule-based recommendation engine
│   │   │   ├── PriceSummary.jsx          # Step 5: Dynamic price calculator & production time
│   │   │   └── SpecificationCard.jsx     # Step 6: Factory tech-pack specification sheet
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx                  # Landing page & workflow explanation
│   │   │   ├── Customizer.jsx            # 6-step customizer workspace (split layout)
│   │   │   └── Specification.jsx         # Database archive & tech-pack inspector
│   │   │
│   │   ├── App.jsx                       # Router setup
│   │   ├── main.jsx                      # React DOM entry point
│   │   └── index.css                     # Fashion-tech design system & tokens
│   │
│   ├── index.html                        # HTML template with Google Fonts
│   ├── vite.config.js                    # Vite configuration with API proxy
│   └── package.json                      # Client dependencies
│
├── server/                               # Backend Express & MongoDB API
│   ├── models/
│   │   └── Design.js                     # Mongoose Design Schema
│   │
│   ├── routes/
│   │   ├── designRoutes.js               # /api/designs CRUD endpoints
│   │   └── recommendationRoutes.js       # /api/recommendations endpoint
│   │
│   ├── controllers/
│   │   ├── designController.js           # CRUD business logic & price verification
│   │   └── recommendationController.js   # Sartorial rule-based recommendation logic
│   │
│   ├── server.js                         # Express entrypoint & MongoDB connection
│   ├── .env                              # Server environment variables
│   ├── .env.example                      # Template environment variables
│   └── package.json                      # Server dependencies
│
├── package.json                          # Root convenience scripts
└── README.md                             # Documentation
```

---

## 7. Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongod`) OR MongoDB Atlas cloud cluster

### Step 1: Clone or Navigate to Directory
```bash
cd fitora
```

### Step 2: Install Server Dependencies
```bash
cd server
npm install
```

### Step 3: Install Client Dependencies
```bash
cd ../client
npm install
```

---

## 8. Environment Variables Setup

Create a `.env` file in the `server/` directory (a pre-configured `.env` is included, and `.env.example` provides the template):

```env
PORT=5000
# For local MongoDB:
MONGO_URI=mongodb://127.0.0.1:27017/fitora

# Or for MongoDB Atlas Cloud:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fitora?retryWrites=true&w=majority

CLIENT_URL=http://localhost:5173
```

> **Note on Database Connection**: If MongoDB is not running locally, the server starts up gracefully and handles errors with friendly notifications. To enable saving and persistent archiving of tech packs, start your local MongoDB daemon or provide a free MongoDB Atlas connection string.

---

## 9. How to Run the Application

### Option A: Separate Terminals (Recommended)

**Terminal 1 — Backend API:**
```bash
cd server
npm run dev
# Server starts on http://localhost:5000
```

**Terminal 2 — Frontend Application:**
```bash
cd client
npm run dev
# Client starts on http://localhost:5173
```

### Option B: From the Root Directory
```bash
# Start backend:
npm run server

# Start frontend:
npm run client
```

Now open **`http://localhost:5173`** in your browser.

---

## 10. API Endpoints

All endpoints use `application/json` format.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and database connection state |
| `POST` | `/api/recommendations` | Calculate fabric, color, and fit recommendations |
| `POST` | `/api/designs` | Validate and store new garment specification in MongoDB |
| `GET` | `/api/designs` | Retrieve recent saved garment specifications |
| `GET` | `/api/designs/:id` | Retrieve single design specification by MongoDB ID |
| `PUT` | `/api/designs/:id` | Update an existing design specification |
| `DELETE` | `/api/designs/:id` | Delete a specification record |

### Example: POST /api/recommendations
**Request Body:**
```json
{
  "garment": "Shirt",
  "occasion": "Formal",
  "weather": "Hot",
  "priority": "Comfort"
}
```
**Response Body (200 OK):**
```json
{
  "success": true,
  "data": {
    "fabric": "Linen",
    "color": "White",
    "fit": "Regular",
    "reason": "Linen delivers premium breathability and natural temperature regulation in warm weather. Regular fit ensures a sharp, tapered profile aligning with boardroom standards.",
    "inputs": {
      "garment": "Shirt",
      "occasion": "Formal",
      "weather": "Hot",
      "priority": "Comfort"
    }
  }
}
```

---

## 11. Hackathon Presentation Walkthrough

When presenting FITORA to judges, follow this concise demonstration storyline:

1. **The Hook (Home Page)**:
   - Highlight the branding: **"Your Fit. Your Style. Your Creation."**
   - Emphasize the core thesis: *"Instead of making customers fit into clothes, FITORA makes clothes fit the customer."*
2. **Garment & Custom Measurements (Steps 1 & 2)**:
   - Select the default **Shirt**.
   - Switch from standard **M** sizing to **Custom Measurements**.
   - Input custom chest ($41\text{ cm}$), shoulder ($18.5\text{ cm}$), and waist ($35\text{ cm}$).
   - Notice the instant validation (try entering a negative number to show error handling).
3. **Live Styling & SVG Engine (Step 3)**:
   - Switch color to **Navy Blue** or use the **Custom Hex Picker**.
   - Switch fabric to **Selvedge Denim** (notice the micro-weave texture and +₹120 surcharge).
   - Change sleeve to **Short** or add **2 Pockets** — observe the live SVG illustration update in real time.
4. **Smart Recommendation Engine (Step 4)**:
   - Select *Hot Weather*, *Party*, and *Style*.
   - Click **Generate Smart Recommendation**.
   - Show the recommendation reasoning.
   - Click **Apply Recommendation to Customizer** — demonstrate how it seamlessly overrides and updates the active design.
5. **Commercials & Factory Tech Pack (Steps 5 & 6)**:
   - View transparent itemized pricing ($₹600 + ₹100 + ₹120 + \dots$) and estimated production time ($5\text{--}7\text{ days}$).
   - Review the complete industrial manufacturing tech pack.
   - Click **Save Design** to persist the document directly into MongoDB.
   - Click **Print / Export Tech Pack** to demonstrate factory-ready physical printing.
   - Navigate to **Saved Specs** to show MongoDB persistence and retrieval.

---

## 12. Future Enhancements

- **Computer Vision Body Scanning**: Integration with smartphone camera feeds to extract anthropometric measurements using MediaPipe / computer vision pose landmark estimation.
- **Generative AI Texture Synthesis**: Integration with generative diffusion models for custom embroidery patterns and bespoke monogram rendering.
- **Factory Direct API**: Direct EDI/API integration into automated CNC fabric cutting machines (Gerber / Lectra) via standard DXF/AAMA export formats.
- **AR Virtual Mirror**: WebXR / Three.js 3D draped cloth simulation on user avatar.

---

## 13. License

Developed for Hackathon Demonstration. FITORA &copy; 2026. All rights reserved.