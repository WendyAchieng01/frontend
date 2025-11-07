export interface ISkill {
  id: number;
  name: string;
}

export interface ISkillCreatePayload {
  name: string;
}

export interface ILanguage {
  id: number;
  name: string;
}

export interface ILanguageCreatePayload {
  name: string;
}
export interface IChat {
  id: number;
  slug: string;
  last_message: string;
  chat_uuid: string;
  job: number;
  client: string;
  freelancer: string;
  active: true;
  created_at: string;
  messages: IMessage[];
}

export interface IMessage {
  id: number;
  slug: string;
  chat: number;
  sender: string;
  content: string;
  timestamp: string;
  attachments: IChatAttachment[];
}

export interface IChatAttachment {
  id: number;
  filename: string;
  file_size: number;
  content_type: string;
  thumbnail: string;
  preview_url: string;
  file_url: string;
  uploaded_at: string;
}

export interface IMessageCreatePayload {
  content: string;
}
