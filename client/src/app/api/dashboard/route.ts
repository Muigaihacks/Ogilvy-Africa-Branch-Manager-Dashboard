import { NextResponse } from "next/server";
import { mockData } from "@/lib/mockData";
import { filterDashboardData } from "@/lib/dashboardFilter";

export function GET(request: Request) {
  const url = new URL(request.url);
  const filters = {
    branch: url.searchParams.get("branch") ?? undefined,
    agent: url.searchParams.get("agent") ?? undefined,
    dateRange: url.searchParams.get("dateRange") ?? undefined,
    product: url.searchParams.get("product") ?? undefined,
    segment: url.searchParams.get("segment") ?? undefined,
    campaign: url.searchParams.get("campaign") ?? undefined,
  };

  const data = filterDashboardData(mockData, filters);

  return NextResponse.json({
    success: true,
    data,
    filtersApplied: filters,
  });
}


