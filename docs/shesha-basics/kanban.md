# Using the Kanban Component in Shesha

To use a Kanban component in Shesha, you must first configure a **Data Context**, then bind the Kanban to an entity and configure grouping and rendering.

---

## Steps

### 1. Insert Data Context

Add a **Data Context** component and select the entity type.

![Insert data context](https://github.com/user-attachments/assets/7da929d2-800a-4897-a14b-017f7a462a0e)

---

### 2. Configure Data Source

Go to the **Data tab** of the Kanban properties:

- Select **Data Source Type** → Entity
- Select your entity  
  Example: `ProjectTask`

![Select entity](https://github.com/user-attachments/assets/94f1d066-c5e2-4258-ae11-337760b3cfa3)

---

### 3. Insert Kanban Component

Add the **Kanban component** to your form.

![Insert kanban](https://github.com/user-attachments/assets/94511f2e-bd2b-4a28-b2bc-5499c2752b07)

---

### 4. Configure Reference List

In the **Data tab** of the Kanban:

- Select the **Reference List** for the entity  
  Example: `ProjectTaskStatus`

This defines the columns of the Kanban board.

![Reference list](https://github.com/user-attachments/assets/dbbf3cbd-49c9-4a24-8761-b147b9e1f51d)

The reference list values will appear as columns:

![Kanban columns](https://github.com/user-attachments/assets/32e2ed4d-1b69-47d7-89e0-a3ae2c8559cb)

---

### 5. Set Grouping Property

Go to the **Common tab**:

- Set the **Grouping Property**

This must match the property on your entity that corresponds to the reference list.

Example:

- Reference List: `ProjectTaskStatus`
- Grouping Property: `status` (from `ProjectTask`)

If this is incorrect, no data will be displayed.

---

### 6. Create Item Render Form

Create a form that will render each Kanban item.

Requirements:

- The form **Model Type must match the entity**
- Example: `ProjectTask`

Example form: `task-card`

This form can display fields like:

- Title
- Description

![Task card form settings](https://github.com/user-attachments/assets/46a9b816-dbc3-47b1-8225-63931a68e242)

---

### 7. Assign Render Form

In the **Common tab** of the Kanban:

- Set **Render Form**
- Select your item form  
  Example: `task-card`

![Select render form](https://github.com/user-attachments/assets/db5ed126-9cf0-4ab0-8e3d-9edf24701563)

---

### 8. Preview

Click the **Preview icon**.

The Kanban should display items grouped by status.

![Kanban result](https://github.com/user-attachments/assets/6d87ae06-1051-4e76-a6b6-be7a895199ee)

---

## Notes

- A **Data Context** is required before using the Kanban
- The **Grouping Property must match the Reference List**
- The **Render Form must use the same Model Type as the entity**
- If any of these are misconfigured, data will not display
