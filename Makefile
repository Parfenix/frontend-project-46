install:
		npm ci

gendiff:
		node bin/gendiff.js -h

publish:
		npm publish --dry-run

run:
	node bin/gendiff __fixtures__/file1.json __fixtures__/file2.json

test:
	gendiff __fixtures__/file1.json __fixtures__/file2.json
