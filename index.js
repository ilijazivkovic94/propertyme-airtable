const axios = require('axios');
const Airtable = require('airtable');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const contactCsvWriter = createCsvWriter({
//   path: 'contacts.csv',
//   header: [
//     {id: 'Id', title: 'Id'},
//     {id: 'CustomerId', title: 'CustomerId'},
//     {id: 'Notes', title: 'Notes'},
//     {id: 'NameText', title: 'NameText'},
//     {id: 'PostalAddressText', title: 'PostalAddressText'},
//     {id: 'PhysicalAddressText', title: 'PhysicalAddressText'},
//     {id: 'CreatedOn', title: 'CreatedOn'},
//     {id: 'UpdatedOn', title: 'UpdatedOn'},
//     {id: 'TradeName', title: 'TradeName'},
//     {id: 'PhoneText', title: 'HomePhone'},
//     {id: 'WorkPhoneText', title: 'WorkPhone'},
//     {id: 'ContactPhone', title: 'CellPhone'},
//     {id: 'Email', title: 'Email'},
//     {id: 'IsArchived', title: 'IsArchived'},
//     {id: 'IsSupplier', title: 'IsSupplier'},
//     {id: 'IsTenant', title: 'IsTenant'},
//     {id: 'IsOwner', title: 'IsOwner'},
//     {id: 'IsSeller', title: 'IsSeller'},
//     {id: 'Labels', title: 'Labels'},
//     {id: 'PrimaryPostalAddress', title: 'PrimaryPostalAddress'},
//     {id: 'PrimaryPhysicalAddress', title: 'PrimaryPhysicalAddress'},
//     {id: 'ABN', title: 'ABN'},
//     {id: 'Reference', title: 'Reference'},
//   ]
// });
// const propertiesCsvWriter = createCsvWriter({
//   path: 'properties.csv',
//   header: [
//     {id: 'Id', title: 'Id'},
//     {id: 'OwnerContactReference', title: 'OwnerContactReference'},
//     {id: 'TenantContactReference', title: 'TenantContactReference'},
//     {id: 'RentAmount', title: 'RentAmount'},
//     {id: 'RentPeriod', title: 'RentPeriod'},
//     {id: 'ManagerName', title: 'ManagerName'},
//     {id: 'AgreementStart', title: 'AgreementStart'},
//     {id: 'AgreementEnd', title: 'AgreementEnd'},
//     {id: 'OwnerContactId', title: 'OwnerContactId'},
//     {id: 'TenantContactId', title: 'TenantContactId'},
//     {id: 'CustomerId', title: 'CustomerId'},
//     {id: 'ActiveOwnershipId', title: 'ActiveOwnershipId'},
//     {id: 'ActiveTenancyId', title: 'ActiveTenancyId'},
//     {id: 'ActiveManagerMemberId', title: 'ActiveManagerMemberId'},
//     {id: 'EffectivePaidTo', title: 'EffectivePaidTo'},
//     {id: 'OwnershipUpdatedOn', title: 'OwnershipUpdatedOn'},
//     {id: 'TenancyUpdatedOn', title: 'TenancyUpdatedOn'},
//     {id: 'Reference', title: 'Reference'},
//     {id: 'AddressText', title: 'AddressText'},
//     {id: 'PrimaryType', title: 'PrimaryType'},
//     {id: 'PropertySubtype', title: 'PropertySubtype'},
//     {id: 'Bedrooms', title: 'Bedrooms'},
//     {id: 'Bathrooms', title: 'Bathrooms'},
//     {id: 'CarSpaces', title: 'CarSpaces'},
//     {id: 'Area', title: 'Area'},
//     {id: 'AreaUnit', title: 'AreaUnit'},
//     {id: 'Description', title: 'Description'},
//     {id: 'Notes', title: 'Notes'},
//     {id: 'NextInspectionOn', title: 'NextInspectionOn'},
//     {id: 'KeyNumber', title: 'KeyNumber'},
//     {id: 'InspectionFrequency', title: 'InspectionFrequency'},
//     {id: 'InspectionFrequencyType', title: 'InspectionFrequencyType'},
//     {id: 'InitialInspectionFrequency', title: 'InitialInspectionFrequency'},
//     {id: 'InitialInspectionFrequencyType', title: 'InitialInspectionFrequencyType'},
//     {id: 'Labels', title: 'Labels'},
//     {id: 'IsRental', title: 'IsRental'},
//     {id: 'IsArchived', title: 'IsArchived'},
//     {id: 'CreatedOn', title: 'CreatedOn'},
//     {id: 'UpdatedOn', title: 'UpdatedOn'},
//     {id: 'MainPhotoDocumentId', title: 'MainPhotoDocumentId'},
//     {id: 'ActiveManagerMemberId', title: 'ActiveManagerMemberId'},
//   ]
// });
// const tenanciesCsvWriter = createCsvWriter({
//   path: 'tenancies.csv',
//   header: [
//     {id: 'Id', title: 'Id'},
//     {id: 'ActiveOwnershipId', title: 'ActiveOwnershipId'},
//     {id: 'CustomerId', title: 'CustomerId'},
//     {id: 'LotId', title: 'LotId'},
//     {id: 'ContactId', title: 'ContactId'},
//     {id: 'ContactReference', title: 'ContactReference'},
//     {id: 'LotAddress', title: 'LotAddress'},
//     {id: 'LotReference', title: 'LotReference'},
//     {id: 'FolioNumber', title: 'FolioNumber'},
//     {id: 'ContactEmail', title: 'ContactEmail'},
//     {id: 'ContactNormalisedMobilePhone', title: 'ContactNormalisedMobilePhone'},
//     {id: 'ContactCellPhone', title: 'ContactCellPhone'},
//     {id: 'ContactPhone', title: 'ContactPhone'},
//     {id: 'IsActive', title: 'IsActive'},
//     {id: 'IsClosed', title: 'IsClosed'},
//     {id: 'Code', title: 'Code'},
//     {id: 'IsClientAccessDisabled', title: 'IsClientAccessDisabled'},
//     {id: 'Label', title: 'Label'},
//     {id: 'SearchText', title: 'SearchText'},
//     {id: 'Name', title: 'Name'},
//     {id: 'HasBeenReceipted', title: 'HasBeenReceipted'},
//     {id: 'TenancyStart', title: 'TenancyStart'},
//     {id: 'AgreementStart', title: 'AgreementStart'},
//     {id: 'AgreementEnd', title: 'AgreementEnd'},
//     {id: 'RentAmount', title: 'RentAmount'},
//     {id: 'RentPeriod', title: 'RentPeriod'},
//     {id: 'BondAmount', title: 'BondAmount'},
//     {id: 'OpenBondReceived', title: 'OpenBondReceived'},
//     {id: 'BankReference', title: 'BankReference'},
//     {id: 'TaxOnRent', title: 'TaxOnRent'},
//     {id: 'GenerateRentInvoice', title: 'GenerateRentInvoice'},
//     {id: 'RentInvoiceDaysInAdvance', title: 'RentInvoiceDaysInAdvance'},
//     {id: 'ReceiptWarning', title: 'ReceiptWarning'},
//     {id: 'PaidTo', title: 'PaidTo'},
//     {id: 'EffectivePaidTo', title: 'EffectivePaidTo'},
//     {id: 'PartPaid', title: 'PartPaid'},
//     {id: 'ProrataTo', title: 'ProrataTo'},
//     {id: 'MepayStatus', title: 'MepayStatus'},
//     {id: 'AllowMepayPayments', title: 'AllowMepayPayments'},
//     {id: 'ReviewFrequency', title: 'ReviewFrequency'},
//     {id: 'NextReviewDate', title: 'NextReviewDate'},
//     {id: 'LastReviewedOn', title: 'LastReviewedOn'},
//     {id: 'DirectDebit', title: 'DirectDebit'},
//     {id: 'DirectDebitFixedAmount', title: 'DirectDebitFixedAmount'},
//     {id: 'DirectDebitFrequency', title: 'DirectDebitFrequency'},
//     {id: 'NextDirectDebitDate', title: 'NextDirectDebitDate'},
//     {id: 'CreatedOn', title: 'CreatedOn'},
//     {id: 'UpdatedOn', title: 'UpdatedOn'},
//     {id: 'ExcludeArrearsAutomation', title: 'ExcludeArrearsAutomation'},
//   ]
// });
// const jobsCsvWriter = createCsvWriter({
//   path: 'jobs.csv',
//   header: [
//     {id: 'Id', title: 'Id'},
//     {id: 'LotReference', title: 'LotReference'},
//     {id: 'TenantReference', title: 'TenantReference'},
//     {id: 'OwnerReference', title: 'OwnerReference'},
//     {id: 'ContactReference', title: 'ContactReference'},
//     {id: 'ManagerName', title: 'ManagerName'},
//     {id: 'IsLetterStatement', title: 'IsLetterStatement'},
//     {id: 'StatementId', title: 'StatementId'},
//     {id: 'TaskType', title: 'TaskType'},
//     {id: 'Timestamp', title: 'Timestamp'},
//     {id: 'OwnerAttending', title: 'OwnerAttending'},
//     {id: 'TenantAttending', title: 'TenantAttending'},
//     {id: 'SupplierReference', title: 'SupplierReference'},
//     {id: 'DisplayNumber', title: 'DisplayNumber'},
//     {id: 'Number', title: 'Number'},
//     {id: 'Status', title: 'Status'},
//     {id: 'ReportedContactType', title: 'ReportedContactType'},
//     {id: 'Access', title: 'Access'},
//     {id: 'MainPhotoDocumentId', title: 'MainPhotoDocumentId'},
//     {id: 'DocumentLinkTextName', title: 'DocumentLinkTextName'},
//     {id: 'QuoteId', title: 'QuoteId'},
//     {id: 'SupplierInstructions', title: 'SupplierInstructions'},
//     {id: 'CustomerId', title: 'CustomerId'},
//     {id: 'DueDate', title: 'DueDate'},
//     {id: 'CreatedOn', title: 'CreatedOn'},
//     {id: 'ClosedOn', title: 'ClosedOn'},
//     {id: 'Summary', title: 'Summary'},
//     {id: 'Description', title: 'Description'},
//     {id: 'LotId', title: 'LotId'},
//     {id: 'TenantContactId', title: 'TenantContactId'},
//     {id: 'OwnerContactId', title: 'OwnerContactId'},
//     {id: 'ContactId', title: 'ContactId'},
//     {id: 'ManagerMemberId', title: 'ManagerMemberId'},
//     {id: 'Labels', title: 'Labels'},
//     {id: 'UpdatedOn', title: 'UpdatedOn'},
//   ]
// });
// const inspectionsCsvWriter = createCsvWriter({
//   path: 'inspections.csv',
//   header: [
//     {id: 'Id', title: 'Id'},
//     {id: 'CustomerId', title: 'CustomerId'},
//     {id: 'LotReference', title: 'LotReference'},
//     {id: 'AddressText', title: 'AddressText'},
//     {id: 'KeyNumber', title: 'KeyNumber'},
//     {id: 'Longitude', title: 'Longitude'},
//     {id: 'Latitude', title: 'Latitude'},
//     {id: 'TenantReference', title: 'TenantReference'},
//     {id: 'OwnerReference', title: 'OwnerReference'},
//     {id: 'PublishOn', title: 'PublishOn'},
//     {id: 'LotMainPhotoDocumentId', title: 'LotMainPhotoDocumentId'},
//     {id: 'ManagerName', title: 'ManagerName'},
//     {id: 'Timestamp', title: 'Timestamp'},
//     {id: 'CurrentRentAmount', title: 'CurrentRentAmount'},
//     {id: 'CurrentRentPeriod', title: 'CurrentRentPeriod'},
//     {id: 'StatusText', title: 'StatusText'},
//     {id: 'StartTimeText', title: 'StartTimeText'},
//     {id: 'IsPublished', title: 'IsPublished'},
//     {id: 'StartTime', title: 'StartTime'},
//     {id: 'Duration', title: 'Duration'},
//     {id: 'Type', title: 'Type'},
//     {id: 'Status', title: 'Status'},
//     {id: 'ListingId', title: 'ListingId'},
//     {id: 'DueDate', title: 'DueDate'},
//     {id: 'CreatedOn', title: 'CreatedOn'},
//     {id: 'ClosedOn', title: 'ClosedOn'},
//     {id: 'Summary', title: 'Summary'},
//     {id: 'Description', title: 'Description'},
//     {id: 'LotId', title: 'LotId'},
//     {id: 'TenantContactId', title: 'TenantContactId'},
//     {id: 'OwnerContactId', title: 'OwnerContactId'},
//     {id: 'ContactId', title: 'ContactId'},
//     {id: 'ManagerMemberId', title: 'ManagerMemberId'},
//     {id: 'Labels', title: 'Labels'},
//     {id: 'UpdatedOn', title: 'UpdatedOn'},
//     // {id: 'InspectionReport', title: 'InspectionReport'},
//     // {id: 'PreviousExitReport', title: 'PreviousExitReport'},
//   ]
// });
// const tasksCsvWriter = createCsvWriter({
//   path: 'tasks.csv',
//   header: [
//     {id: 'Id', title: 'Id'},
//     {id: 'LotReference', title: 'LotReference'},
//     {id: 'TenantReference', title: 'TenantReference'},
//     {id: 'OwnerReference', title: 'OwnerReference'},
//     {id: 'ContactReference', title: 'ContactReference'},
//     {id: 'ManagerName', title: 'ManagerName'},
//     {id: 'TaskType', title: 'TaskType'},
//     {id: 'Timestamp', title: 'Timestamp'},
//     {id: 'CustomerId', title: 'CustomerId'},
//     {id: 'DueDate', title: 'DueDate'},
//     {id: 'CreatedOn', title: 'CreatedOn'},
//     {id: 'ClosedOn', title: 'ClosedOn'},
//     {id: 'Summary', title: 'Summary'},
//     {id: 'Description', title: 'Description'},
//     {id: 'LotId', title: 'LotId'},
//     {id: 'TenantContactId', title: 'TenantContactId'},
//     {id: 'OwnerContactId', title: 'OwnerContactId'},
//     {id: 'ContactId', title: 'ContactId'},
//     {id: 'ManagerMemberId', title: 'ManagerMemberId'},
//     {id: 'Labels', title: 'Labels'},
//     {id: 'UpdatedOn', title: 'UpdatedOn'},
//   ]
// });
// const membersCsvWriter = createCsvWriter({
//   path: 'members.csv',
//   header: [
//     {id: 'Id', title: 'Id'},
//     {id: 'CustomerId', title: 'CustomerId'},
//     {id: 'UserId', title: 'UserId'},
//     {id: 'Role', title: 'Role'},
//     {id: 'ExpireOn', title: 'ExpireOn'},
//     {id: 'FirstName', title: 'FirstName'},
//     {id: 'LastName', title: 'LastName'},
//     {id: 'Name', title: 'Name'},
//     {id: 'CompanyName', title: 'CompanyName'},
//     {id: 'RegisteredEmail', title: 'RegisteredEmail'},
//     {id: 'RegisteredOn', title: 'RegisteredOn'},
//     {id: 'WorkPhone', title: 'WorkPhone'},
//     {id: 'MobilePhone', title: 'MobilePhone'},
//     {id: 'IsActivated', title: 'IsActivated'},
//     {id: 'AgreeConditionsOn', title: 'AgreeConditionsOn'},
//     {id: 'RegionCode', title: 'RegionCode'},
//     {id: 'Permissions', title: 'Permissions'},
//     {id: 'CurrentMemberAccessId', title: 'CurrentMemberAccessId'},
//     {id: 'JobTitle', title: 'JobTitle'},
//     {id: 'Teams', title: 'Teams'},
//     {id: 'IsSupport', title: 'IsSupport'},
//     {id: 'IsBillingRecipient', title: 'IsBillingRecipient'},
//     {id: 'IsTwoFactorAuthenticationEnabled', title: 'IsTwoFactorAuthenticationEnabled'},
//   ]
// });
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
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  maxContentLength: 10000000000,
  maxBodyLength: 10000000000,
  timeout: 300000,
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
          'Access-Control-Allow-Origin': "*",
          Authorization: 'Bearer ' + defaultAccessToken
        },
      });
    });
  }
  return Promise.reject(error);
});

