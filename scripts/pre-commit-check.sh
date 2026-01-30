#!/bin/bash
# Pre-commit hook to prevent cross-project file commits
# Install: cp scripts/pre-commit-check.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

PROJECT_NAME=$(basename $(pwd))
STAGED_FILES=$(git diff --cached --name-only)

echo "🔍 Checking staged files for project: $PROJECT_NAME"

# Define patterns that should NOT appear in each project
if [[ "$PROJECT_NAME" == "Gratisschadeverhalen.nl" ]]; then
    FORBIDDEN_PATTERNS="localcontent|LocalContent|template-card|strategic_plans|implementation_plans|keyword_suggester|project_apex"
    PROJECT_TYPE="Gratisschadeverhalen"
elif [[ "$PROJECT_NAME" == "localcontent-ai" || "$PROJECT_NAME" == "localcontent_ai" ]]; then
    FORBIDDEN_PATTERNS="schade|claim|verzeker|aansprakelijk|letsel|gratisschade"
    PROJECT_TYPE="LocalContent.ai"
else
    echo "⚠️  Unknown project: $PROJECT_NAME - skipping validation"
    exit 0
fi

# Check each staged file
VIOLATIONS=""
for file in $STAGED_FILES; do
    if echo "$file" | grep -iE "$FORBIDDEN_PATTERNS" > /dev/null; then
        VIOLATIONS="$VIOLATIONS\n  ❌ $file"
    fi
done

if [[ -n "$VIOLATIONS" ]]; then
    echo ""
    echo "🚫 COMMIT BLOCKED - Cross-project files detected!"
    echo ""
    echo "The following files appear to belong to a DIFFERENT project:"
    echo -e "$VIOLATIONS"
    echo ""
    echo "Please:"
    echo "  1. Move these files to the correct project directory"
    echo "  2. Run: git reset HEAD <filename> to unstage"
    echo "  3. Commit to the correct repository"
    echo ""
    exit 1
fi

echo "✅ All files belong to $PROJECT_TYPE - commit allowed"
exit 0
