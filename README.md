# Penguin Pay 🐧

|<img width="361" height="742" alt="image" src="https://github.com/user-attachments/assets/30573991-1e44-4c90-8fc8-3baaccfac74b" />|<img width="348" height="727" alt="image" src="https://github.com/user-attachments/assets/502a002e-6f4b-4e37-8e3d-68e996a20255" />|
|---|---|

## Main files
 - [Penguin Pay (main screen)](https://github.com/interview-throwaway123/penguin-pay/blob/main/app/(tabs)/index.tsx)
 - [Form Components](https://github.com/interview-throwaway123/penguin-pay/tree/main/components/formik)
 - [API/Data Fetching](https://github.com/interview-throwaway123/penguin-pay/blob/main/api/useQueryGetRates.ts) (with a free secret)

## Time savers

- Storing exchange rate APP_ID in code & hitting the API from the frontend
- Using native IEEE 754 floating point for currency conversion arithmetic and `.toFixed(2)` instead of a fixed point library like Decimal.js
- Not solving `TextInput` behavior where invalid character entries flash before being erased
- Storing strings in `copy` object, no `i18n` translations
- No input mask on Phone Number
- The 'onBlur' prop of CurrencyConversionInput has weird usability if value is 0.00

- Missed AC: Allow the user to enter an amount they wish to send in USD dollars - no decimal places, decimals are supported

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