const splitDataToSmall = (bigarray) => {
  var size = 2; var arrayOfArrays = [];
  for (var i = 0; i < bigarray.length; i += size) {
    arrayOfArrays.push(bigarray.slice(i, i + size));
  }
  return arrayOfArrays;
}

const removeAllData = async (mainTable) => {
  const records = await mainTable.select().all();
  const ids = records.map(item => {
    return item.id;
  });
  if (ids.length > 0) {
    const idAry = splitDataToSmall(ids);
    for (let i = 0; i < idAry.length; i++) {
      await mainTable.destroy(idAry[i]).then(data => data).catch(err => console.log(err));
    }
  }
  return true;
}

const createRow = async (postData, mainTable) => {
  const row = await mainTable.create(postData).then(data => data).catch(err => console.log(err));
  return row;
}

const updateRow = async (postData, mainTable, id) => {
  const row = await mainTable.update(id, postData).then(data => data).catch(err => console.log(err));
  return row;
}

const selectRow = async (mainTable, id) => {
  return new Promise((resolve, reject) => {
    mainTable.select({ filterByFormula: `Id="${id}"` }).firstPage((err, records) => {
      if (err) {
        reject(err);
      }
      resolve(records);
    });
  });
}

const table = new Airtable({ apiKey: airtableAPIKey });
const base = table.base(airtableBaseId);

