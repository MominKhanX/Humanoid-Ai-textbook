# Data Model: Physical AI & Humanoid Robotics Textbook

## Entities

### Textbook Module
- **Name**: String (required) - Module name (e.g., "The Robotic Nervous System (ROS 2)")
- **Description**: String (required) - Brief description of the module
- **Weeks**: Integer (required) - Number of weeks in the module
- **LearningOutcomes**: Array of strings (required) - Specific learning outcomes for the module
- **Prerequisites**: Array of strings (optional) - Prerequisites for this module
- **RelatedModules**: Array of Module references (optional) - Modules that connect to this one

### Week
- **Number**: Integer (required) - Week number within the module
- **Title**: String (required) - Week title
- **Objectives**: Array of strings (required) - Learning objectives for the week
- **Topics**: Array of strings (required) - Topics covered in the week
- **Assignments**: Array of Assignment references (optional) - Related assignments
- **ModuleRef**: Module reference (required) - Reference to the parent module

### Content Page
- **Title**: String (required) - Page title
- **Path**: String (required) - File path relative to docs/
- **Frontmatter**: Object (required) - Docusaurus frontmatter metadata
- **Content**: String (required) - Markdown content
- **RelatedPages**: Array of Content Page references (optional) - Related content pages
- **ModuleRef**: Module reference (required) - Reference to the parent module
- **WeekRef**: Week reference (optional) - Reference to the parent week

### Code Example
- **Title**: String (required) - Example title
- **Description**: String (optional) - Description of the example
- **PythonCode**: String (optional) - Python implementation (rclpy)
- **CppCode**: String (optional) - C++ implementation (rclcpp)
- **Language**: Enum (python|cpp|both) (required) - Which language(s) are included
- **RelatedTopic**: String (required) - Topic this example relates to
- **FilePath**: String (required) - Path where example is stored

### Diagram
- **Title**: String (required) - Diagram title
- **Description**: String (optional) - Description of the diagram
- **FileName**: String (required) - File name in static/img/
- **Category**: String (required) - Category (e.g., "wiring", "module-1", etc.)
- **RelatedTopics**: Array of strings (optional) - Topics this diagram relates to

### Assignment
- **Title**: String (required) - Assignment title
- **Description**: String (required) - Detailed assignment description
- **Difficulty**: Enum (easy|medium|hard) (required) - Difficulty level
- **EstimatedTime**: Integer (required) - Estimated completion time in minutes
- **WeekRef**: Week reference (required) - Reference to the parent week
- **ModuleRef**: Module reference (required) - Reference to the parent module

### Lab Setup Guide
- **Title**: String (required) - Guide title
- **Platform**: Enum (on-prem|aws|azure|gcp) (required) - Target platform
- **Description**: String (required) - Description of the setup process
- **Steps**: Array of strings (required) - Step-by-step instructions
- **Requirements**: Array of strings (required) - Hardware/software requirements
- **RelatedModule**: Module reference (required) - Module this guide supports

## Relationships

- Module contains multiple Weeks
- Week contains multiple Content Pages
- Module has multiple Content Pages (for non-week content)
- Module has multiple Code Examples
- Module has multiple Diagrams
- Week has multiple Assignments
- Module has multiple Assignments (capstone project)
- Module has multiple Lab Setup Guides

## Validation Rules

1. **Module Validation**:
   - Name must not be empty
   - Description must be at least 10 characters
   - LearningOutcomes must have at least one item
   - Weeks must be between 1 and 13

2. **Week Validation**:
   - Number must be positive
   - Title must not be empty
   - Objectives must have at least one item
   - Topics must have at least one item

3. **Content Page Validation**:
   - Title must not be empty
   - Path must follow Docusaurus conventions
   - Content must not be empty

4. **Code Example Validation**:
   - At least one language implementation must be provided
   - RelatedTopic must not be empty
   - If language is "both", both PythonCode and CppCode must be provided

5. **Diagram Validation**:
   - Title must not be empty
   - FileName must exist in static/img/
   - Category must be valid

6. **Assignment Validation**:
   - Title must not be empty
   - Description must not be empty
   - EstimatedTime must be positive

7. **Lab Setup Guide Validation**:
   - Title must not be empty
   - Steps must have at least one item
   - Requirements must have at least one item