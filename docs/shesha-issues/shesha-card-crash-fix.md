# Configuration Studio Crashes After Adding Custom Styles to a Card Component

In the unstable version of **Shesha v0.45**, adding custom styles to a **Card component** can cause the **Configuration Studio** to crash.

Once this happens, you may no longer be able to open or edit the affected form in Configuration Studio. To fix it, you need to remove the custom style code directly from the form configuration JSON.

---

## Problem

After adding custom styles to a **Card component** in **Shesha v0.45 unstable**, the form becomes unusable in Configuration Studio.

This means:

- The form may crash when opened
- You may no longer be able to make changes to the form
- The only fix is to remove the custom style value from the form configuration JSON

---

## Solution

### 1. Copy the Form ID from Configuration Studio

Open the affected form in **Configuration Studio** and copy its **Form ID**.

You will need this ID to retrieve the form configuration JSON from the backend.

---

### 2. Open Swagger on Your Backend

Go to your backend **Swagger** page and find the **FormConfiguration** service.

Use the following endpoint:

/api/services/Shesha/FormConfiguration/GetJson

Pass the copied **Form ID** as the `id` parameter.

This will return the JSON configuration of the form.

---

### 3. Download the Form JSON

Download the JSON file returned by the endpoint.

Open it in a code editor and search for:

- The affected **Card component**
- The custom style code you previously added

Find the field containing the custom style value and set it to an empty string:

```json
"customStyle": ""
```

Save the file after making the change.

---

### 4. Re-import the Updated JSON

Go back to Swagger and use the following endpoint:

/api/services/Shesha/FormConfiguration/ImportJson

Use the updated JSON file to import the corrected form configuration.

#### Parameters

- `itemId` — the form ID
- `file` — the updated JSON file

---

## Import Endpoint Details

/api/services/Shesha/FormConfiguration/ImportJson

### Request Type

multipart/form-data

### Parameters

| Name | Type | Description |
|------|------|-------------|
| itemId | string($uuid) | The form ID |
| file | string($binary) | The updated JSON file |

---

## Result

After importing the updated JSON:

- The custom style will be removed
- The form should stop crashing
- You should be able to open and edit the form again in Configuration Studio

---

## Summary

| Step | Action |
|------|--------|
| 1 | Copy the Form ID from Configuration Studio |
| 2 | Use GetJson endpoint in Swagger |
| 3 | Download the form JSON |
| 4 | Clear the custom style value |
| 5 | Save the JSON file |
| 6 | Re-import using ImportJson |

---

## Notes

- This issue applies to the unstable version of Shesha v0.45
- The crash is triggered by adding custom styles to a Card component
- Editing the JSON via Swagger is the workaround
