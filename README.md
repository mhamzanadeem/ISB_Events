# EventsISB - Islamabad Events Discovery Platform

A modern, responsive React application for discovering local events in Islamabad, Pakistan.

## Features

- 🔍 **Real-time Search**: Filter events by name, description, category, or location
- 📱 **Responsive Design**: Mobile-first approach with tablet and desktop optimizations
- 🎨 **Modern UI**: Clean design with Tailwind CSS
- ⚡ **Fast Performance**: Optimized React components with context API
- 🏛️ **Local Focus**: Islamabad-specific events and locations

## Tech Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd islamabad-events
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

\`\`\`
src/
├── components/
│   ├── ui/
│   │   ├── Button.js
│   │   └── Input.js
│   ├── EventCard.js
│   ├── FeaturedEvents.js
│   ├── Footer.js
│   ├── HeroSection.js
│   └── Navbar.js
├── context/
│   └── EventsContext.js
├── data/
│   └── eventsData.js
├── App.js
├── index.js
└── index.css
\`\`\`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Customization

### Adding New Events

Edit `src/data/eventsData.js` to add new events:

\`\`\`javascript
{
  id: 9,
  title: "Your Event Title",
  description: "Event description",
  date: "2024-02-10",
  time: "7:00 PM - 9:00 PM",
  location: "Event Location, Islamabad",
  category: "Category Name",
  attendees: 100,
  image: "image-url",
  price: "PKR 500",
}
\`\`\`

### Styling

The project uses Tailwind CSS. Customize colors and styling in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles

## Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates a `build` folder with optimized production files.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `build` folder to Netlify

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact [your-email@example.com]
