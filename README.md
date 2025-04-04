# TV Scene Prototype

A React-based interactive TV simulator with light/dark mode and ambient room effects. This prototype creates a realistic TV viewing experience that responds to environmental lighting changes.

![TV Scene Prototype](https://via.placeholder.com/800x450?text=TV+Scene+Prototype)

## 🌟 Features

- **Interactive TV Display**: Simulated TV with realistic display properties
- **Light/Dark Mode**: Toggle between light and dark room environments
- **Responsive Design**: Adapts to different screen sizes
- **YouTube Integration**: Embedded YouTube video player
- **Display Settings**: Adjustable brightness and contrast
- **Debug Mode**: Optional debug overlay for development

## 🧰 Technology Stack

- React 18
- TypeScript
- CSS3
- React YouTube for video embedding

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tv-scene-prototype.git
   ```

2. Navigate to the project directory:
   ```bash
   cd tv-scene-prototype
   ```

3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and go to `http://localhost:3000` to view the prototype.

## 📂 Project Structure

```
tv-scene-prototype
├── src
│   ├── components
│   │   ├── TV.tsx           # TV component with YouTube player
│   │   ├── TVStand.tsx      # TV stand component
│   │   └── LightSwitch.tsx  # Light switch toggle component
│   ├── styles
│   │   ├── tv.css           # Styles for TV and scene
│   │   └── lightSwitch.css  # Styles for light switch component
│   ├── App.tsx              # Main application component
│   └── index.tsx            # Entry point of the application
├── public
│   └── index.html           # Main HTML file
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## 📝 Usage

The TV prototype provides a simulated TV environment with the following interactive elements:

- Use the light switch in the top-left corner to toggle between light and dark room environments
- The TV display automatically adjusts brightness and contrast based on room lighting
- Toggle the Debug button in the top-right corner to view component dimensions and props

## 🔧 Customization

You can customize the TV experience by modifying the following:

- Change the YouTube video by updating the videoId in the `TV.tsx` component
- Adjust the default display settings in `App.tsx`
- Modify room colors and textures through the wallColor and wallTexture props

