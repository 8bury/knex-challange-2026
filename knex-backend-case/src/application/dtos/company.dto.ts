type CreateCompanyInput = {
  name: string;
};

type UpdateCompanyInput = {
  name: string;
};

type CompanyOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type CompanyListItem = {
  id: string;
  name: string;
  createdAt: Date;
};

type CompanyListOutput = {
  data: CompanyListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type CompanyDetailsOutput = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  membersCount: number;
  productsCount: number;
};

type JoinCompanyOutput = {
  id: string;
  name: string;
  email: string;
  company: { id: string; name: string };
};

type CompanyMembersOutput = {
  data: { id: string; name: string; email: string }[];
};

export { CreateCompanyInput, UpdateCompanyInput, CompanyOutput, CompanyListItem, CompanyListOutput, CompanyDetailsOutput, JoinCompanyOutput, CompanyMembersOutput };
