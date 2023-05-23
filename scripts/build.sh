#!/bin/bash

OUTPUT_DIRECTORY=dist
OUTPUT_FILE=$OUTPUT_DIRECTORY/index.html

mkdir -p $OUTPUT_DIRECTORY
marked --input README.md --output $OUTPUT_FILE

HEAD=$(cat public/head.html)

echo "$HEAD
<body class='markdown-body'>
$(cat $OUTPUT_FILE)
</body>
" > $OUTPUT_FILE

echo "$HEAD
<body class='markdown-body'>
<h1>Not Found</h1>
<a href='/'>Home</a>
</body>
" > $OUTPUT_DIRECTORY/404.html