const propertiesTable = base.table('Properties');
const archivedPropertiesTable = base.table('ArchivedProperties');
const tenantsTable = base.table('Tenancies');
const archivedTenantsTable = base.table('ArchivedTenancies');
const contactsTable = base.table('Contacts');
const jobsTable = base.table('Jobs');
const tasksTable = base.table('Tasks');
const inspectionsTable = base.table('Inspections');
const membersTable = base.table('Members');

const getContacts = async () => {
  console.log('Removing Contacts Data...');
  await removeAllData(contactsTable);
  const data = await instance.get('/contacts?Timestamp=123123');
  console.log(data.length);
  let postData = data.map((item) => {
    delete item.SpecialType;
    delete item.Roles;
    delete item.ArchivedOn;
    delete item.AccountDetails;
    delete item.Website;
    delete item.PersonMigrated;
    delete item.SupplierChartAccountId;
    delete item.PhoneText;
    delete item.WorkPhoneText;
    delete item.ContactPhone;
    delete item.ContactPersons;
    delete item.PrimaryContactPerson;
    delete item.Timestamp;
    delete item.Phone;
    delete item.PrimaryPerson;
    delete item.RolesString;
    return { fields: item };
  });
  const splitedData = splitDataToSmall(postData);
  console.log('Creating Contacts Data...');
  for (let i = 0; i < splitedData.length; i++) {
    postData = splitedData[i];
    await createRow(postData, contactsTable);
  }
  // contactCsvWriter
  //   .writeRecords(data)
  //   .then(()=> console.log('The CSV file was written successfully'));
  console.log('All done!');
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
  // console.log('Removing Properties Data...');
  // await removeAllData(propertiesTable);
  // console.log('Removed all Properties!');
  console.log('Getting all Properties...');
  let properties_data = await instance.get('/lots?Timestamp=' + new Date().getTime() + '&format=json');
  properties_data = properties_data.map(item => {
    delete item.TenancyStart;
    delete item.TenancyEnd;
    delete item.Vacant;
    delete item.SaleAgreementUpdatedOn;
    delete item.StrataManagerContactName;
    delete item.HasAccessDetails;
    delete item.Timestamp;
    delete item.PropertyType;
    delete item.CommercialCategory;
    delete item.Address;
    delete item.LandArea;
    delete item.LandAreaUnit;
    delete item.AdRentAmount;
    delete item.AdRentPeriod;
    delete item.ActiveSaleAgreementId;
    delete item.Longitude;
    delete item.Latitude;
    delete item.StrataManagerContactId;
    delete item.RuralCategory;
    delete item.ExternalListingId;
    delete item.ActiveRentalListingId;
    delete item.ActiveSaleListingId;
    delete item.ArchivedOn;
    item.isArchived = 'NO';
    return { fields: item };
  });
  let postData = [];
  console.log('Inserting Properties...');
  // const propertiesSplitedData = splitDataToSmall(properties_data);
  for (let i = 0; i < properties_data.length; i++) {
    postData = properties_data[i];
    console.log(postData);
    const row = await selectRow(propertiesTable, postData.fields.Id);
    console.log(row);
    if (!row.length) {
      await createRow([postData], propertiesTable);
    } else {
      await updateRow([postData], propertiesTable, row.Id);
    }
  }
  console.log('Properties Done!');
  // propertiesCsvWriter
  //   .writeRecords(properties_data)
  //   .then(()=> console.log('The Properties CSV file was written successfully'));

  console.log('Total Properties: ', properties_data.length);
  // await removeAllData(tenantsTable);
  // for (let i = 0; i < properties_data.length; i++) {
  //   console.log('Getting Tenancies from ' + i + ' Property');
  //   let tempTenancies = await getTenancies(properties_data[i].fields.TenantContactId, properties_data[i].fields.Id);
  //   tempTenancies = tempTenancies.map(item => {
  //     delete item.ContactWorkPhone;
  //     delete item.ContactHomePhone;
  //     delete item.Periodic;
  //     delete item.TenancyEnd;
  //     delete item.Termination;
  //     delete item.BreakLease;
  //     delete item.Notes;
  //     delete item.BondReference;
  //     delete item.BondInTrust;
  //     delete item.NextIncreaseAmount;
  //     delete item.NextIncreaseDate;
  //     delete item.RentSequence;
  //     return { fields: item };
  //   });
  //   console.log('Tenancies: ' + tempTenancies.length);
  //   if (tempTenancies && tempTenancies.length > 0) {
  //     for (let j = 0; j < tempTenancies.length; j++) {
  //       const tenantRow = await selectRow(tenantsTable, tempTenancies[j].Id);
  //       if (tenantRow) {
  //         await updateRow([tempTenancies[j]], tenantsTable);
  //       } else {
  //         await createRow([tempTenancies[j]], tenantsTable);
  //       }
  //     }
  //   }
  //   console.log('Inserted: ' + i + ' Property Data');
  //   // tenanciesCsvWriter
  //   //   .writeRecords(tenancies)
  //   //   .then(()=> console.log('The Tenancies CSV file was written successfully'));
  // }

  console.log('All done!');
  return properties_data;
}

