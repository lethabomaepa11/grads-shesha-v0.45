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

<img width="629" height="86" alt="image" src="https://github.com/user-attachments/assets/fbc75336-110e-40b3-a6a2-7b6a3b07d0eb" />


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

<img width="1129" height="239" alt="image" src="https://github.com/user-attachments/assets/793dbbc3-2f4d-42ec-8f83-6f5f3ae076aa" />


---

## Using App Context in Component Properties

App Context values can also be bound directly to component properties — no scripting required. This is particularly useful for driving visibility rules, default values, or labels from a global state.

### 1. Click the Property Field

Click on the component property you want to bind to App Context.

<img width="1803" height="602" alt="image" src="https://github.com/user-attachments/assets/93367242-c483-4e07-b5a6-5d2907f649d5" />


---

### 2. Navigate to the Common Tab

If you are not already on it, switch to the **Common** tab in the property panel.

<img width="342" height="60" alt="image" src="https://github.com/user-attachments/assets/5e07fc86-d60f-460a-bf55-9a1b27424876" />


---

### 3. Enable Show Binding

Click **Show Binding** to reveal the context binding options.

<img width="325" height="110" alt="image" src="https://github.com/user-attachments/assets/beb06e2c-e361-44f2-98f8-4cb0a9a3bebb" />


---

### 6. Select App Context as the Source

From the context source dropdown, choose **App Context**.

<img width="339" height="284" alt="image" src="https://github.com/user-attachments/assets/6d9ea9f5-685e-4856-8879-f75ec0209471" />


---

### 7. Set the Component Name and Property Name

> **Important:** You must set **both** the `Component Name` and the `Property Name` to the context key you are binding to. Leaving either blank will cause the binding to not resolve correctly.

- **Component Name** → the name of your App Context key (e.g. `selectedOrg`)
- **Property Name** → the same App Context key (e.g. `selectedOrg`)

<img width="352" height="232" alt="image" src="https://github.com/user-attachments/assets/9581ff24-384c-42b2-91ee-be804a980fa4" />


---

## Notes

- App Context is **application-wide** — values set on one page are immediately accessible on any other
- For inter-page data passing, **Page Context is advised** over App Context unless the value is genuinely global
- Always set **both** the Component Name and Property Name when binding via the Common tab — this is a common source of binding issues
- App Context values are **not persisted** across sessions; they reset when the application is refreshed
