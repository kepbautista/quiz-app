/*
 * Created Date: April 29th 2025, 4:56:53 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: April 30th 2025, 4:55:13 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useActivityStore = create<ActivityStoreStateType>()(
  persist(
    (set) => ({
      activities: [],
      setActivities: (activityList: ActivityType[]) =>
        set({ activities: [...activityList] }),
      userAnswers: [],
      setUserAnswers: (questionWithAnswers: QuestionType[]) =>
        set({ userAnswers: [...questionWithAnswers] }),
    }),
    {
      name: "activity-store",
    }
  )
);

export default useActivityStore;
