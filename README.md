#  MoToDo
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* ToDo list React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)
* Android version only

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `npm install`

**Step 4:** Go to node_modules/babel-preset-react-native/configs/main.js and remove line 41: `require('../transforms/transform-symbol-member'),`. This is the conflict of current versions of rxjs 5.rc4 and babel (25/11/2016).

**Step 5:** add:
```java
compile 'com.google.firebase:firebase-core:+'
compile 'com.google.firebase:firebase-messaging:+'
```
into "node_modules/react-native-system-notification/android/build.gradle"

**Step 6:** you also might need to give 777 access rights to the file `\node_modules\react-native\android\com\facebook\react\react-native\0.38.0\react-native-0.38.0.aar`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

1. Install git-hooks => On a Mac `brew install git-hooks` - [Other](https://github.com/icefox/git-hooks/)
2. Setup on Repo => `git hooks --install`

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :open_file_folder: Related Articles
Ignite Documentation - [Ignite Wiki https://github.com/infinitered/ignite/wiki](https://github.com/infinitered/ignite/wiki)
