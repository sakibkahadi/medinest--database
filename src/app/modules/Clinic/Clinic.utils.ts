import { ClinicMOdel } from "./Clinic.model";

export const generateClinicId = async (): Promise<string> => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString(); // e.g., "2024"
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // e.g., "01" for January
  
    // Query the database to find the latest clinicId for the current year and month
    const latestClinic = await ClinicMOdel.findOne({ clinicId: new RegExp(`^${year}${month}`) })
      .sort({ clinicId: -1 }) // Sort in descending order to get the latest clinicId
      .exec();
  
    let incrementingNumber = 1; // Default to "0001"
  
    if (latestClinic) {
      // Extract the last 4 digits and increment them
      const lastId = latestClinic.clinicId;
      const lastIncrement = parseInt(lastId.slice(6)); // Extract the last 4 digits
      incrementingNumber = lastIncrement + 1;
    }
  
    // Generate the new clinicId with padded 4-digit number
    const clinicId = `${year}${month}${incrementingNumber.toString().padStart(4, '0')}`;
    return clinicId;
  };