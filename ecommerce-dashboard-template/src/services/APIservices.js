export const saveImageToBackend = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    const response = await fetch("http://localhost:9001/api/file/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const saveData = async (url, formData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Error: " + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
