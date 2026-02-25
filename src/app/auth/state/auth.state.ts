import { Register, User } from '../../models/user.model';

export interface AuthState {
  user: User | null;
  register: Register | null;
}

export const initialState: AuthState = {
  user: null,
  register: null,
};
