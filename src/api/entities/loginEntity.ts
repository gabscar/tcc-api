export interface ILoginEntity {
  id?: string;
  email: string;
  password: string;
  user_id: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  is_verify: boolean;
}
