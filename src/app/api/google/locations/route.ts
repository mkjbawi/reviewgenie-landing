import { NextResponse } from "next/server";
import { googleFetch } from "../../../lib/google";

const USE_MOCK = process.env.MOCK_MODE === "true";

export async function GET() {
  if (USE_MOCK) {
    return NextResponse.json({
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
    });
  }

  // normal live code here (will 429 until approved)
  try {
    const accountsResp = await googleFetch(
      "mybusinessaccountmanagement.googleapis.com/v1/accounts"
    );
    const accounts = accountsResp.accounts ?? [];
    if (!accounts.length) return NextResponse.json({ accounts: [], locations: [] });

    const accountName = accounts[0].name;
    const locResp = await googleFetch(
      `mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title,storefrontAddress,phoneNumbers,websiteUri`
    );

    return NextResponse.json({ accounts, locations: locResp.locations ?? [] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Unknown error" }, { status: 500 });
  }
}
