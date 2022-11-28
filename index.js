const axios = require('axios');
const Airtable = require('airtable');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const contactCsvWriter = createCsvWriter({
  path: 'contacts.csv',
  header: [
    {id: 'Id', title: 'Id'},
    {id: 'CustomerId', title: 'CustomerId'},
    {id: 'Notes', title: 'Notes'},
    {id: 'NameText', title: 'NameText'},
    {id: 'PostalAddressText', title: 'PostalAddressText'},
    {id: 'PhysicalAddressText', title: 'PhysicalAddressText'},
    {id: 'CreatedOn', title: 'CreatedOn'},
    {id: 'UpdatedOn', title: 'UpdatedOn'},
    {id: 'TradeName', title: 'TradeName'},
    {id: 'PhoneText', title: 'HomePhone'},
    {id: 'WorkPhoneText', title: 'WorkPhone'},
    {id: 'ContactPhone', title: 'CellPhone'},
    {id: 'Email', title: 'Email'},
    {id: 'IsArchived', title: 'IsArchived'},
    {id: 'IsSupplier', title: 'IsSupplier'},
    {id: 'IsTenant', title: 'IsTenant'},
    {id: 'IsOwner', title: 'IsOwner'},
    {id: 'IsSeller', title: 'IsSeller'},
    {id: 'Labels', title: 'Labels'},
    {id: 'PrimaryPostalAddress', title: 'PrimaryPostalAddress'},
    {id: 'PrimaryPhysicalAddress', title: 'PrimaryPhysicalAddress'},
    {id: 'ABN', title: 'ABN'},
    {id: 'Reference', title: 'Reference'},
  ]
});
const propertiesCsvWriter = createCsvWriter({
  path: 'properties.csv',
  header: [
    {id: 'Id', title: 'Id'},
    {id: 'OwnerContactReference', title: 'OwnerContactReference'},
    {id: 'TenantContactReference', title: 'TenantContactReference'},
    {id: 'RentAmount', title: 'RentAmount'},
    {id: 'RentPeriod', title: 'RentPeriod'},
    {id: 'ManagerName', title: 'ManagerName'},
    {id: 'AgreementStart', title: 'AgreementStart'},
    {id: 'AgreementEnd', title: 'AgreementEnd'},
    {id: 'OwnerContactId', title: 'OwnerContactId'},
    {id: 'TenantContactId', title: 'TenantContactId'},
    {id: 'CustomerId', title: 'CustomerId'},
    {id: 'ActiveOwnershipId', title: 'ActiveOwnershipId'},
    {id: 'ActiveTenancyId', title: 'ActiveTenancyId'},
    {id: 'ActiveManagerMemberId', title: 'ActiveManagerMemberId'},
    {id: 'EffectivePaidTo', title: 'EffectivePaidTo'},
    {id: 'OwnershipUpdatedOn', title: 'OwnershipUpdatedOn'},
    {id: 'TenancyUpdatedOn', title: 'TenancyUpdatedOn'},
    {id: 'Reference', title: 'Reference'},
    {id: 'AddressText', title: 'AddressText'},
    {id: 'PrimaryType', title: 'PrimaryType'},
    {id: 'PropertySubtype', title: 'PropertySubtype'},
    {id: 'Bedrooms', title: 'Bedrooms'},
    {id: 'Bathrooms', title: 'Bathrooms'},
    {id: 'CarSpaces', title: 'CarSpaces'},
    {id: 'Area', title: 'Area'},
    {id: 'AreaUnit', title: 'AreaUnit'},
    {id: 'Description', title: 'Description'},
    {id: 'Notes', title: 'Notes'},
    {id: 'NextInspectionOn', title: 'NextInspectionOn'},
    {id: 'KeyNumber', title: 'KeyNumber'},
    {id: 'InspectionFrequency', title: 'InspectionFrequency'},
    {id: 'InspectionFrequencyType', title: 'InspectionFrequencyType'},
    {id: 'InitialInspectionFrequency', title: 'InitialInspectionFrequency'},
    {id: 'InitialInspectionFrequencyType', title: 'InitialInspectionFrequencyType'},
    {id: 'Labels', title: 'Labels'},
    {id: 'IsRental', title: 'IsRental'},
    {id: 'IsArchived', title: 'IsArchived'},
    {id: 'CreatedOn', title: 'CreatedOn'},
    {id: 'UpdatedOn', title: 'UpdatedOn'},
    {id: 'MainPhotoDocumentId', title: 'MainPhotoDocumentId'},
    {id: 'ActiveManagerMemberId', title: 'ActiveManagerMemberId'},
  ]
});
const tenanciesCsvWriter = createCsvWriter({
  path: 'tenancies.csv',
  header: [
    {id: 'Id', title: 'Id'},
    {id: 'ActiveOwnershipId', title: 'ActiveOwnershipId'},
    {id: 'CustomerId', title: 'CustomerId'},
    {id: 'LotId', title: 'LotId'},
    {id: 'ContactId', title: 'ContactId'},
    {id: 'ContactReference', title: 'ContactReference'},
    {id: 'LotAddress', title: 'LotAddress'},
    {id: 'LotReference', title: 'LotReference'},
    {id: 'FolioNumber', title: 'FolioNumber'},
    {id: 'ContactEmail', title: 'ContactEmail'},
    {id: 'ContactNormalisedMobilePhone', title: 'ContactNormalisedMobilePhone'},
    {id: 'ContactCellPhone', title: 'ContactCellPhone'},
    {id: 'ContactPhone', title: 'ContactPhone'},
    {id: 'IsActive', title: 'IsActive'},
    {id: 'IsClosed', title: 'IsClosed'},
    {id: 'Code', title: 'Code'},
    {id: 'IsClientAccessDisabled', title: 'IsClientAccessDisabled'},
    {id: 'Label', title: 'Label'},
    {id: 'SearchText', title: 'SearchText'},
    {id: 'Name', title: 'Name'},
    {id: 'HasBeenReceipted', title: 'HasBeenReceipted'},
    {id: 'TenancyStart', title: 'TenancyStart'},
    {id: 'AgreementStart', title: 'AgreementStart'},
    {id: 'AgreementEnd', title: 'AgreementEnd'},
    {id: 'RentAmount', title: 'RentAmount'},
    {id: 'RentPeriod', title: 'RentPeriod'},
    {id: 'BondAmount', title: 'BondAmount'},
    {id: 'OpenBondReceived', title: 'OpenBondReceived'},
    {id: 'BankReference', title: 'BankReference'},
    {id: 'TaxOnRent', title: 'TaxOnRent'},
    {id: 'GenerateRentInvoice', title: 'GenerateRentInvoice'},
    {id: 'RentInvoiceDaysInAdvance', title: 'RentInvoiceDaysInAdvance'},
    {id: 'ReceiptWarning', title: 'ReceiptWarning'},
    {id: 'PaidTo', title: 'PaidTo'},
    {id: 'EffectivePaidTo', title: 'EffectivePaidTo'},
    {id: 'PartPaid', title: 'PartPaid'},
    {id: 'ProrataTo', title: 'ProrataTo'},
    {id: 'MepayStatus', title: 'MepayStatus'},
    {id: 'AllowMepayPayments', title: 'AllowMepayPayments'},
    {id: 'ReviewFrequency', title: 'ReviewFrequency'},
    {id: 'NextReviewDate', title: 'NextReviewDate'},
    {id: 'LastReviewedOn', title: 'LastReviewedOn'},
    {id: 'DirectDebit', title: 'DirectDebit'},
    {id: 'DirectDebitFixedAmount', title: 'DirectDebitFixedAmount'},
    {id: 'DirectDebitFrequency', title: 'DirectDebitFrequency'},
    {id: 'NextDirectDebitDate', title: 'NextDirectDebitDate'},
    {id: 'CreatedOn', title: 'CreatedOn'},
    {id: 'UpdatedOn', title: 'UpdatedOn'},
    {id: 'ExcludeArrearsAutomation', title: 'ExcludeArrearsAutomation'},
  ]
});

let defaultAccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NjkzNDMwNTksImV4cCI6MTY2OTM0NjY1OSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5wcm9wZXJ0eW1lLmNvbSIsImF1ZCI6WyJodHRwczovL2xvZ2luLnByb3BlcnR5bWUuY29tL3Jlc291cmNlcyIsImh0dHBzOi8vYXBwLnByb3BlcnR5bWUuY29tL2FwaSJdLCJjbGllbnRfaWQiOiI3ZjQ0MjYwZS1jMmFjLTQzMzMtYTFiNC01NzQxMjkxNmEyZDUiLCJzdWIiOiJDdXN0b21lcklkX2FhOWQwMTY1LWQwZDMtNGNjNy1iZjFkLTFiMTU5ZmJiMDAyMyIsImF1dGhfdGltZSI6MTY2NzgzMjI0NywiaWRwIjoibG9jYWwiLCJjdXN0b21lcl9pZCI6ImFhOWQwMTY1LWQwZDMtNGNjNy1iZjFkLTFiMTU5ZmJiMDAyMyIsIm1lbWJlcl9pZCI6ImFkOTAwMDk2LTgxMjUtNGRhYi05YTlmLTYxNzliYWU1YzU2ZSIsIm1lbWJlcl9hY2Nlc3NfaWQiOiJhZDkwMDA5Ni04MTI3LTRiZGUtODNkNi1kMzgwMzQ1ZjBjMjEiLCJzY29wZSI6WyJwcm9wZXJ0eTpyZWFkIiwiY29tbXVuaWNhdGlvbjpyZWFkIiwiYWN0aXZpdHk6cmVhZCIsInRyYW5zYWN0aW9uOnJlYWQiLCJjb250YWN0OnJlYWQiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.ErLgD-v_UQJiAO2XpFp-V3J62m0ltNC6czE126dUfLanbewV7sRM-yzRzvFNlho2816J5MWSi0yXfJs28geM-McDnbg7F1FdVkI2OEBZbT7V8fxA9Kpgzhk3Vy_6He1XnB89HeUOu7nB7OZb18RJw15jeBkOsm88dZl0odcFv6iqwcoO1osOZjEDT2UeRubhgHe0jdnf4_No802SdKKrGJmHhW4qYZDc-Up0pWGlxlsbv6W2Z_f5cTzqUKutu3XGi3uipoCA0IlLPVCcn1lPalHDLr29cr68qzzcXWpJhVGb1l5kD8Tdq5RXKdM4HYV9kfOxfuqcLsFr2FsZDz_vpQ";
const defaultRefreshToken = "0ddfcb7fc7731c0bc518ffce369335e2e0f90f517c8d43a92947752fd50d3772";

