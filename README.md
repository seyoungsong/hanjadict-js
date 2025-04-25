# HanjaDict (한자사전)

[![npm version](https://img.shields.io/npm/v/@seyoungsong/hanjadict.svg)](https://www.npmjs.com/package/@seyoungsong/hanjadict)
[![npm downloads](https://img.shields.io/npm/dm/@seyoungsong/hanjadict.svg)](https://www.npmjs.com/package/@seyoungsong/hanjadict)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@seyoungsong/hanjadict.svg)](https://bundlephobia.com/package/@seyoungsong/hanjadict)
[![License](https://img.shields.io/github/license/seyoungsong/hanjadict-js.svg)](https://github.com/seyoungsong/hanjadict-js/blob/master/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue.svg)](https://www.typescriptlang.org/)

A lightweight JavaScript/TypeScript package for looking up Hanja (Chinese characters used in Korea) information, specifically focusing on 훈음 (hun-eum).

## Installation

```sh
npm install hanjadict
# or
yarn add hanjadict
```

## Usage

```js
import { lookup, isHanja, pronunciation, tableData } from "hanjadict"

// Look up a Hanja character
const result = lookup("雪")
console.log(result)
// Output: '눈 설'

// Check if a character is Hanja
const isHanjaChar = isHanja("雪")
console.log(isHanjaChar)
// Output: true

// Get only the pronunciation (음/音) part
const pron = pronunciation("雪")
console.log(pron)
// Output: '설'

// Access the raw dictionary data
console.log(Object.keys(tableData).length)
// Output: 53458

// If the character is not found, returns null
const notFound = lookup("xyz")
console.log(notFound) // Output: null
```

## Features

- Fast lookups using a pre-compiled dictionary
- Simple API with intuitive functions
- Comprehensive dictionary of 53,458 characters
- Lightweight with no external dependencies
- TypeScript support
- Access to raw dictionary data for advanced usage

## Available Functions

- `lookup(c)`: Get the full 훈음 information for a character
- `isHanja(c)`: Check if a character is a valid Hanja in the dictionary
- `pronunciation(c)`: Extract only the Sino-Korean pronunciation (음/音) part
- `tableData`: Access the raw dictionary data (as a JavaScript object)

## What is 훈음 (Hun-eum)?

훈음 (訓音) refers to the combined Korean native word meaning (훈/訓) and Sino-Korean pronunciation (음/音) of a Hanja character. For example:

- 雪 (눈 설): "눈" is the 훈 (native Korean word for "snow") and "설" is the 음 (Sino-Korean pronunciation)
- 山 (메 산): "메" is the 훈 (native Korean word for "mountain") and "산" is the 음

This concept is unique to Korean language and helps learners understand both the meaning and pronunciation of Hanja characters.

## Special Formats Handled

The `pronunciation()` function can handle various dictionary formats:

- Normal format: "눈 설" → returns "설"
- Comma-separated: "샘솟을 집, 샘솟을 설" → returns "집"
- Slash-separated: "제비 연/잔치 연" → returns "연"
- Parentheses: "영양 령(영)" → returns "령"
