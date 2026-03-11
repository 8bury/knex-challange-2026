type CreateCompanyInput = {
  name: string;
}

type UpdateCompanyInput = {
  name: string;
}

type CompanyOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export { CreateCompanyInput, UpdateCompanyInput, CompanyOutput };
