export const downloadResumeJSON = (resumeData) => {
    // Convert the resume data to a JSON string
    const resumeDataString = JSON.stringify(resumeData);
  
    // Create a Blob object containing the JSON data
    const blob = new Blob([resumeDataString], { type: "application/json" });
  
    // Generate a unique filename (e.g., based on user's name or a timestamp)
    const filename = "resume.json";
  
    // Create a URL for the Blob object
    const url = window.URL.createObjectURL(blob);
  
    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
  
    // Simulate a click on the anchor element to initiate the download
    a.click();
  
    // Release the URL object to free up resources
    window.URL.revokeObjectURL(url);
  };
  