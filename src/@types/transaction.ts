export enum TRANSACTION_STATES {
  initial = 'initial',
  userConfirmationPending = 'user_confirmation_pending',
  submitted = 'submitted',
  confirmed = 'confirmed',
  failed = 'failed',
  dropped = 'dropped',
}

export interface ITransaction {
  status: TRANSACTION_STATES
  uiMessage: string
}
