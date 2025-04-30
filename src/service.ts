/*
 * Created Date: April 30th 2025, 3:11:12 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: April 30th 2025, 3:13:40 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

export const getApiService = async (): Promise<ReadApiResponseType | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/read");
    return (await response.json()) as ReadApiResponseType;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    console.error("Error in fetching data:", error);
    return null;
  }
};
