/*
 * Created Date: April 29th 2025, 4:38:11 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: April 30th 2025, 5:35:06 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

type QuestionType = {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: boolean[];
  feedback: string;
};

type ActivityTwoQuestionType = {
  round_title: string;
  order: number;
  questions: QuestionType[];
};

type ActivityDetailsType = {
  activity_name: string;
  order: number;
};

interface ActivityType extends ActivityDetailsType {
  questions: QuestionType[] | ActivityTwoQuestionType[];
}

type ReadApiResponseType = {
  name: string;
  heading: string;
  activities: ActivityType[];
};

type QuestionAnswerType = {
  order: number;
  correct_answer: boolean;
  user_answer: boolean;
};

interface ResultsType extends ActivityDetailsType {
  answers: QuestionAnswerType[];
}

type ActivityStoreStateType = {
  activities: ActivityType[];
  setActivities: (activityList: ActivityType[]) => void;
  results: ResultsType[];
  setResults: (resultsList: ResultsType[]) => void;
};
