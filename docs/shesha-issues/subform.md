# Subform Component Not Displaying Data in Parent Form

When using the **Subform component in Shesha**, you may run into a case where the form displays data correctly on its own, but does not display that same data when it is used inside a parent form.

---

## Problem

A form used as a **Subform component** displays data correctly when opened independently, but the data does not appear when that same form is rendered inside a parent form.

### Standalone Form

The data is displayed correctly when the form is used on its own:

![Subform standalone works](https://github.com/user-attachments/assets/127a9a14-786a-4329-80df-187fe7bd4153)

---

### Subform Component Inside Parent Form

When the same form is used through the **Subform component** in a parent form, the data is not displayed:

![Subform inside parent not working](https://github.com/user-attachments/assets/b65ac8ea-65c4-4b91-a67f-2c72629d24eb)

---

## Solution

### 1. Clear the Property Name

In the **Subform component** configuration, clear the **Property Name** field.

This is the most common fix and usually resolves the issue.

![Clear property name](https://github.com/user-attachments/assets/d015a3ef-9a11-4c68-b8d7-8ea41d6c3228)

---

### 2. Ensure Both Forms Use the Same Model Type

If the issue still persists, check the form settings for both the parent form and the subform.

Make sure both forms are using the **same Model Type**.

A mismatch in model types can prevent the Subform component from binding and displaying data correctly.

![Match model types](https://github.com/user-attachments/assets/7a0253c5-3eb1-466b-b5d6-2bfe0f062d27)

---

## Summary

| Step | Action |
|------|--------|
| 1 | Clear the **Property Name** in the **Subform component** |
| 2 | Ensure the **parent form** and **subform** use the same **Model Type** |

---

## Notes

- This issue occurs when using the **Subform component in Shesha**
- The subform may work correctly as a standalone form but fail when embedded in a parent form
- In most cases, the issue is caused by the **Property Name** or a **Model Type mismatch**
