# Penguin Pay 🐧

## Time Savers

- Storing exchange rate APP_ID in code & hitting the API from the frontend
- Using native IEEE 754 floating point for currency conversion arithmetic and `.toFixed(2)` instead of a fixed point library like Decimal.js
- Not solving `TextInput` behavior where invalid character entries flash before being erased
- Storing strings in `copy` object, no `i18n` translations
- No input mask on Phone Number
- The 'onBlur' prop of CurrencyConversionInput has weird usability if value is 0.00

Note: this is an [Expo](https://expo.dev) project created with [create-expo-app](https://www.npmjs.com/package/create-expo-app)

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
