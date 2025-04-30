/*
 * Created Date: April 29th 2025, 4:21:56 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: April 29th 2025, 4:38:49 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      "https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json"
    );
    const data = await response.json();
    res.status(200).json({ ...data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default handler;
