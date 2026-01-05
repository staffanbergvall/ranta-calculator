# Code Review

Perform a comprehensive code review of the specified files or recent changes.

## Target

$ARGUMENTS specifies what to review:
- A file path: Review that specific file
- A directory: Review all files in directory
- "changes" or "diff": Review uncommitted changes
- "pr" or "branch": Review current branch vs main

## Review Checklist

### 1. Code Quality
- [ ] Clear, descriptive naming
- [ ] Functions are focused and reasonably sized
- [ ] No obvious code smells or anti-patterns
- [ ] Comments explain "why", not "what"

### 2. React Best Practices
- [ ] Components follow single responsibility principle
- [ ] Props are properly typed with TypeScript
- [ ] Hooks follow rules (no conditional hooks, proper dependencies)
- [ ] No unnecessary re-renders or expensive computations
- [ ] Proper use of useMemo/useCallback where appropriate

### 3. Error Handling
- [ ] Errors are handled appropriately
- [ ] Error messages are helpful
- [ ] No silent failures
- [ ] Proper error boundaries for components

### 4. Security
- [ ] No hardcoded secrets or credentials
- [ ] Input validation where needed
- [ ] Proper sanitization of user input
- [ ] XSS protection in place

### 5. Testing
- [ ] Tests exist for new functionality
- [ ] Tests cover edge cases
- [ ] Tests are readable and maintainable
- [ ] Component interactions are tested

### 6. Accessibility
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

## Output Format

Provide findings organized by severity:

### 🔴 Critical
Issues that must be fixed before merge.

### 🟡 Important
Issues that should be addressed.

### 🟢 Suggestions
Optional improvements and nitpicks.

### ✅ Highlights
Things done well worth noting.

---

End with a summary and overall recommendation.
