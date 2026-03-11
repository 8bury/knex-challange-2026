type CreateUserInput = {
  name: string;
  email: string;
  password: string;
}

type UpdateUserInput = {
  name?: string;
  email?: string;
  password?: string;
}

type UserOutput = {
  id: string;
  name: string;
  email: string;
  companyId: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export { CreateUserInput, UpdateUserInput, UserOutput };
