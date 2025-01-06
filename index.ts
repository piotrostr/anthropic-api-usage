import { appendFile } from "node:fs/promises";
import { requestInit } from "./request";

const appendToFile = async (
  data: any[],
  filename: string,
  isFirstPage: boolean,
) => {
  // If it's the first page, start with an opening bracket
  // Otherwise, remove the last closing bracket and add a comma
  if (!isFirstPage) {
    const file = Bun.file(filename);
    const content = await file.text();
    await Bun.write(filename, content.slice(0, -1) + ",");
  } else {
    await Bun.write(filename, "[");
  }

  // Append the new data
  const dataString = JSON.stringify(data).slice(1, -1); // Remove [] from the array
  await appendFile(filename, dataString, { flag: "a" });
  await appendFile(filename, "]", { flag: "a" });
};

const getAllLogs = async () => {
  let pageIndex = 0;
  let hasMoreData = true;
  let totalLogs = 0;
  const filename = "res.json";

  while (hasMoreData) {
    console.log(`Fetching page ${pageIndex}...`);
    try {
      const res = await fetch(
        `https://console.anthropic.com/api/logs/75429106-9e23-481f-acc1-ecd61de0cb1b?page_index=${pageIndex}&page_size=100&max_datetime=2025-01-04T11:51:40.735`,
        requestInit,
      );
      const data = await res.json();

      if (data.length === 0) {
        hasMoreData = false;
        console.log("No more data to fetch.");
      } else {
        // Append this page's data to the file
        await appendToFile(data, filename, pageIndex === 0);

        totalLogs += data.length;
        console.log(
          `Retrieved ${data.length} logs. Total so far: ${totalLogs}`,
        );
        pageIndex++;
      }

      // Optional: Add a small delay to avoid hitting rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error on page ${pageIndex}:`, error);
      hasMoreData = false;
    }
  }

  return totalLogs;
};

// Usage:
if (await Bun.file("res.json").exists()) {
  const res = await Bun.file("res.json").json();
  console.log(`Total logs in file: ${res.length}`);
} else {
  const totalLogs = await getAllLogs();
  console.log(`Finished! Total logs retrieved: ${totalLogs}`);
}
