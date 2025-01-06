# anthropic-api-usage

check your anthropic api usage

1. interceipt the request, chrome devtools -> network -> find the xhr/fetch
   request -> right click -> copy -> copy as fetch (node.js)
2. pass in the `requestInit` in `./request.ts` and run the script, it will page
   through the usage
3. `cp ./res.json ./usage_data.json` to save the output
4. `jupyter notebook`, go to `localhost:8888` and run the `usage.ipynb`
   notebook to visualize your usage
