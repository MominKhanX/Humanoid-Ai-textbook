# Quickstart Guide: Physical AI & Humanoid Robotics Textbook

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git
- Basic knowledge of Markdown and JavaScript

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/physical-ai-textbook.git
cd physical-ai-textbook
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm start
# or
yarn start
```

This will start the development server at `http://localhost:3000` with hot reloading.

## Project Structure Overview

```
physical-ai-textbook/
├── docs/                    # Content files for the textbook
│   ├── module-1-ros2/       # Module 1 content (The Robotic Nervous System)
│   ├── module-2-digital-twin/   # Module 2 content (The Digital Twin - Gazebo & Unity)
│   ├── module-3-ai-brain/       # Module 3 content (The AI-Robot Brain - NVIDIA Isaac)
│   ├── module-4-vla/            # Module 4 content (Vision-Language-Action)
│   └── capstone-project/        # Capstone project integrating all modules
├── src/                     # Custom React components and pages
├── static/                  # Static files (images, diagrams)
│   └── img/                 # Images and diagrams
├── docusaurus.config.js     # Docusaurus configuration
└── sidebars.js              # Sidebar navigation configuration
```

## Creating Content

### Adding a New Page
1. Create a new `.md` or `.mdx` file in the appropriate module directory
2. Add frontmatter with metadata:

```markdown
---
title: Your Page Title
sidebar_position: 1
description: Brief description of the page content
---

# Your Page Title

Your content here...
```

### Adding Code Examples with Tabs
Use Docusaurus tabs to show Python and C++ examples:

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python (rclpy)" default>

```python
# Python code example
import rclpy
from rclpy.node import Node
```

</TabItem>
<TabItem value="cpp" label="C++ (rclcpp)">

```cpp
// C++ code example
#include "rclcpp/rclcpp.hpp"
```

</TabItem>
</Tabs>
```

### Adding Diagrams
1. Place your image in `static/img/` in the appropriate subdirectory
2. Reference it in your content:

```markdown
![Diagram Description](/img/path/to/your-diagram.png)
```

## Building for Production

```bash
npm run build
# or
yarn build
```

This creates a `build/` directory with statically exported content ready for deployment.

## Deployment

The site is configured for GitHub Pages deployment. After building, the content can be served from the `gh-pages` branch.

### Deploy to GitHub Pages
```bash
npm run deploy
# or
yarn deploy
```

This command builds the site and pushes the built content to the `gh-pages` branch.

## Multilingual Support

The site is configured for English and Urdu. To add Urdu translations:

1. Create a `ur/` subdirectory in the appropriate content directory
2. Add translated content with the same file structure
3. Update `docusaurus.config.js` to include the Urdu locale if not already present

## Useful Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve built content locally
- `npm run deploy` - Deploy to GitHub Pages
- `npm run swizzle` - Customize Docusaurus themes/components

## Configuration Files

- `docusaurus.config.js` - Main configuration (site title, description, plugins, etc.)
- `sidebars.js` - Navigation structure
- `static/` - Static assets (images, documents)
- `src/` - Custom React components and pages

## Content Guidelines

1. Follow the 13-week curriculum structure with 4 modules
2. Use semantic headings (H1/H2/H3) for RAG readiness
3. Include learning outcomes for each module
4. Provide both Python (primary) and C++ (optional) code examples
5. Add appropriate diagrams and visual aids
6. Include hands-on lab exercises and assignments