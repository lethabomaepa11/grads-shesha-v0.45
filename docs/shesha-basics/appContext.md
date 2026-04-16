# Using App Context in Shesha

App Context is one of the most powerful ways to maintain shared state throughout your entire Shesha application. Unlike local or page-level context, App Context persists across pages and components — making it ideal for values that need to be accessible anywhere in the app at any time.

---

## When to Use App Context

App Context is best suited for situations where a value needs to be available globally, without being tied to a specific page or component. Common use cases include:

- **Referencing a single value across the entire app** — such as a currently selected organisation, user role, or global filter that multiple pages depend on
- **Passing data between pages without cluttering the URL** — though for most inter-page navigation cases, **Page Context is recommended** instead, as it keeps concerns better separated

> **Tip:** If you find yourself only needing context between two pages, consider using Page Context first. App Context shines when the value is truly application-wide.

---

## Setting Up App Context

### 1. Set a Value in App Context

In any **Script** property, you can write a value to App Context using the following pattern:

```js
contexts.appContext.<contextName> = <value>;
```

**Example:**

```js
contexts.appContext.selectedOrg = data.organisationId;
```

This can be called from any script in the application — an `onChange` handler, a button's `onClick`, or an `onDataLoaded` event.

![Setting app context in a script]()

---

### 2. Read a Value from App Context

Reading the value back is just as simple — reference it the same way it was set:

```js
contexts.appContext.<contextName>
```

**Example:**

```js
const org = contexts.appContext.selectedOrg;
```

You can use this in any script across any page or component in your application.

![Reading app context in a script]()

---

## Using App Context in Component Properties

App Context values can also be bound directly to component properties — no scripting required. This is particularly useful for driving visibility rules, default values, or labels from a global state.

### 3. Click the Property Field

Click on the component property you want to bind to App Context.

![Click the property]()

---

### 4. Navigate to the Common Tab

If you are not already on it, switch to the **Common** tab in the property panel.

![Go to Common tab]()

---

### 5. Enable Show Binding

Click **Show Binding** to reveal the context binding options.

![Click Show Binding]()

---

### 6. Select App Context as the Source

From the context source dropdown, choose **App Context**.

![Choose App Context]()

---

### 7. Set the Component Name and Property Name

> **Important:** You must set **both** the `Component Name` and the `Property Name` to the context key you are binding to. Leaving either blank will cause the binding to not resolve correctly.

- **Component Name** → the name of your App Context key (e.g. `selectedOrg`)
- **Property Name** → the same App Context key (e.g. `selectedOrg`)

![Set Component Name and Property Name]()

---

## Notes

- App Context is **application-wide** — values set on one page are immediately accessible on any other
- For inter-page data passing, **Page Context is advised** over App Context unless the value is genuinely global
- Always set **both** the Component Name and Property Name when binding via the Common tab — this is a common source of binding issues
- App Context values are **not persisted** across sessions; they reset when the application is refreshed