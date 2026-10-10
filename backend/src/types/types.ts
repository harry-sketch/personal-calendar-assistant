import type { MessagesAnnotation } from "@langchain/langgraph";

export type TAgentStateType = typeof MessagesAnnotation.State;

export interface IAttendee {
  email: string;
  displayName: string;
}

export interface ICreateCalendarRequestBody {
  summary: string;
  attendees: IAttendee[];
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
    };
  };
}
