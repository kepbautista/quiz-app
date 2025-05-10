/*
 * Created Date: April 29th 2025, 4:56:53 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 10:27:22 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useActivityStore = create<ActivityStoreStateType>()(
  persist(
    (set) => ({
      results: [],
      setResults: (resultsList: ResultsType[]) =>
        set({ results: [...resultsList] }),
      multiRoundResults: [],
      setMultiRoundResults: (results: MultiRoundResultsType[]) => set({multiRoundResults: [...results]})
    }),
    {
      name: "activity-store",
    }
  )
);

export default useActivityStore;
