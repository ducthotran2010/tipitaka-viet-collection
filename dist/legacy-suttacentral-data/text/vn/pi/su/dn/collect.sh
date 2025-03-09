#!/bin/bash

# Set script directory as working directory
cd "$(dirname "$0")"

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directory to scan
SCAN_DIR="."

echo -e "${BLUE}Starting file collection from:${NC} $SCAN_DIR"

# Create JSON array structure
echo "[" > sources.json

# Find all .md files and process them
first=true
find "$SCAN_DIR" -name "*.md" | while read -r file; do
    # Get relative path
    rel_path=${file#"$SCAN_DIR/"}
    # Get name without extension
    name=$(awk '/^# /{sub(/^# /, ""); print; exit} {print}' "$file" | tr '\n' '\r' | sed 's/\r/\\n/g' | sed -E 's/(\\n){2,}/\\n/g; s/\\n$//')
    
    # Add comma if not first entry
    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> sources.json
    fi
    
    # Add JSON entry
    printf '  {\n    "name": "%s",\n    "path": "%s"\n  }' "$name" "$rel_path" >> sources.json
done

# Close JSON array
echo -e "\n]" >> sources.json

# Format JSON file
if command -v jq >/dev/null 2>&1; then
    jq '.' sources.json > temp.json && mv temp.json sources.json
    echo -e "${GREEN}JSON formatted successfully using jq${NC}"
fi

echo -e "${GREEN}Collection complete! Output saved to:${NC} sources.json"