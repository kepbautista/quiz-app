/*
 * Created Date: April 29th 2025, 4:38:11 pm
 * Author: Kristine Bautista (kebautista@yondu.com)
 * Last Modified: May 10th 2025, 10:06:23 pm
 * Modified By: Kristine Bautista (kebautista@yondu.com)
 */

type QuestionType = {
  is_correct: boolean
  stimulus: string
  order: number
  user_answers: boolean[]
  feedback: string
}

type MultiRoundQuestionType = {
  round_title: string
  order: number
  questions: QuestionType[]
}

type ActivityDetailsType = {
  activity_name: string
  order: number
}

interface ActivityType extends ActivityDetailsType {
  questions: QuestionType[] | MultiRoundQuestionType[]
}

type ReadApiResponseType = {
  name: string
  heading: string
  activities: ActivityType[]
}

type QuestionAnswerType = {
  order: number
  correct_answer: boolean
  user_answer: boolean
}

interface ResultsType extends ActivityDetailsType {
  answers: QuestionAnswerType[]
}

type MultiRoundQuestionAnswerType = {
  round_title: string
  answers: QuestionAnswerType[]
}

interface MultiRoundResultsType extends ActivityDetailsType {
  results: MultiRoundQuestionAnswerType[]
}

type ActivityStoreStateType = {
  results: ResultsType[]
  setResults: (resultsList: ResultsType[]) => void
  multiRoundResults: MultiRoundResultsType[]
  setMultiRoundResults: (results: MultiRoundResultsType[]) => void
}