const airtableToken = "pat9wSHCdzrlGdgf3.b39fdaca8a7ca13afb437d18c41615cd42a5e7ce2e3cc21d18cb585cccad2d60";
const airtableAPIKey = "keySt4h4UcZG5EheK";
const airtableBaseId = "apppv94oLXw3EoJu7";

const accessTokenValue = defaultAccessToken;

const instance = axios.create({
  baseURL: `https://app.propertyme.com/api/v1`,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + accessTokenValue,
    'Access-Control-Allow-Origin': "*",
  },
});

const loginInstance = axios.create({
  baseURL: `https://login.propertyme.com`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    Authorization:
      "Basic N2Y0NDI2MGUtYzJhYy00MzMzLWExYjQtNTc0MTI5MTZhMmQ1OjIyODEwNGNkLWZiYWUtNDBmNi1hYzAzLTdiY2E0ZjcyOThjNQ==",
  },
});

const refreshToken = () => {
  const currentRefreshToken = defaultRefreshToken;
  const postData = {
    grant_type: "refresh_token",
    redirect_uri: "https://hello.propertyme.com/home/callback",
    scope:
      "activity:read contact:read communication:read property:read communication:read transaction:read offline_access",
    refresh_token: currentRefreshToken,
  };
  return loginInstance
    .post("/connect/token", postData)
    .then((res) => res.data)
    .then((res) => {
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token;
      return res;
    });
};

instance.interceptors.response.use(response => response.data, error => {
	const status = error.response ? error.response.status : null

    if (status === 401 && !error.config._retry) {
    	return refreshToken().then(data => {
    		defaultAccessToken = data.access_token;
	        return instance({
	          ...error.config,
	          headers: {
	              Accept: "application/json",
	              'Content-Type': "application/json",
	              'Access-Control-Allow-Origin': "*",
	              Authorization: 'Bearer ' + defaultAccessToken
	          },
	        });
    	});
    }
    return Promise.reject(error);
});


const createRow = (postData, mainTable) => {
  const row = mainTable.create(postData);
  return row;
}

const table = new Airtable({ apiKey: airtableAPIKey });
const base = table.base(airtableBaseId);

const propertiesTable = base.table('Properties');
const tenantsTable = base.table('Tenants');
const contactsTable = base.table('Contacts');

const getContacts = async () => {
  const data = await instance.get('/contacts?Timestamp=' + new Date().getTime() + '&format=json');
  
  contactCsvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));
  return data;
}

const getTenancies = async (contactId, lotId) => {
  let data = [];
  if (contactId && lotId) {
    data = await instance.get('/tenancies?ContactId=' + contactId + '&LotId=' + lotId + '&format=json');
  }
  return data;
}

const getProperties = async () => {
  const properties_data = await instance.get('/lots?Timestamp=' + new Date().getTime() + '&format=json');

  // propertiesCsvWriter
  //   .writeRecords(properties_data)
  //   .then(()=> console.log('The Properties CSV file was written successfully'));
  
  console.log('Total Properties: ', properties_data.length);
  let tenancies = [];
  for (let i = 0; i < properties_data.length; i++) {
    console.log('Getting Tenancies from ' + i + ' Property');
    const tempTenancies = await getTenancies(properties_data[i].TenantContactId, properties_data[i].Id);
    tenancies = [...tenancies, ...tempTenancies];
    tenanciesCsvWriter
      .writeRecords(tenancies)
      .then(()=> console.log('The Tenancies CSV file was written successfully'));
  }
    
  console.log('All done!');
  return properties_data;
}
// Create&Update Properties
getContacts();
getProperties();
