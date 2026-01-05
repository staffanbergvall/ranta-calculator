# New Component

Create a new React component with TypeScript, tests, and proper structure.

## Arguments

$ARGUMENTS should contain the component name (e.g., "Button", "UserProfile").

## Process

### Step 1: Validate Name

- Component name should be PascalCase
- Ensure it doesn't conflict with existing components

### Step 2: Create Component Structure

```
src/components/{{ComponentName}}/
├── index.tsx              # Component implementation
├── {{ComponentName}}.test.tsx    # Tests
└── {{ComponentName}}.module.css  # Styles (if using CSS Modules)
```

### Step 3: Generate Component File

Create `index.tsx` with this template:

```typescript
import React from 'react';
import styles from './{{ComponentName}}.module.css';

interface {{ComponentName}}Props {
  // Define props here
}

export const {{ComponentName}}: React.FC<{{ComponentName}}Props> = (props) => {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
};
```

### Step 4: Generate Test File

Create `{{ComponentName}}.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { {{ComponentName}} } from './index';

describe('{{ComponentName}}', () => {
  it('renders successfully', () => {
    render(<{{ComponentName}} />);
    // Add assertions
  });
});
```

### Step 5: Generate Style File

Create `{{ComponentName}}.module.css`:

```css
.container {
  /* Add styles */
}
```

### Step 6: Export from Index

Add to `src/components/index.ts`:

```typescript
export { {{ComponentName}} } from './{{ComponentName}}';
```

### Step 7: Verify

Run these commands to ensure everything works:
```bash
npm run typecheck
npm run lint
npm test
```

### Step 8: Summary

Show summary of created files and next steps:
- Add props as needed
- Implement component logic
- Write comprehensive tests
- Add to Storybook (if applicable)
