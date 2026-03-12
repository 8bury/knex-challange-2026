type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type RegisterOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

type LoginInput = {
  email: string;
  password: string;
};

type LoginOutput = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export { RegisterInput, RegisterOutput, LoginInput, LoginOutput };
