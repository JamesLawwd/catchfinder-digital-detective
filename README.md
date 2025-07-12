# PersonaTrace - Advanced Dating Profile Search

PersonaTrace is a sophisticated web application that helps users find dating profiles across African countries using advanced AI-powered image analysis and phone number lookup.

## 🌟 Features

### 🔍 **Human Photo Validation**
- Advanced face detection using TensorFlow.js
- Only human photos are accepted (non-human images show error)
- Background removal for enhanced analysis
- Fallback detection if AI models fail

### 📱 **Dating App Focus**
- **15+ Dating Platforms:** Tinder, Bumble, Hinge, OkCupid, Match.com, eHarmony, Coffee Meets Bagel, Plenty of Fish, Zoosk, Elite Singles, Christian Mingle, JDate, BlackPeopleMeet, Silver Singles, OurTime, SeniorMatch, FarmersOnly, Jswipe, JSwipe
- **No Social Media:** Focused exclusively on dating platforms
- **Dating-Only Results:** All search results show dating profiles only

### 🌍 **African Focus**
- **20+ African Countries:** Kenya, Nigeria, South Africa, Ghana, Uganda, Tanzania, Ethiopia, Morocco, Egypt, Algeria, Tunisia, Libya, Sudan, Somalia, Rwanda, Burundi, DR Congo, Congo, Gabon, Cameroon, Chad, Niger, Mali, Burkina Faso, Senegal, Gambia, Guinea, Sierra Leone, Liberia, Côte d'Ivoire, Togo, Benin, Central African Republic
- **African Cities:** Nairobi, Mombasa, Lagos, Abuja, Johannesburg, Cape Town, Accra, Kampala, Dar es Salaam, Addis Ababa, and many more
- **Authentic African Names:** Kenyan, Nigerian, and other African names and surnames

### 📊 **Real-Time Analytics**
- Live counter updates with actual profiles found
- Step-by-step search progress
- Real-time validation feedback
- Comprehensive search results

### 📱 **Responsive Design**
- Mobile-first responsive design
- Optimized for all screen sizes
- Touch-friendly interface
- Smooth navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd personatrace
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:8080` (or the port shown in terminal)

### Building for Production

```bash
npm run build
```

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **UI Framework:** Tailwind CSS, shadcn/ui
- **AI/ML:** TensorFlow.js, BlazeFace, Body Segmentation
- **State Management:** React Hooks
- **Routing:** React Router DOM
- **Icons:** Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Dashboard.tsx   # Results display
│   └── SearchInterface.tsx # Search form
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── About.tsx       # About page
│   └── Contact.tsx     # Contact page
├── services/           # Business logic
│   ├── ImageAnalysisService.ts # AI image analysis
│   └── PhoneSearchService.ts   # Phone search logic
├── lib/                # Utility functions
│   └── tensorflow-init.ts # TensorFlow initialization
└── hooks/              # Custom React hooks
```

## 🎯 How It Works

1. **Upload Photo** → AI validates it's a human face
2. **Background Removal** → Enhanced analysis for better matching
3. **Search Results** → Dating profiles from Tinder, Bumble, Hinge, etc. across African countries
4. **Real-time Updates** → Counter updates with actual profiles found

## 🔒 Privacy & Security

- All searches are conducted privately
- No data is stored permanently
- End-to-end encryption
- Compliant with data protection laws

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact us through the Contact page in the application.

---

**PersonaTrace** - Find Dating Profiles Across Africa 🚀