const getArchivedProperties = async () => {
  console.log('Removing Properties Data...');
  await removeAllData(archivedPropertiesTable);
  console.log('Removed all Archived Properties!');
  console.log('Getting all Archived Properties...');
  let properties_data = await instance.get('/lots/archived?Offset=0&Limit=100');
  properties_data = properties_data.map(item => {
    delete item.TenancyStart;
    delete item.TenancyEnd;
    delete item.Vacant;
    delete item.SaleAgreementUpdatedOn;
    delete item.StrataManagerContactName;
    delete item.HasAccessDetails;
    delete item.Timestamp;
    delete item.PropertyType;
    delete item.CommercialCategory;
    delete item.Address;
    delete item.LandArea;
    delete item.LandAreaUnit;
    delete item.AdRentAmount;
    delete item.AdRentPeriod;
    delete item.ActiveSaleAgreementId;
    delete item.Longitude;
    delete item.Latitude;
    delete item.StrataManagerContactId;
    delete item.RuralCategory;
    delete item.ExternalListingId;
    delete item.ActiveRentalListingId;
    delete item.ActiveSaleListingId;
    delete item.ArchivedOn;
    delete item.ActiveManagerTeams;
    delete item.OwnerFolioCode;
    delete item.TenantFolioCode;
    delete item.SellerFolioCode;
    delete item.SearchText;
    item.isArchived = 'YES';
    return { fields: item };
  });
  let postData = [];
  console.log('Inserting Archived Properties...');
  const propertiesSplitedData = splitDataToSmall(properties_data);
  for (let i = 0; i < propertiesSplitedData.length; i++) {
    postData = propertiesSplitedData[i];
    await createRow(postData, archivedPropertiesTable);
  }
  console.log('Archived Properties Done!');
  // propertiesCsvWriter
  //   .writeRecords(properties_data)
  //   .then(()=> console.log('The Properties CSV file was written successfully'));

  console.log('Total Archived Properties: ', properties_data.length);
  await removeAllData(archivedTenantsTable);
  for (let i = 0; i < properties_data.length; i++) {
    console.log('Getting Archived Tenancies from ' + i + ' Archived Property');
    let tempTenancies = await getTenancies(properties_data[i].fields.TenantContactId, properties_data[i].fields.Id);
    tempTenancies = tempTenancies.map(item => {
      delete item.ContactWorkPhone;
      delete item.ContactHomePhone;
      delete item.Periodic;
      delete item.TenancyEnd;
      delete item.Termination;
      delete item.BreakLease;
      delete item.Notes;
      delete item.BondReference;
      delete item.BondInTrust;
      delete item.NextIncreaseAmount;
      delete item.NextIncreaseDate;
      delete item.RentSequence;
      return { fields: item };
    });
    console.log('Archived Tenancies: ' + tempTenancies.length);
    if (tempTenancies && tempTenancies.length > 0) {
      if (tempTenancies.length <= 10) {
        await createRow(tempTenancies, archivedTenantsTable);
      } else {
        postData = [];
        const tenantsSplitedData = splitDataToSmall(tempTenancies);
        for (let i = 0; i < tenantsSplitedData.length; i++) {
          postData = tenantsSplitedData[i];
          await createRow(postData, archivedTenantsTable);
        }
      }
    }
    console.log('Inserted: ' + i + ' Archived Property Data');
    // tenanciesCsvWriter
    //   .writeRecords(tenancies)
    //   .then(()=> console.log('The Tenancies CSV file was written successfully'));
  }

  console.log('All done!');
  return properties_data;
}

