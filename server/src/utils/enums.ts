export enum RoleEnum {
  ADMIN = 'admin',
  VENUE_OWNER = 'venue_owner',
  CUSTOMER = 'customer',
}
export enum GenderEnum {
  Male = 'male',
  Female = 'female',
  Either = 'either',
}
export enum CallSourceEnum {
  Mobile = 'mobile',
  Ipad = 'ipad',
}
export enum PlatformEnum {
  Mobile = 'mobile',
  Ipad = 'ipad',
  Web = 'web',
  Desktop = 'desktop',
}
export enum ActivityStatusEnum {
  Active = 'active',
  TechIssue = 'tech-issue',
  InSession = 'in-session',
  Break = 'break',
  Lunch = 'lunch',
  Offline = 'offline',
  Busy = 'busy',
  WaitingForCall = 'waiting-for-call',
}
export enum SessionTypeEnum {
  Audio = 'audio',
  Video = 'video',
  OnSite = 'on-site',
}
export enum CriticalFieldsEnum {
  Phone = 'phone',
  Email = 'email',
  Extension = 'extension',
}
export enum CallStatusEnum {
  Created = 'created',
  Completed = 'completed',
  Declined = 'declined',
  Transferred = 'transferred',
  Initiated = 'initiated',
  Started = 'started',
  Cancelled = 'cancelled',
  Assigned = 'assigned',
  Accepted = 'accepted',
  Rejected = 'rejected',
}
export enum NotificationGroupEnum {
  UserCreated = 'user-created',
  UserSignup = 'user-signup',
  InterpreterCustomerCount = 'interpreter-customer-count',
}
export enum NotificationTagEnum {
  CallScheduled = 'call-scheduled',
  CallAccepted = 'call-accepted',
  CallCanceled = 'call-canceled',
  CallAssigned = 'call-assigned',
  CallDeclined = 'call-declined',
  UserCreated = 'user-created',
  UserSignedUp = 'user-signed-up',
  IncomingCall = 'incoming-call',
  CallCompleted = 'call-completed',
  AllowedForCallsStatusChange = 'allowed-for-calls-status-change',
  TwentyFourHourReminder = 'twenty-four-hour-reminder',
  OneHourReminder = 'one-hour-reminder',
}
export enum NotificationEventsEnum {
  OnUserSignup = 'on-user-signup',
  OnUserCreated = 'on-user-created',
  OnAllowedForCallsStatusChange = 'on-allowed-for-calls-status-change',
  OnCallCancelled = 'on-call-cancelled',
  OnCallAccepted = 'on-call-accepted',
  OnCallCompleted = 'on-call-completed',
  OnCallDeclined = 'on-call-declined',
  OnCallAssigned = 'on-call-assigned',
  OnCallScheduled = 'on-call-scheduled',
  OnTwentyFourHourReminder = 'on-twenty-four-hour-reminder',
  OnOneHourReminder = 'on-one-hour-reminder',
  OnIncomingCall = 'on-incoming-call',
  OnPushNotification = 'on-push-notification',
  OnNotification = 'on-notification',
  OnCallNotification = 'on-call-notification',
  OnInterpreterCustomerCount = 'on-interpreter-customer-count',
}
export enum NotificationCategoryEnum {
  General = 'general',
  Highlight = 'highlight',
  System = 'system',
}

export enum CallCategoryEnum {
  Emergency = 'emergency',
  Normal = 'normal',
}
