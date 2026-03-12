type ProfileOutput = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  company: { id: string; name: string } | null;
};

export { ProfileOutput };
