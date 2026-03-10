#!/bin/bash
# A simple script to automate your specific workflow

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "🚀 Starting sync for $BRANCH..."

# Step 1: Add and Commit
read -p "Enter commit message: " msg
git add .
git commit -m "$msg"

# Step 2: Push current feature branch
git push origin $BRANCH

# Step 3: Merge into Main
echo "🔄 Merging $BRANCH into main..."
git checkout main
git pull origin main
git merge $BRANCH

# Step 4: Final Push
git push origin main

# Step 5: Return to work
git checkout $BRANCH
echo "✅ Everything is synced and pushed!"
