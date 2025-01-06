# anthropic-api-usage

check how many prompts you have sent


1. go to the Anthropic Console, the Logs section
2. interceipt the request sent to get the logs:
   chrome devtools -> network -> find the xhr/fetch request -> right click -> copy -> copy as fetch (node.js)
3. create `./request.ts` with the `requestInit` (everything in the request
   that you put after the url, method, headers, cookies etc) and run the script,
   it will page through the usage data and save it into `res.json`
4. `cp ./res.json ./usage_data.json` to save the output for visualization
5. `jupyter notebook`, go to `localhost:8888` and run the `usage.ipynb`
   notebook to visualize your usage, you can click `Run All Cells`

<img width="1200" alt="image" src="https://github.com/user-attachments/assets/27eae552-bba6-4d2b-a53c-1b492af19534" />
