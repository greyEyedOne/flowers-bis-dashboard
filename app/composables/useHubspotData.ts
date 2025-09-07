import * as pd from "pandas-js";

// Root data structure
interface HubSpotData {
  metadata: {
    title: string;
    total_conversations: number;
    date_range: string;
  };
  uniqueValues: {
    companySize: string[];
    industry: string[];
    quarter: string[];
  };
  questions: Question[];
}

// Individual conversation data point
interface DataEntry {
  companySize:
    | "Startup (1-10)"
    | "Small (11-50)"
    | "Medium (51-200)"
    | "Large (201-1000)"
    | "Enterprise (1000+)";
  industry:
    | "E-Commerce"
    | "Media & Marketing"
    | "Finance & Banking"
    | "SaaS & Technology"
    | "Education"
    | "Consulting";
  quarter: "2024-Q1" | "2024-Q2" | "2024-Q3" | "2024-Q4";
  responseValue: string; // e.g., "Google Workspace", "REST API Access", "Too Expensive"
  numResponses: number; // How many times this was mentioned
}

// Question structure
interface Question {
  questionId: "q1" | "q2" | "q3";
  questionNumber: number;
  question: string;
  questionType: "multi_response";
  description: string;
  data: DataEntry[];
}

interface FilterState {
  companySize: string[];
  industry: string[];
  quarter: string[];
}

function dataTransform(
  question: Question,
  filters: FilterState = { companySize: [], industry: [], quarter: [] }
) {
  const filteredQuestionData = question.data.filter(
    (entry) =>
      (!filters.companySize.length ||
        filters.companySize.includes(entry.companySize)) &&
      (!filters.industry.length || filters.industry.includes(entry.industry)) &&
      (!filters.quarter.length || filters.quarter.includes(entry.quarter))
  );

  function returnFilterName(filterState: string[]) {
    let array = JSON.parse(JSON.stringify(filterState));
    if (array.length === 0) return "All";
    if (array.length === 1) return array[0];
    return array.filter(Boolean).join(", ");
  }

  let chartSubtitle,
    companyPart,
    industryPart,
    quarterPart = "";
  let parsedFilters = JSON.parse(JSON.stringify(filters)); // extract params
  if (parsedFilters.companySize.length !== 0) {
    companyPart = `Company Size: ${returnFilterName(
      parsedFilters.companySize
    )}`;
  }
  if (parsedFilters.industry.length !== 0) {
    industryPart = `Industry: ${returnFilterName(parsedFilters.industry)}`;
  }
  if (parsedFilters.quarter.length !== 0) {
    quarterPart = `Quarter: ${returnFilterName(parsedFilters.quarter)}`;
  }
  chartSubtitle = [companyPart, industryPart, quarterPart]
    .filter(Boolean)
    .join(", ");

  const df = new pd.DataFrame(
    filteredQuestionData.map((r) => ({
      responseValue: r.responseValue,
      numResponses: Number(r.numResponses) || 0,
    }))
  );

  const keyCol = df.get("responseValue"); // Series
  const uniq = (keyCol.unique() as any).toArray() as string[];

  const pairs = uniq.map((val) => {
    const subset = df.filter(keyCol.eq(val));
    const sum = subset.get("numResponses").sum() as number;
    return [val, Number(sum) || 0] as const;
  });

  pairs.sort((a, b) => b[1] - a[1]);

  return {
    labels: pairs.map(([k]) => k),
    values: pairs.map(([, v]) => v),
    title: question.question,
    subtitle: chartSubtitle !== "" ? chartSubtitle : "All responses", // !!!!
  };
}

const createChartConfig = (chartDataObject) => {
  return {
    type: "bar",
    data: {
      labels: chartDataObject.labels,
      datasets: [
        {
          label: "Mentions",
          data: chartDataObject.values,
          backgroundColor: "rgba(137, 87, 255, .9)",
        },
      ],
    },
    options: {
      indexAxis: "y", // Horizontal bars
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: chartDataObject.title, // Dynamic from question data
        },
        subtitle: {
          display: true,
          text: chartDataObject.subtitle, // Shows filter state
        },
      },
    },
  };
};

export function useHubspotData(
  hubspotData: HubSpotData,
  questionNumber: 1 | 2 | 3,
  filters: FilterState = {
    companySize: [],
    industry: [],
    quarter: [],
  }
) {
  const question = hubspotData.questions.find(
    (q) => q.questionNumber === questionNumber
  );

  const transformedData = dataTransform(question, filters);
  const chartDataObject = createChartConfig(transformedData);
  return chartDataObject;
}
