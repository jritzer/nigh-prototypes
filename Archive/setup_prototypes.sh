#!/bin/bash
# Creates the Prototypes folder and copies the latest versions with updated names

BASE="/Users/joshritzer/Desktop/Nigh old docs"
DEST="$BASE/Prototypes"

mkdir -p "$DEST"
mkdir -p "$DEST/Nigh Website"

# App prototypes
cp "$BASE/NighDrops_App_v3_AI.html"          "$DEST/Nigh Drops Mobile.html"
cp "$BASE/NighHost_App_AI.html"               "$DEST/Nigh Host Mobile.html"
cp "$BASE/NighEnterprise_Universal_AI.html"   "$DEST/Nigh Host Web.html"
cp "$BASE/NighSupport_App_AI.html"            "$DEST/Nigh Support.html"

# Website V3 folder → Nigh Website
cp -r "$BASE/Website V3/"* "$DEST/Nigh Website/"

# Foundation page
cp "$BASE/Nigh_Website_V3/foundation.html"    "$DEST/Nigh Foundation Website.html"

# Index hub
cp "$BASE/index.html"                         "$DEST/index.html"

echo ""
echo "Done! Prototypes folder created at:"
echo "  $DEST"
echo ""
ls -1 "$DEST"
