# Upgrading to Shesha v0.45

This guide explains how to upgrade an existing Shesha application to **v0.45.x**.

> **Note:** At the time this documentation was written, **0.45.1** is the latest stable release. Replace the version number with the latest available release if a newer version exists.

## 1. Update the backend Shesha version

Open the following file:

```text
backend/src/<Module.Name>.Host/Directory.Build.props
```

Update the `SheshaVersion` property:

```xml
<SheshaVersion>0.45.1</SheshaVersion>
```

After updating the version, rebuild the solution to restore the latest Shesha packages.

---

## 2. Update the Admin Portal package

Open:

```text
adminportal/package.json
```

Update the Shesha React package:

```json
"@shesha-io/reactjs": "0.45.1"
```

---

## 3. Upgrade Ant Design

In the same `package.json` file, update Ant Design:

**From**

```json
"antd": "5.17.4"
```

**To**

```json
"antd": "5.27.6"
```

---

## 4. Install Navigation Guard

Shesha v0.45 uses **next-navigation-guard**.

Add the following dependency to `package.json`:

```json
"next-navigation-guard": "^0.2.0"
```

Then install the new packages:

```bash
npm install
```

or

```bash
yarn install
```

---

## 5. Add Configuration Studio

Shesha v0.45 introduces **Configuration Studio**.

Create the following folder if it does not already exist:

```text
adminportal/src/app/configuration-studio
```

Create a file named:

```text
page.tsx
```

Paste the following code:

```tsx
"use client";

import React from "react";
import {
  ConfigurationStudio,
  PageWithLayout,
} from "@shesha-io/reactjs";

const Page: PageWithLayout = () => {
  return <ConfigurationStudio />;
};

export default Page;
```

---

## 6. Update the Root Layout

Open:

```text
adminportal/src/app/layout.tsx
```

Add the following imports:

```tsx
import { AppProvider } from "./app-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NavigationGuardProvider } from "next-navigation-guard";
```

Wrap your application with the required providers.

A typical implementation should look similar to:

```tsx
<AntdRegistry>
  <NavigationGuardProvider>
    <AppProvider>
      {children}
    </AppProvider>
  </NavigationGuardProvider>
</AntdRegistry>
```

> **Note:** If your project already contains additional providers, simply include `NavigationGuardProvider` and `AntdRegistry` alongside your existing provider hierarchy.

---

## 7. Update Hangfire Authorization Filter

Open:

```text
/backend/src/PBF.MembershipManagement.Web.Core/Hangfire/HangfireAuthorizationFilter.cs
```

Add the following using statement:

```csharp
using Shesha.Authentication.JwtBearer;
```

---

## 8. Build and Verify

After completing the upgrade:

1. Restore all NuGet and npm packages.
2. Rebuild the backend solution.
3. Rebuild the Admin Portal.
4. Run the application.
5. Verify that:

   * Configuration Studio is accessible.
   * Authentication works correctly.
   * Hangfire dashboard authorization still functions.
   * The Admin Portal loads without runtime errors.
