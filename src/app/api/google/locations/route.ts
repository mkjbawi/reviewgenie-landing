import { NextResponse } from "next/server";
import { googleFetch } from "../../../lib/google";

const USE_MOCK = process.env.MOCK_MODE === "true";

type StorefrontAddress = {
  addressLines?: string[];
  locality?: string;
  administrativeArea?: string;
  postalCode?: string;
  regionCode?: string;
};

type PhoneNumbers = {
  primaryPhone?: string;
};

type GoogleLocation = {
  name: string;
  title?: string;
  storefrontAddress?: StorefrontAddress;
  phoneNumbers?: PhoneNumbers;
  websiteUri?: string;
  storeCode?: string;
};

type AccountsResponse = {
  accounts?: Array<{ name: string; accountName?: string }>;
};

type LocationsApiResponse = { locations?: GoogleLocation[] };

export async function GET() {
  if (USE_MOCK) {
    const mock: AccountsResponse & { locations: GoogleLocation[] } = {
      accounts: [{ name: "accounts/1234567890", accountName: "Mock Account" }],
      locations: [
        {
          name: "locations/111",
          title: "Mock Coffee Shop",
          storefrontAddress: {
            addressLines: ["123 Main St"],
            locality: "Mockville",
            administrativeArea: "CA",
            postalCode: "90210",
            regionCode: "US",
          },
          phoneNumbers: { primaryPhone: "+1 555-123-4567" },
          websiteUri: "https://example.com",
        },
      ],
    };
    return NextResponse.json(mock);
  }

  try {
    const accountsResp = (await googleFetch(
      "mybusinessaccountmanagement.googleapis.com/v1/accounts"
    )) as AccountsResponse;

    const accounts = accountsResp.accounts ?? [];
    if (!accounts.length) return NextResponse.json({ accounts: [], locations: [] });

    const accountName = accounts[0].name;

    const locResp = (await googleFetch(
      `mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title,storefrontAddress,phoneNumbers,websiteUri,storeCode`
    )) as LocationsApiResponse;

    return NextResponse.json({ accounts, locations: locResp.locations ?? [] });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
