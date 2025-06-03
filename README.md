# Featured Events Page

A responsive single-page website showcasing crypto events worldwide. The page features a navigation bar, a hero section, and a "Featured Events" section with 3 event cards, including a search bar to filter events by name and dynamic event data rendering. Built with modern web technologies, the site is mobile- and tablet-friendly, meeting the requirements for a clean, interactive UI.

## Technologies Used
- **HTML5**: Page structure.
- **React**: Component-based architecture for dynamic UI.
- **Tailwind CSS**: Responsive and utility-first styling.
- **JavaScript**: Search functionality and dynamic event rendering.
- **Lucide-React**: Icons for event cards and search bar.
- **Vite**: Build tool and development server for fast development.

## Prerequisites
To run this project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher, LTS recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)

## How to Run
Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/isb_events.git
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Website**:
   - Open your browser and navigate to `http://localhost:5173` (or the port Vite assigns).

## Extra Features
- **Search Bar**: Filters events by name in real-time (case-insensitive, with a "No events found" message for empty results).
- **Dynamic Event Data**: Events are rendered from a JavaScript array, simulating JSON data fetching.
- **Responsive Design**: 
  - Mobile (<576px): Single-column event cards, collapsed navbar.
  - Tablet (576–992px): Two-column event cards.
  - Desktop (>992px): Three-column event cards.
- **Hover Effects**: Event cards scale up slightly on hover for enhanced interactivity.
- **Islamabad-Specific Content**: Events feature local venues (e.g., F-9 Park, NIC Islamabad, Centaurus Mall) for relevance.

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
