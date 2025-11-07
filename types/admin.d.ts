export type IAdminUser = IUser;

export interface IAdminUserCreatePayload {
  username: string;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

export interface IAdminUserUpdatePayload {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;

}

export type IAdminJob = IJob;
export type IAdminJobApplication = IFreelancerJobApplication;

export type IAdminInvoice = IInvoice;
export type IAdminWalletTransaction = IFreelancerWalletTransaction;

export type IAdminSkill = ISkill;
export type IAdminLanguage = ILanguage;
export type IAdminSkillCreatePayload = ISkillCreatePayload;
export type IAdminLanguageCreatePayload = ILanguageCreatePayload;

export type IAdminReview = IReview;

export type IAdminTraining = ITraining;
