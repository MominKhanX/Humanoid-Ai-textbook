// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'homepage/index',
      label: 'Home',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      items: [
        'module-1-ros2/week-1/intro',
        'module-1-ros2/week-2/intro',
        'module-1-ros2/week-3/intro',
        'module-1-ros2/week-4/intro',
        'module-1-ros2/week-5/intro',
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      items: [
        'module-2-digital-twin/week-4/intro',
        'module-2-digital-twin/week-5/intro',
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac™)',
      items: [
        'module-3-ai-brain/week-6/intro',
        'module-3-ai-brain/week-7/intro',
        'module-3-ai-brain/week-8/intro',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        'module-4-vla/week-9/intro',
        'module-4-vla/week-10/intro',
        'module-4-vla/week-11/intro',
        'module-4-vla/week-12/intro',
        'module-4-vla/week-13/intro',
      ],
    },
  ],
};

module.exports = sidebars;