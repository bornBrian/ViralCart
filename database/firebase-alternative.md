# Firebase Alternative Configuration

If you prefer Firebase over Supabase, here's the equivalent setup:

## Firestore Data Model

### Products Collection
```javascript
// Collection: products
{
  id: string (auto-generated),
  title: string,
  slug: string,
  description: string,
  price: string,
  affiliateUrl: string,
  images: string[],
  tags: string[],
  availableCountries: string[],
  createdAt: timestamp
}
```

### Clicks Collection
```javascript
// Collection: clicks
{
  id: string (auto-generated),
  productId: string,
  createdAt: timestamp,
  country: string | null
}
```

## Firebase Configuration

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
```

## Environment Variables for Firebase

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - read by anyone, write by no one (use admin SDK)
    match /products/{productId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Clicks - write by anyone, read by no one (use admin SDK)
    match /clicks/{clickId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

## Storage Rules (for product images)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if false; // Upload via admin only
    }
  }
}
```
