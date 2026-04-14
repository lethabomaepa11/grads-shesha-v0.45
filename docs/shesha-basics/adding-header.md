# Add a Header Form

This guide shows how to expose an existing header form in Shesha and make it visible in the frontend layout.

## Before you begin

Make sure you have the following:

- Access to **Configuration Studio**
- A target module where the header form should be exposed
- Access to the frontend codebase, especially the `adminportal` project

## Expose the Header Form in Configuration Studio

Follow these steps to make the existing header form available in your module.

### 1. Open your module

In **Configuration Studio**, locate the module where you want to use the header form.

- Right-click the module
- Open the available module actions

<img width="366" height="226" alt="Open module actions" src="https://github.com/user-attachments/assets/841d1713-2dc8-4546-a15b-6dbe841e5a57" />

### 2. Select **Expose Existing**

Choose **Expose Existing** from the module options.

This allows you to reuse an existing form instead of creating a new one from scratch.

### 3. Choose the header form

In the selection dialog:

- Locate the header form from the **Shesha** module
- Select it
- Click **OK**

<img width="1135" height="503" alt="Select the existing header form" src="https://github.com/user-attachments/assets/2f2f43d2-2cc7-488b-af0a-aa07f62e1403" />

### 4. Confirm the form is available

After exposing the form:

- Search for the header form in your forms list
- Open it
- Apply any changes required for your project

## Make the Header Visible in the Frontend

After exposing the form, update the frontend layout so the header is rendered in the application.

### 1. Open the layout file

In the `adminportal` project, open:

```tsx
src/app/(main)/layout.tsx
```

### 2. Update `MainLayout`

Edit the `MainLayout` configuration so that it uses your exposed header form.

```tsx
"use client";

import React from "react";
import { MainLayout } from "@shesha-io/reactjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout
      headerFormId={{ module: "your.module.name", name: "header" }}
      noPadding
    >
      {children}
    </MainLayout>
  );
}
```

### 3. Set the correct module name

The `module` value must match the module where you exposed the header form.

If the module name is incorrect, the frontend will not load the expected form.

## Result

Once the layout is updated, you should be able to view the header in the frontend.

## Notes

- Use **Expose Existing** when you want to reuse a form provided by another module
- Confirm that the `module` value in the frontend matches the module used in Configuration Studio
- If the header does not appear, recheck both the exposed form and the frontend layout configuration
