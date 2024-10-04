export const calculateAgeInYearsAndMonths = (birthDate: string): { years: number } => {
    // Split the birthDate string into day, month, and year (assuming DD/MM/YYYY format)
    const [day, month, year] = birthDate.split("/").map(Number);
  
    // Create a Date object using the parsed values in the correct order (YYYY, MM-1, DD)
    const birthDateObj = new Date(year, month - 1, day); // months are zero-indexed in JS Date
  
    // Get today's date
    const today = new Date();
  
    // Check if the birthDate is in the future
    if (birthDateObj > today) {
      throw new Error("Birthdate cannot be in the future.");
    }
  
    // Calculate the initial difference in years
    let ageYears = today.getFullYear() - birthDateObj.getFullYear();
  
    // Calculate the difference in months
    let ageMonths = today.getMonth() - birthDateObj.getMonth();
  
    // Check if the birthday hasn't occurred yet this year
    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDateObj.getDate())) {
      ageYears--; // Adjust years
      ageMonths += 12; // Adjust months
    }
  
    // Ensure we calculate the months correctly after adjusting
    if (today.getDate() < birthDateObj.getDate()) {
      ageMonths--; // Adjust months
    }
  
    return { years: ageYears };
  };
  