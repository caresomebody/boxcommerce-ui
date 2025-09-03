#!/bin/sh
# ---- Edit these values, then run: sh runner.sh ----

# Cucumber tags (empty = run all). Example: '@smoke and not @wip'
TAGS='@signup'

# Browser: chromium | firefox | webkit
BROWSER='chromium'

# Headless: 'true' or 'false'
HEADLESS='true'

# Parallel workers
PARALLEL='2'

SCREENSHOTS_DIR='screenshots'
REPORTS_DIR='reports'
# ---------------------------------------------------

# Validate BROWSER
case "$BROWSER" in
  chromium|firefox|webkit)
    ;;
  *)
    echo "❌ Error: BROWSER must be 'chromium', 'firefox', or 'webkit'"
    exit 1
    ;;
esac

# Validate HEADLESS
case "$HEADLESS" in
  true|false)
    ;;
  *)
    echo "❌ Error: HEADLESS must be 'true' or 'false'"
    exit 1
    ;;
esac

# Export environment variables so World/steps can read them
export BROWSER HEADLESS

# ---- Clean screenshots folder safely ----
if [ -n "$SCREENSHOTS_DIR" ]; then
  echo "🧹 Clearing $SCREENSHOTS_DIR/"
  rm -rf "$SCREENSHOTS_DIR" 2>/dev/null || true
  mkdir -p "$SCREENSHOTS_DIR"
fi

# Create reports directory
if [ -n "$REPORTS_DIR" ]; then
  echo "🧹 Clearing $REPORTS_DIR/"
  rm -rf "$REPORTS_DIR" 2>/dev/null || true
  mkdir -p "$REPORTS_DIR"
fi

echo "▶ Running Cucumber Tests"
echo "  BROWSER=$BROWSER   HEADLESS=$HEADLESS   PARALLEL=$PARALLEL"
[ -n "$TAGS" ] && echo "  TAGS=$TAGS"
echo

# Build cucumber command with conditional parameters
CUCUMBER_CMD="npx cucumber-js"

# Add tags if specified
if [ -n "$TAGS" ]; then
  CUCUMBER_CMD="$CUCUMBER_CMD --tags \"$TAGS\""
fi

# Add parallel workers
CUCUMBER_CMD="$CUCUMBER_CMD --parallel $PARALLEL"

# Add format options
CUCUMBER_CMD="$CUCUMBER_CMD --format progress --format json:$REPORTS_DIR/cucumber-report.json --format html:$REPORTS_DIR/cucumber-report.html"

# Execute the command
eval $CUCUMBER_CMD

# Check exit status
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo "All tests passed!"
  echo "Reports available at:"
  echo "   HTML: $REPORTS_DIR/cucumber-report.html"
  echo "   JSON: $REPORTS_DIR/cucumber-report.json"
else
  echo "Some tests failed (exit code: $EXIT_CODE)"
  echo "Reports available at:"
  echo "   HTML: $REPORTS_DIR/cucumber-report.html"
  echo "   JSON: $REPORTS_DIR/cucumber-report.json"
  if [ -d "$SCREENSHOTS_DIR" ] && [ "$(ls -A $SCREENSHOTS_DIR 2>/dev/null)" ]; then
    echo "Screenshots saved in: $SCREENSHOTS_DIR/"
  fi
fi

exit $EXIT_CODE