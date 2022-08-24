#!/bin/bash
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

DIST_DIR="$SCRIPT_DIR/dist"
SRC_DIR="$DIST_DIR/src"
ARTIFACT_DIR="$DIST_DIR/artifacts"

if [[ ! -d "$DIST_DIR" ]]
then
    echo "$DIST_DIR not exists on your filesystem."
    mkdir "$DIST_DIR"
fi

if [[ ! -d "$SRC_DIR" ]]
then
    echo "$SRC_DIR not exists on your filesystem."
    mkdir "$SRC_DIR"
    echo -e "//placeholder\n" > $SRC_DIR/main.js
fi

if [[ ! -d "$ARTIFACT_DIR" ]]
then
    echo "$ARTIFACT_DIR not exists on your filesystem."
    mkdir "$ARTIFACT_DIR"
fi

cd "$SRC_DIR"
zip "$ARTIFACT_DIR/main.zip" "main.js"
echo -e "Artifact zipped.\n"