const getJobs = async () => {
  let data = [];
  data = await instance.get('/jobtasks?Timestamp=' + new Date().getTime() + '&format=json');
  // jobsCsvWriter
  //   .writeRecords(data)
  //   .then(()=> console.log('The Jobs CSV file was written successfully'));

  data = data.map(item => ({ fields: item }));
  let postData = [];
  await removeAllData(jobsTable);
  console.log('Inserting Jobs...');
  const jobsSplitedData = splitDataToSmall(data);
  for (let i = 0; i < jobsSplitedData.length; i++) {
    postData = jobsSplitedData[i];
    await createRow(postData, jobsTable);
  }
  console.log('Jobs Done!');
  return data;
}
const getTasks = async () => {
  let data = [];
  data = await instance.get('/tasks?Timestamp=' + new Date().getTime() + '&format=json');
  // tasksCsvWriter
  //   .writeRecords(data)
  //   .then(()=> console.log('The Tasks CSV file was written successfully'));
  await removeAllData(tasksTable);
  data = data.map(item => ({ fields: item }));
  let postData = [];
  console.log('Inserting Tasks...');
  const tasksSplitedData = splitDataToSmall(data);
  for (let i = 0; i < tasksSplitedData.length; i++) {
    postData = tasksSplitedData[i];
    await createRow(postData, tasksTable);
  }
  console.log('Tasks Done!');
  return data;
}
const getInspections = async () => {
  let data = [];
  data = await instance.get('/inspections?Timestamp=' + new Date().getTime() + '&format=json');
  data = data.map((item) => {
    delete item.InspectionReport;
    delete item.PreviousExitReport;
    return { fields: item };
  })
  // inspectionsCsvWriter
  //   .writeRecords(data)
  //   .then(()=> console.log('The Inspections CSV file was written successfully'));
  await removeAllData(inspectionsTable);
  let postData = [];
  console.log('Inserting Inspections...');
  const inspectionsSplitedData = splitDataToSmall(data);
  for (let i = 0; i < inspectionsSplitedData.length; i++) {
    postData = inspectionsSplitedData[i];
    await createRow(postData, inspectionsTable);
  }
  console.log('Inspections Done!');
  return data;
}
const getMembers = async () => {
  let data = [];
  data = await instance.get('/members?format=json');
  // membersCsvWriter
  //   .writeRecords(data)
  //   .then(()=> console.log('The Members CSV file was written successfully'));

  await removeAllData(membersTable);
  data = data.map(item => ({ fields: item }));
  let postData = [];
  console.log('Inserting Members...');
  const membersSplitedData = splitDataToSmall(data);
  for (let i = 0; i < membersSplitedData.length; i++) {
    postData = membersSplitedData[i];
    await createRow(postData, membersTable);
  }
  console.log('Members Done!');
  return data;
}
// Create&Update Properties
const startUpdate = async () => {
  // console.log("Starting Contacts...");
  // await getContacts();
  // console.log("End Contacts...");
  console.log("Starting Properties...");
  await getProperties();
  console.log("End Properties...");
  // console.log("Starting Archived Properties...");
  // await getArchivedProperties();
  // console.log("End Archived Properties...");
  // console.log("Starting Members...");
  // await getMembers();
  // console.log("End Members...");
  // console.log("Starting Inspections...");
  // await getInspections();
  // console.log("End Inspections...");
  // console.log("Starting Tasks...");
  // await getTasks();
  // console.log("End Tasks...");
  // console.log("Starting Jobs...");
  // await getJobs();
  // console.log("End Jobs...");
}

startUpdate();
