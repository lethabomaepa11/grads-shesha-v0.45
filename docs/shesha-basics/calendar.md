# Using the Calendar Component in Shesha

The Calendar component can be found in the **Advanced** group, or you can search for it directly.

![Find calendar component](https://github.com/user-attachments/assets/b2c161d5-6aeb-4859-982d-fc32b3bc6ec0)

---

## Add the Calendar Component

- Drag and drop the Calendar component onto your form
- Click on the component to open its properties

---

## Configure Data Source

### 1. Open the Data Tab

Go to the **Data** tab in the component properties.

![Open data tab](https://github.com/user-attachments/assets/868731ef-6bce-4a38-9576-a2018a281e75)

---

### 2. Add a Layer

Click on **Add Layer**.

![Add layer](https://github.com/user-attachments/assets/598be5e9-3c63-4806-9d68-5a4d3523616b)

---

### 3. Open Layer Settings

Click on the **settings button** to configure the layer.

![Layer settings](https://github.com/user-attachments/assets/c669c987-041e-47ed-b2bb-2fef6a5e543a)

---

### 4. Configure Data

Go to the **Data** tab inside the layer configuration.

![Layer data tab](https://github.com/user-attachments/assets/f6ce148b-450c-4f8a-a280-86032e9dd44a)

---

## Choose Data Source

Depending on where your events are coming from:

- Select **Entity** (recommended if using Shesha-managed data)
- Or select **URL** if fetching from an API

In this example, an **Entity** is used.

---

## Configure Event Fields

1. Select your source entity  
   Example: `ProjectMeetings`

2. Set the **Event Name**  
   Example: `Project Meeting`

3. Configure required fields:

- **Event Start Time** → must map to a datetime field  
- **Event End Time** → must map to a datetime field  

Example:

- `startsAtUtc`
- `endsAtUtc`

![Configure event fields](https://github.com/user-attachments/assets/6b306b22-66e3-454b-acff-fece902517fe)

---

## Save Configuration

After completing the setup:

- Save the configuration

The calendar should now display your events.

---

## Result

![Calendar events view 1](https://github.com/user-attachments/assets/8c23abd6-cf72-4c50-a04f-b427530fe135)

![Calendar events view 2](https://github.com/user-attachments/assets/55aa5062-669a-4d85-895d-0be70cb9cc87)

---

## Notes

- Your data source must include both **start** and **end** datetime fields
- Using **Entity** allows Shesha to handle data fetching automatically
- Ensure your entity data is populated, otherwise no events will display
