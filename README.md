# anthropic-api-usage

check how many prompts you have sent

1. interceipt the request, chrome devtools -> network -> find the xhr/fetch
   request -> right click -> copy -> copy as fetch (node.js)
2. pass in the `requestInit` in `./request.ts` and run the script, it will page
   through the usage
3. `cp ./res.json ./usage_data.json` to save the output
4. `jupyter notebook`, go to `localhost:8888` and run the `usage.ipynb`
   notebook to visualize your usage

<img width="1200" alt="image" src="https://github.com/user-attachments/assets/27eae552-bba6-4d2b-a53c-1b492af19534" />
